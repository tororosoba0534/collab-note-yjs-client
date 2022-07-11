import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndItem } from "./DndItem";
import { Block, LeadingBlock, rawBlocksGen } from "./utils";

const BLOCKS_NUM = 10;

const rawBlocks = rawBlocksGen(BLOCKS_NUM);

export const DivDnD = () => {
  const allBlocks = useRef<(Block | null)[]>([null]);
  const leadingBlock = useRef<LeadingBlock | null>(null);
  return (
    <div className=" w-full flex flex-col gap-10 p-10">
      {rawBlocks.map((rblock, i) => {
        return (
          <DndItem
            key={rblock.key}
            rblock={rblock}
            index={i}
            allBlocks={allBlocks}
            leadingBlock={leadingBlock}
          />
        );
      })}
    </div>
  );
};
