import { dndConsts } from "../dndConsts";
import { DndProps } from "../DndItem";

export const onReorder = (elm: HTMLElement, props: DndProps) => {
  const leadingBlock = props.leadingBlock.current;
  const overRenderingInfo = props.overRenderingInfo.current;
  const gathered = props.gathered.current;
  if (!leadingBlock) return;
  if (!gathered) return;
  if (!overRenderingInfo) return;

  if (props.index !== leadingBlock.index) return;
  if (!elm) return;

  props.muxReordering.current = false;
  setTimeout(() => {
    props.muxReordering.current = true;
  }, dndConsts.MUX_REORDERING_MS);

  const { x: elmBeforeX, y: elmBeforeY } = leadingBlock.initElmPt;
  const { x: cursorBeforeX, y: cursorBeforeY } = leadingBlock.initMousePt;

  elm.style.transform = "";
  const { left: elmAfterX, top: elmAfterY } = elm.getBoundingClientRect();
  const cursorAfterX = cursorBeforeX + elmAfterX - elmBeforeX;
  const cursorAfterY = cursorBeforeY + elmAfterY - elmBeforeY;

  leadingBlock.initMousePt = { x: cursorAfterX, y: cursorAfterY };
  leadingBlock.initElmPt = { x: elmAfterX, y: elmAfterY };

  const DX = props.currentCursorPt.current.x - cursorAfterX;
  const DY = props.currentCursorPt.current.y - cursorAfterY;

  // elm.style.transform = `translate(${
  //   DX
  // }px,${DY}px)`;

  const ptBefores = overRenderingInfo.hoveredsInfo;
  props.allBlocks.current.forEach((block, index) => {
    if (!block) return;
    if (ptBefores[block.key]) {
      const { xBefore, yBefore } = ptBefores[block.key];
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
      index >= gathered.movingTopIndex &&
      index <= gathered.movingButtomIndex
    ) {
      block.elm.style.transform = `translate(${DX}px,${DY}px)`;
    }
  });
  return;
};
