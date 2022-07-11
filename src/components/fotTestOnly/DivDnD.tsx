import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export type RawBlock = {
  key: string;
  value: string;
  isSelected: boolean;
};

const blocksGen = (num: number): RawBlock[] => {
  const result: RawBlock[] = [];

  for (let i = 0; i < num; i++) {
    result.push({
      key: uuidv4(),
      value: `No. ${i}`,
      isSelected: false,
    });
  }

  return result;
};

const BLOCKS_NUM = 10;

const rawBlocks: RawBlock[] = blocksGen(BLOCKS_NUM);

export const DivDnD = () => {
  const refs = useRef<(HTMLElement | null)[]>([null]);
  return (
    <div className=" w-full flex flex-col gap-10 m-10">
      {rawBlocks.map((block, i) => {
        return (
          <div
            className="w-10 h-10 bg-lime-300"
            key={block.key}
            ref={(elm) => {
              if (!elm) {
                console.log("elm removed.");
                refs.current[i] = null;
                return;
              }
              console.log("elm mounted.");
              refs.current[i] = elm;
            }}
            onClick={(e) => {
              if (!refs.current[i + 1] && refs.current[0]) {
                refs.current[0].style.backgroundColor = "red";
                return;
              }
              if (refs.current[i + 1]) {
                const next = refs.current[i + 1];
                if (next) {
                  next.style.backgroundColor = "red";
                }
              }
            }}
          >
            {block.value}
          </div>
        );
      })}
    </div>
  );
};
