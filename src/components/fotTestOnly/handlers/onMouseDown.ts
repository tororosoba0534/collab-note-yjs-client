import { dndConsts } from "../dndConsts";
import { DndProps } from "../DndItem";
import { Block, Gathered, HoveredsInfo, LeadingBlock } from "../utils";

export const onMouseDown = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  props: DndProps,
  handlingBtnElm: React.RefObject<HTMLButtonElement>
) => {
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
  props.currentCursorPt.current = { x: e.clientX, y: e.clientY };

  props.checkHoverInterval.current = window.setInterval(() => {
    if (!props.muxReordering.current) return;

    const allBlocks = props.allBlocks.current;
    const leadingBlock = props.leadingBlock.current;
    if (!leadingBlock) return;
    const gathered = props.gathered.current;
    if (!gathered) return;

    const movingTopY = gathered.movingTopElm.getBoundingClientRect().top;
    const movingButtomY =
      gathered.movingButtomElm.getBoundingClientRect().bottom;

    const hoveredBefore: number[] = [];
    const hoveredAfter: number[] = [];
    const hoveredsInfo: HoveredsInfo = {};
    let shouldSetAllBlocks = false;
    allBlocks.forEach((block, index) => {
      if (!block) return;
      if (index < gathered.movingTopIndex) {
        const { top, bottom, left } = block.elm.getBoundingClientRect();
        const line = (top + bottom) / 2;
        if (movingTopY < line) {
          console.log("hover detected!");
          hoveredBefore.push(index);
          shouldSetAllBlocks = true;
          // hoveredsInfo.push({ key: block.key, xBefore: left, yBefore: top });
          hoveredsInfo[block.key] = { xBefore: left, yBefore: top };
        }
      } else if (index > gathered.movingButtomIndex) {
        const { top, bottom, left } = block.elm.getBoundingClientRect();
        const line = (top + bottom) / 2;
        if (movingButtomY > line) {
          console.log("hover detected!");
          hoveredAfter.push(index);
          shouldSetAllBlocks = true;
          hoveredsInfo[block.key] = { xBefore: left, yBefore: top };
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
        hoveredsInfo: hoveredsInfo,
      };
      props.allBlocks.current = newAllBlocks;
      props.gathered.current = newGathered;
      // newAllBlocks.forEach((b) => {
      //   if (!b) return;
      //   b.elm.style.transform = "";
      // });
      props.setRawBlocks(newAllBlocks);
    }
  }, dndConsts.HOVER_CHECK_MS);
};
