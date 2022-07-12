import { dndConsts } from "../dndConsts";
import { DndProps } from "../DndItem";
import { Block, Gathereds, Hovereds, LeadingBlock } from "../utils";

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
  props.observing.current.currentCursorPt = { x: e.clientX, y: e.clientY };

  props.observing.current.reorderMux = true;
  props.observing.current.checkHoverInterval = window.setInterval(() => {
    if (!props.observing.current.reorderMux) return;

    const allBlocks = props.allBlocks.current;
    const leadingBlock = props.leadingBlock.current;
    if (!leadingBlock) return;
    const gathereds = props.gathereds.current;
    if (!gathereds) return;

    const movingTopY = gathereds.movingTopElm.getBoundingClientRect().top;
    const movingButtomY =
      gathereds.movingButtomElm.getBoundingClientRect().bottom;

    const hoveredBefore: number[] = [];
    const hoveredAfter: number[] = [];
    const newHovereds: Hovereds = {};
    let shouldSetAllBlocks = false;
    allBlocks.forEach((block, index) => {
      if (index < gathereds.movingTopIndex) {
        const { top, bottom, left } = block.elm.getBoundingClientRect();
        const line = (top + bottom) / 2;
        if (movingTopY < line) {
          console.log("hover detected!");
          hoveredBefore.push(index);
          shouldSetAllBlocks = true;
          newHovereds[block.key] = { xBefore: left, yBefore: top };
        }
      } else if (index > gathereds.movingButtomIndex) {
        const { top, bottom, left } = block.elm.getBoundingClientRect();
        const line = (top + bottom) / 2;
        if (movingButtomY > line) {
          console.log("hover detected!");
          hoveredAfter.push(index);
          shouldSetAllBlocks = true;
          newHovereds[block.key] = { xBefore: left, yBefore: top };
        }
      } else {
        return;
      }
    });
    if (shouldSetAllBlocks) {
      let newAllBlocks: Block[];
      let newGathereds: Gathereds;

      if (hoveredBefore.length !== 0) {
        const before = allBlocks.slice(0, hoveredBefore[0]);
        const hovered = allBlocks.slice(
          hoveredBefore[0],
          hoveredBefore[0] + hoveredBefore.length
        );
        const moving = allBlocks.slice(
          gathereds.movingTopIndex,
          gathereds.movingButtomIndex + 1
        );
        const after = allBlocks.slice(gathereds.movingButtomIndex + 1);
        newAllBlocks = [...before, ...moving, ...hovered, ...after];
        newGathereds = {
          movingTopIndex: gathereds.movingTopIndex - hovered.length,
          movingButtomIndex: gathereds.movingButtomIndex - hovered.length,
          movingTopElm: gathereds.movingTopElm,
          movingButtomElm: gathereds.movingButtomElm,
        };
        leadingBlock.index = leadingBlock.index - hovered.length;
      } else if (hoveredAfter.length !== 0) {
        const before = allBlocks.slice(0, gathereds.movingTopIndex);
        const moving = allBlocks.slice(
          gathereds.movingTopIndex,
          gathereds.movingButtomIndex + 1
        );
        const hovered = allBlocks.slice(
          hoveredAfter[0],
          hoveredAfter[0] + hoveredAfter.length
        );
        const after = allBlocks.slice(hoveredAfter[0] + hoveredAfter.length);
        newAllBlocks = [...before, ...hovered, ...moving, ...after];
        newGathereds = {
          movingTopIndex: gathereds.movingTopIndex + hovered.length,
          movingButtomIndex: gathereds.movingButtomIndex + hovered.length,
          movingTopElm: gathereds.movingTopElm,
          movingButtomElm: gathereds.movingButtomElm,
        };
        leadingBlock.index = leadingBlock.index + hovered.length;
      } else {
        return;
      }
      props.hovereds.current = newHovereds;
      props.allBlocks.current = newAllBlocks;
      props.gathereds.current = newGathereds;
      props.setRawBlocks(newAllBlocks);
    }
  }, dndConsts.HOVER_CHECK_MS);
};
