import { useReducer, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndItem } from "./DndItem";
import {
  Block,
  Gathered,
  LeadingBlock,
  OverRendering,
  Position,
  RawBlock,
  rawBlocksGen,
} from "./utils";

const BLOCKS_NUM = 10;

export const DivDnD = () => {
  const [rawBlocks, setRawBlocks] = useState<(RawBlock | null)[]>(
    rawBlocksGen(BLOCKS_NUM)
  );
  const allBlocks = useRef<(Block | null)[]>([]);
  const leadingBlock = useRef<LeadingBlock | null>(null);
  const gathered = useRef<Gathered | null>(null);
  const muxReordering = useRef(true);
  const overRenderingInfo = useRef<OverRendering | null>(null);
  const currentCursorPt = useRef<Position>({ x: 0, y: 0 });
  const checkHoverInterval = useRef<number | undefined>(undefined);
  return (
    <div className=" w-full flex flex-col gap-5 p-10">
      {rawBlocks.map((rblock, i) => {
        if (!rblock) return;
        return (
          <DndItem
            muxReordering={muxReordering}
            key={rblock.key}
            rblock={rblock}
            setRawBlocks={setRawBlocks}
            index={i}
            allBlocks={allBlocks}
            leadingBlock={leadingBlock}
            gathered={gathered}
            overRenderingInfo={overRenderingInfo}
            checkHoverInterval={checkHoverInterval}
            currentCursorPt={currentCursorPt}
          />
        );
      })}
    </div>
  );
};
