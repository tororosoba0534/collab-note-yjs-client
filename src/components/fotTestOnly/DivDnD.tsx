import { useRef, useState } from "react";
import { DndItem } from "./DndItem";
import {
  Block,
  Gathereds,
  Hovereds,
  LeadingBlock,
  Observing,
  RawBlock,
  genRawBlocks,
} from "./utils";

const BLOCKS_NUM = 10;

export const DivDnD = () => {
  const [rawBlocks, setRawBlocks] = useState<(RawBlock | null)[]>(
    genRawBlocks(BLOCKS_NUM)
  );
  const allBlocks = useRef<(Block | null)[]>([]);
  const leadingBlock = useRef<LeadingBlock | null>(null);
  const gathereds = useRef<Gathereds | null>(null);
  const hovereds = useRef<Hovereds | null>(null);
  const observing = useRef<Observing>({
    currentCursorPt: { x: 0, y: 0 },
    checkHoverInterval: undefined,
    reorderMux: true,
  });
  return (
    <div className=" w-full flex flex-col gap-5 p-10">
      {rawBlocks.map((rblock, i) => {
        if (!rblock) return;
        return (
          <DndItem
            key={rblock.key}
            rblock={rblock}
            setRawBlocks={setRawBlocks}
            index={i}
            allBlocks={allBlocks}
            leadingBlock={leadingBlock}
            gathereds={gathereds}
            hovereds={hovereds}
            observing={observing}
          />
        );
      })}
    </div>
  );
};
