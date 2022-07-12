import { dndConsts } from "../dndConsts";
import { DndProps } from "../DndItem";

export const onReorder = (elm: HTMLElement, props: DndProps) => {
  const leadingBlock = props.leadingBlock.current;
  const gathereds = props.gathereds.current;
  const hovereds = props.hovereds.current;
  if (!leadingBlock) return;
  if (!gathereds) return;
  if (!hovereds) return;

  if (props.index !== leadingBlock.index) return;

  props.observing.current.reorderMux = false;
  setTimeout(() => {
    props.observing.current.reorderMux = true;
  }, dndConsts.MUX_REORDERING_MS);

  const { x: elmBeforeX, y: elmBeforeY } = leadingBlock.initElmPt;
  const { x: cursorBeforeX, y: cursorBeforeY } = leadingBlock.initMousePt;

  elm.style.transform = "";
  const { left: elmAfterX, top: elmAfterY } = elm.getBoundingClientRect();
  const cursorAfterX = cursorBeforeX + elmAfterX - elmBeforeX;
  const cursorAfterY = cursorBeforeY + elmAfterY - elmBeforeY;

  leadingBlock.initMousePt = { x: cursorAfterX, y: cursorAfterY };
  leadingBlock.initElmPt = { x: elmAfterX, y: elmAfterY };

  const DX = props.observing.current.currentCursorPt.x - cursorAfterX;
  const DY = props.observing.current.currentCursorPt.y - cursorAfterY;

  // elm.style.transform = `translate(${
  //   DX
  // }px,${DY}px)`;

  props.allBlocks.current.forEach((block, index) => {
    if (!block) return;
    if (hovereds[block.key]) {
      const { xBefore, yBefore } = hovereds[block.key];
      const { left: xAfter, top: yAfter } = block.elm.getBoundingClientRect();
      block.elm.style.transition = "";
      block.elm.style.transform = `translate(${xBefore - xAfter}px,${
        yBefore - yAfter
      }px)`;
      requestAnimationFrame(() => {
        block.elm.style.transform = "";
        block.elm.style.transition = `all ${dndConsts.ANIMATION_MS}ms`;
      });
    } else if (
      index >= gathereds.movingTopIndex &&
      index <= gathereds.movingButtomIndex
    ) {
      block.elm.style.transform = `translate(${DX}px,${DY}px)`;
    }
  });
  return;
};
