import { useRef } from "react";
import { Block, LeadingBlock, RawBlock } from "./utils";

export const DndItem = (props: {
  rblock: RawBlock;
  setRawBlocks: React.Dispatch<React.SetStateAction<RawBlock[]>>;
  index: number;
  allBlocks: React.MutableRefObject<(Block | null)[]>;
  leadingBlock: React.MutableRefObject<LeadingBlock | null>;
}) => {
  // const handlingBtnElm = useRef<HTMLButtonElement>(null);

  const onMouseMove = (e: MouseEvent) => {
    const leadingBlock = props.leadingBlock.current;
    if (!leadingBlock) return;

    const dx = e.clientX - leadingBlock.initMousePt.x;
    const dy = e.clientY - leadingBlock.initMousePt.y;

    if (!leadingBlock.beingFollowedByOthers && (dx > 10 || dx < -10)) {
      leadingBlock.beingFollowedByOthers = true;
      const stayBefore: Block[] = [];
      const moveBefore: Block[] = [];
      const moveAfter: Block[] = [];
      const stayAfter: Block[] = [];
      props.allBlocks.current.forEach((block, index) => {
        if (!block) return;
        if (index < leadingBlock.index) {
          if (block.isSelected) {
            moveBefore.push(block);
          } else {
            stayBefore.push(block);
          }
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
        ...moveAfter,
        ...stayAfter,
      ];
      props.allBlocks.current = newAllBlocks;
      props.setRawBlocks(newAllBlocks);
    }

    props.allBlocks.current.forEach((block) => {
      if (!block) return;
      if (block.isSelected) {
        block.elm.style.transform = `translate(${dx}px,${dy}px)`;
      }
    });
  };

  const onMouseUp = (e: MouseEvent) => {
    props.allBlocks.current.forEach((block) => {
      if (!block) return;
      block.elm.style.transform = "";
    });
    props.leadingBlock.current = null;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      className="w-40 h-10 p-2 flex items-center gap-3"
      key={props.rblock.key}
      ref={(elm) => {
        if (!elm) {
          console.log("elm removed.");
          props.allBlocks.current[props.index] = null;
          return;
        }
        console.log("elm mounted.");
        props.allBlocks.current[props.index] = new Block(props.rblock, elm);
      }}
      // onClick={(e) => {
      //   if (!allBlocks.current[i + 1] && allBlocks.current[0]) {
      //     allBlocks.current[0].elm.style.backgroundColor = "red";
      //     return;
      //   }
      //   if (allBlocks.current[i + 1]) {
      //     const next = allBlocks.current[i + 1]?.elm;
      //     if (next) {
      //       next.style.backgroundColor = "red";
      //     }
      //   }
      // }}
      // onMouseUp={(e) => {
      //   allBlocks.current.forEach((b) => {
      //     if (!b) return;
      //     if (b.isSelected) {
      //       b.elm.style.backgroundColor = "red";
      //     }
      //   });
      // }}
      // onMouseDown={(e) => {
      //   allBlocks.current.forEach((b) => {
      //     if (!b) return;
      //     if (b.isSelected) {
      //       b.elm.style.backgroundColor = "black";
      //     }
      //   });
      // }}
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
        className="h-full bg-lime-100 rounded-lg px-2"
        // ref={handlingBtnElm}
        onMouseDown={(e) => {
          const currentBlock = props.allBlocks.current[props.index];
          if (!currentBlock) return;

          props.leadingBlock.current = new LeadingBlock(
            currentBlock,
            props.index,
            { x: e.clientX, y: e.clientY }
          );
          window.addEventListener("mousemove", onMouseMove);
          window.addEventListener("mouseup", onMouseUp);
        }}
      >
        ・
      </button>
    </div>
  );
};
