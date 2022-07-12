import { DndProps } from "../DndItem";
import { onMouseMove } from "./onMouseMove";

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
  props.overRenderingInfo.current = null;

  window.clearInterval(props.checkHoverInterval.current);
};
