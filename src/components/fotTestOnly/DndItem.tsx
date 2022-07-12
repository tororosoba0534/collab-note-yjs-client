import { useRef } from "react";
import { onMouseDown } from "./handlers/onMouseDown";
import { onMouseMove } from "./handlers/onMouseMove";
import { onMouseUp } from "./handlers/onMouseUp";
import { onReorder } from "./handlers/onReorder";
import {
  Block,
  Gathereds,
  Hovereds,
  LeadingBlock,
  Observing,
  RawBlock,
} from "./utils";

export type DndProps = {
  rblock: RawBlock;
  setRawBlocks: React.Dispatch<React.SetStateAction<(RawBlock | null)[]>>;
  index: number;
  allBlocks: React.MutableRefObject<(Block | null)[]>;
  leadingBlock: React.MutableRefObject<LeadingBlock | null>;
  gathereds: React.MutableRefObject<Gathereds | null>;
  hovereds: React.MutableRefObject<Hovereds | null>;
  observing: React.MutableRefObject<Observing>;
};

export const DndItem = (props: DndProps) => {
  const handlingBtnElm = useRef<HTMLButtonElement>(null);
  const callbackRef = (elm: HTMLElement | null) => {
    const leadingBlock = props.leadingBlock.current;
    if (!leadingBlock) {
      if (!elm) {
        console.log("elm removed.");
        props.allBlocks.current[props.index] = null;
        return;
      }
      console.log("elm mounted.");
      props.allBlocks.current[props.index] = new Block(props.rblock, elm);
      return;
    }
    if (!elm) return;
    onReorder(elm, props);
  };

  const onMouseDownWrapper = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onMouseDown(e, props, handlingBtnElm);
    window.addEventListener("mousemove", onMouseMoveWrapper);
    window.addEventListener("mouseup", onMouseUpWrapper);
  };

  const onMouseMoveWrapper = (e: MouseEvent) => {
    onMouseMove(e, props);
  };
  const onMouseUpWrapper = (e: MouseEvent) => {
    onMouseUp(e, props, handlingBtnElm);
    window.removeEventListener("mousemove", onMouseMoveWrapper);
    window.removeEventListener("mouseup", onMouseUpWrapper);
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
        onMouseDown={onMouseDownWrapper}
        style={{ cursor: "grab" }}
      >
        ・
      </button>
    </div>
  );
};
