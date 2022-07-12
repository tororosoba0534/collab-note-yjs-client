import { dndConsts } from "../dndConsts";
import { DndProps } from "../DndItem";
import { Block } from "../utils";

export const onMouseMove = (e: MouseEvent, props: DndProps) => {
  const leadingBlock = props.leadingBlock.current;
  if (!leadingBlock) return;
  const allBlocks = props.allBlocks.current;
  props.currentCursorPt.current = { x: e.clientX, y: e.clientY };

  const dx = e.clientX - leadingBlock.initMousePt.x;
  const dy = e.clientY - leadingBlock.initMousePt.y;

  if (!leadingBlock.beingFollowedByOthers) {
    if (dy < dndConsts.GATHER_VAL && dy > -dndConsts.GATHER_VAL) {
      leadingBlock.elm.style.transform = `translate(${dx}px,${dy}px)`;
      return;
    } else {
      leadingBlock.beingFollowedByOthers = true;
      const stayBefore: Block[] = [];
      const moveBefore: Block[] = [];
      const moveAfter: Block[] = [];
      const stayAfter: Block[] = [];
      allBlocks.forEach((block, index) => {
        if (!block) return;
        if (index < leadingBlock.index) {
          if (block.isSelected) {
            moveBefore.push(block);
          } else {
            stayBefore.push(block);
          }
        } else if (index === leadingBlock.index) {
          return;
        } else {
          if (block.isSelected) {
            moveAfter.push(block);
          } else {
            stayAfter.push(block);
          }
        }
      });

      const newAllBlocks = [
        ...stayBefore,
        ...moveBefore,
        leadingBlock,
        ...moveAfter,
        ...stayAfter,
      ];
      props.gathered.current = {
        movingTopIndex: stayBefore.length,
        movingButtomIndex: newAllBlocks.length - stayAfter.length - 1,
        movingTopElm: moveBefore[0]?.elm || leadingBlock.elm,
        movingButtomElm:
          moveAfter[moveAfter.length - 1]?.elm || leadingBlock.elm,
      };
      props.allBlocks.current = newAllBlocks;
      props.setRawBlocks(newAllBlocks);
      return;
    }
  }

  allBlocks.forEach((block) => {
    if (!block) return;
    if (block.isSelected) {
      block.elm.style.transform = `translate(${dx}px,${dy}px)`;
    }
  });

  // if (!props.gathered.current) return;

  // if (!props.muxOnMouseMove.current) return;
  // props.muxOnMouseMove.current = false;
  // setTimeout(() => {
  //   props.muxOnMouseMove.current = true;
  // }, 300);

  // const gathered = props.gathered.current;

  // const movingTopY = gathered.movingTopElm.getBoundingClientRect().top;
  // const movingButtomY =
  //   gathered.movingButtomElm.getBoundingClientRect().bottom;

  // const hoveredBefore: number[] = [];
  // const hoveredAfter: number[] = [];
  // const hoveredsInfo: HoveredsInfo = {};
  // let shouldSetAllBlocks = false;
  // allBlocks.forEach((block, index) => {
  //   if (!block) return;
  //   if (index < gathered.movingTopIndex) {
  //     const { top, bottom, left } = block.elm.getBoundingClientRect();
  //     const line = (top + bottom) / 2;
  //     if (movingTopY < line) {
  //       console.log("hover detected!");
  //       hoveredBefore.push(index);
  //       shouldSetAllBlocks = true;
  //       // hoveredsInfo.push({ key: block.key, xBefore: left, yBefore: top });
  //       hoveredsInfo[block.key] = { xBefore: left, yBefore: top };
  //     }
  //   } else if (index > gathered.movingButtomIndex) {
  //     const { top, bottom, left } = block.elm.getBoundingClientRect();
  //     const line = (top + bottom) / 2;
  //     if (movingButtomY > line) {
  //       console.log("hover detected!");
  //       hoveredAfter.push(index);
  //       shouldSetAllBlocks = true;
  //       hoveredsInfo[block.key] = { xBefore: left, yBefore: top };
  //     }
  //   } else {
  //     return;
  //   }
  // });
  // if (shouldSetAllBlocks) {
  //   let newAllBlocks: (Block | null)[];
  //   let newGathered: Gathered;

  //   if (hoveredBefore.length !== 0) {
  //     const before = allBlocks.slice(0, hoveredBefore[0]);
  //     const hovered = allBlocks.slice(
  //       hoveredBefore[0],
  //       hoveredBefore[0] + hoveredBefore.length
  //     );
  //     const moving = allBlocks.slice(
  //       gathered.movingTopIndex,
  //       gathered.movingButtomIndex + 1
  //     );
  //     const after = allBlocks.slice(gathered.movingButtomIndex + 1);
  //     newAllBlocks = [...before, ...moving, ...hovered, ...after];
  //     newGathered = {
  //       movingTopIndex: gathered.movingTopIndex - hovered.length,
  //       movingButtomIndex: gathered.movingButtomIndex - hovered.length,
  //       movingTopElm: gathered.movingTopElm,
  //       movingButtomElm: gathered.movingButtomElm,
  //     };
  //     leadingBlock.index = leadingBlock.index - hovered.length;
  //     // leadingBlock.initMousePt.y -= 80 * hovered.length;
  //   } else if (hoveredAfter.length !== 0) {
  //     const before = allBlocks.slice(0, gathered.movingTopIndex);
  //     const moving = allBlocks.slice(
  //       gathered.movingTopIndex,
  //       gathered.movingButtomIndex + 1
  //     );
  //     const hovered = allBlocks.slice(
  //       hoveredAfter[0],
  //       hoveredAfter[0] + hoveredAfter.length
  //     );
  //     const after = allBlocks.slice(hoveredAfter[0] + hoveredAfter.length);
  //     newAllBlocks = [...before, ...hovered, ...moving, ...after];
  //     newGathered = {
  //       movingTopIndex: gathered.movingTopIndex + hovered.length,
  //       movingButtomIndex: gathered.movingButtomIndex + hovered.length,
  //       movingTopElm: gathered.movingTopElm,
  //       movingButtomElm: gathered.movingButtomElm,
  //     };
  //     leadingBlock.index = leadingBlock.index + hovered.length;
  //     // leadingBlock.initMousePt.y += 80 * hovered.length;
  //   } else {
  //     return;
  //   }
  //   props.overRenderingInfo.current = {
  //     cursorPt: { x: e.clientX, y: e.clientY },
  //     hoveredsInfo: hoveredsInfo,
  //   };
  //   props.allBlocks.current = newAllBlocks;
  //   props.gathered.current = newGathered;
  //   // newAllBlocks.forEach((b) => {
  //   //   if (!b) return;
  //   //   b.elm.style.transform = "";
  //   // });
  //   props.setRawBlocks(newAllBlocks);
  // }
};
