import { DndProps } from "../DndItem";

export const onMouseUp = (
  e: MouseEvent,
  props: DndProps,
  handlingBtnElm: React.RefObject<HTMLButtonElement>
) => {
  if (handlingBtnElm.current) {
    const btn = handlingBtnElm.current;
    btn.style.cursor = "grab";
  }
  props.allBlocks.current.forEach((block) => {
    if (!block) return;
    block.elm.style.transform = "";
    block.elm.style.transition = "";
  });
  props.leadingBlock.current = null;
  props.gathereds.current = null;
  props.hovereds.current = null;

  props.observing.current.reorderMux = true;
  window.clearInterval(props.observing.current.checkHoverInterval);
};
