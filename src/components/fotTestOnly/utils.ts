import { v4 as uuidv4 } from "uuid";

export class RawBlock {
  readonly key: string;
  value: string;
  isSelected: boolean;

  constructor(initRawBlock: {
    key: string;
    value: string;
    isSelected: boolean;
  }) {
    this.key = initRawBlock.key;
    this.value = initRawBlock.value;
    this.isSelected = initRawBlock.isSelected;
  }
}

export const rawBlocksGen = (num: number): RawBlock[] => {
  const result: RawBlock[] = [];

  for (let i = 0; i < num; i++) {
    result.push(
      new RawBlock({
        key: uuidv4(),
        value: `No. ${i}`,
        isSelected: false,
      })
    );
  }

  return result;
};

// type Block = RawBlock & {
//   elm: HTMLElement;
// };

export class Block extends RawBlock {
  elm: HTMLElement;
  constructor(rawBlock: RawBlock, elm: HTMLElement) {
    super(rawBlock);
    this.elm = elm;
    elm.style.backgroundColor = this.isSelected ? "red" : "#bef264";
  }
  select = () => {
    this.isSelected = true;
    this.elm.style.backgroundColor = "red";
  };
  deselect = () => {
    this.isSelected = false;
    this.elm.style.backgroundColor = "#bef264";
  };
  toggleSelect = () => {
    if (this.isSelected) {
      this.deselect();
    } else {
      this.select();
    }
  };
}

export type Position = {
  x: number;
  y: number;
};

export class LeadingBlock extends Block {
  index: number;
  initMousePt: Position;
  initElmPt: Position;
  beingFollowedByOthers: boolean;
  constructor(
    block: Block,
    index: number,
    initMousePt: Position,
    initElmPt: Position
  ) {
    super(block, block.elm);
    this.index = index;
    this.initMousePt = initMousePt;
    this.initElmPt = initElmPt;
    this.beingFollowedByOthers = false;
  }
}

export type Gathered = {
  movingTopIndex: number;
  movingButtomIndex: number;
  movingTopElm: HTMLElement;
  movingButtomElm: HTMLElement;
};

export type OverRendering = {
  cursorPt: Position;
};
