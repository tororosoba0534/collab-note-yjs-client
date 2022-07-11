import { MouseEventHandler, useRef } from "react";
import {
  Block,
  Gathered,
  LeadingBlock,
  OverRendering,
  RawBlock,
} from "./utils";

const GATHER_VAL = 10;

export const DndItem = (props: {
  rblock: RawBlock;
  setRawBlocks: React.Dispatch<React.SetStateAction<(RawBlock | null)[]>>;
  index: number;
  allBlocks: React.MutableRefObject<(Block | null)[]>;
  leadingBlock: React.MutableRefObject<LeadingBlock | null>;
  gathered: React.MutableRefObject<Gathered | null>;
  overRenderingInfo: React.MutableRefObject<OverRendering | null>;
  muxOnMouseMove: React.MutableRefObject<boolean>;
}) => {
  const handlingBtnElm = useRef<HTMLButtonElement>(null);
  const callbackRef = (elm: HTMLElement | null) => {
    const leadingBlock = props.leadingBlock.current;
    if (leadingBlock) {
      const overRenderingInfo = props.overRenderingInfo.current;
      if (!props.gathered.current) return;
      if (!overRenderingInfo) return;

      if (props.index !== leadingBlock.index) return;
      if (!elm) return;
      elm.style.transform = "";
      const { left: xAfter, top: yAfter } = elm.getBoundingClientRect();
      const baseDX = xAfter - leadingBlock.initElmPt.x;
      const baseDY = yAfter - leadingBlock.initElmPt.y;
      leadingBlock.initMousePt.x += baseDX;
      leadingBlock.initMousePt.y += baseDY;
      elm.style.transform = `translate(${
        overRenderingInfo.cursorPt.x - leadingBlock.initMousePt.x
      }px,${overRenderingInfo.cursorPt.y - leadingBlock.initMousePt.y}px)`;
      leadingBlock.initElmPt = { x: xAfter, y: yAfter };
      return;
    }

    if (!elm) {
      console.log("elm removed.");
      props.allBlocks.current[props.index] = null;
      return;
    }
    console.log("elm mounted.");
    props.allBlocks.current[props.index] = new Block(props.rblock, elm);
  };

  const onMouseDown: MouseEventHandler<HTMLButtonElement> = (e) => {
    const currentBlock = props.allBlocks.current[props.index];
    if (!currentBlock) return;

    if (!currentBlock.isSelected) return;

    if (handlingBtnElm.current) {
      const btn = handlingBtnElm.current;
      btn.style.cursor = "grabbing";
    }

    props.leadingBlock.current = new LeadingBlock(
      currentBlock,
      props.index,
      {
        x: e.clientX,
        y: e.clientY,
      },
      {
        x: currentBlock.elm.getBoundingClientRect().left,
        y: currentBlock.elm.getBoundingClientRect().top,
      }
    );
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    const leadingBlock = props.leadingBlock.current;
    if (!leadingBlock) return;
    const allBlocks = props.allBlocks.current;

    const dx = e.clientX - leadingBlock.initMousePt.x;
    const dy = e.clientY - leadingBlock.initMousePt.y;

    if (!leadingBlock.beingFollowedByOthers) {
      if (dy < GATHER_VAL && dy > -GATHER_VAL) {
        leadingBlock.elm.style.transform = `translate(${dx}px,${dy}px)`;
        return;
      } else {
        leadingBlock.beingFollowedByOthers = true;
        const stayBefore: Block[] = [];
        const moveBefore: Block[] = [];
        const moveAfter: Block[] = [];
        const stayAfter: Block[] = [];
        allBlocks.forEach((block, index) => {
          if (!block) return;
          if (index < leadingBlock.index) {
            if (block.isSelected) {
              moveBefore.push(block);
            } else {
              stayBefore.push(block);
            }
          } else if (index === leadingBlock.index) {
            return;
          } else {
            if (block.isSelected) {
              moveAfter.push(block);
            } else {
              stayAfter.push(block);
            }
          }
        });

        const newAllBlocks = [
          ...stayBefore,
          ...moveBefore,
          leadingBlock,
          ...moveAfter,
          ...stayAfter,
        ];
        props.gathered.current = {
          movingTopIndex: stayBefore.length,
          movingButtomIndex: newAllBlocks.length - stayAfter.length - 1,
          movingTopElm: moveBefore[0]?.elm || leadingBlock.elm,
          movingButtomElm:
            moveAfter[moveAfter.length - 1]?.elm || leadingBlock.elm,
        };
        props.allBlocks.current = newAllBlocks;
        props.setRawBlocks(newAllBlocks);
        return;
      }
    }

    allBlocks.forEach((block) => {
      if (!block) return;
      if (block.isSelected) {
        block.elm.style.transform = `translate(${dx}px,${dy}px)`;
      }
    });

    if (!props.gathered.current) return;

    if (!props.muxOnMouseMove.current) return;
    props.muxOnMouseMove.current = false;
    setTimeout(() => {
      props.muxOnMouseMove.current = true;
    }, 100);

    const gathered = props.gathered.current;

    const movingTopY = gathered.movingTopElm.getBoundingClientRect().top;
    const movingButtomY =
      gathered.movingButtomElm.getBoundingClientRect().bottom;

    const hoveredBefore: number[] = [];
    const hoveredAfter: number[] = [];
    let shouldSetAllBlocks = false;
    allBlocks.forEach((block, index) => {
      if (!block) return;
      if (index < gathered.movingTopIndex) {
        const { top, bottom } = block.elm.getBoundingClientRect();
        const line = (top + bottom) / 2;
        if (movingTopY < line) {
          console.log("hover detected!");
          hoveredBefore.push(index);
          shouldSetAllBlocks = true;
        }
      } else if (index > gathered.movingButtomIndex) {
        const { top, bottom } = block.elm.getBoundingClientRect();
        const line = (top + bottom) / 2;
        if (movingButtomY > line) {
          console.log("hover detected!");
          hoveredAfter.push(index);
          shouldSetAllBlocks = true;
        }
      } else {
        return;
      }
    });
    if (shouldSetAllBlocks) {
      let newAllBlocks: (Block | null)[];
      let newGathered: Gathered;

      if (hoveredBefore.length !== 0) {
        const before = allBlocks.slice(0, hoveredBefore[0]);
        const hovered = allBlocks.slice(
          hoveredBefore[0],
          hoveredBefore[0] + hoveredBefore.length
        );
        const moving = allBlocks.slice(
          gathered.movingTopIndex,
          gathered.movingButtomIndex + 1
        );
        const after = allBlocks.slice(gathered.movingButtomIndex + 1);
        newAllBlocks = [...before, ...moving, ...hovered, ...after];
        newGathered = {
          movingTopIndex: gathered.movingTopIndex - hovered.length,
          movingButtomIndex: gathered.movingButtomIndex - hovered.length,
          movingTopElm: gathered.movingTopElm,
          movingButtomElm: gathered.movingButtomElm,
        };
        leadingBlock.index = leadingBlock.index - hovered.length;
        // leadingBlock.initMousePt.y -= 80 * hovered.length;
      } else if (hoveredAfter.length !== 0) {
        const before = allBlocks.slice(0, gathered.movingTopIndex);
        const moving = allBlocks.slice(
          gathered.movingTopIndex,
          gathered.movingButtomIndex + 1
        );
        const hovered = allBlocks.slice(
          hoveredAfter[0],
          hoveredAfter[0] + hoveredAfter.length
        );
        const after = allBlocks.slice(hoveredAfter[0] + hoveredAfter.length);
        newAllBlocks = [...before, ...hovered, ...moving, ...after];
        newGathered = {
          movingTopIndex: gathered.movingTopIndex + hovered.length,
          movingButtomIndex: gathered.movingButtomIndex + hovered.length,
          movingTopElm: gathered.movingTopElm,
          movingButtomElm: gathered.movingButtomElm,
        };
        leadingBlock.index = leadingBlock.index + hovered.length;
        // leadingBlock.initMousePt.y += 80 * hovered.length;
      } else {
        return;
      }
      props.overRenderingInfo.current = {
        cursorPt: { x: e.clientX, y: e.clientY },
      };
      props.allBlocks.current = newAllBlocks;
      props.gathered.current = newGathered;
      // newAllBlocks.forEach((b) => {
      //   if (!b) return;
      //   b.elm.style.transform = "";
      // });
      props.setRawBlocks(newAllBlocks);
    }
  };

  const onMouseUp = (e: MouseEvent) => {
    if (handlingBtnElm.current) {
      const btn = handlingBtnElm.current;
      btn.style.cursor = "grab";
    }
    props.allBlocks.current.forEach((block) => {
      if (!block) return;
      block.elm.style.transform = "";
    });
    props.leadingBlock.current = null;
    props.overRenderingInfo.current = null;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      className="w-40 h-10 p-2 flex items-center gap-3"
      key={props.rblock.key}
      ref={callbackRef}
    >
      <button
        className="h-full bg-lime-100 rounded-lg px-2"
        onClick={(e) => {
          e.stopPropagation();
          props.allBlocks.current[props.index]?.toggleSelect();
        }}
      >
        SELECT
      </button>
      {props.rblock.value}
      <button
        ref={handlingBtnElm}
        className="h-full bg-lime-100 rounded-lg px-2"
        // ref={handlingBtnElm}
        onMouseDown={onMouseDown}
        style={{ cursor: "grab" }}
      >
        ・
      </button>
    </div>
  );
};
