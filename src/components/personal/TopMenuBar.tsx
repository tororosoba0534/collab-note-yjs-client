import { RedoSvg } from "./icons/RedoSvg";
import { SelectParagraphSvg } from "./icons/SelectParagraphSvg";
import { UndoSvg } from "./icons/UndoSvg";
import { TooltipButton } from "./TooltipButton";
import * as encoding from "lib0/encoding";
import { yjsConsts } from "../../yjs/yjsConsts";
import { Editor } from "@tiptap/react";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";

export const TopMenuBar = (props: { editor: Editor | null }) => {
  return (
    <div className="flex items-center justify-around w-full h-16">
      <TooltipButton
        // src={selectParagraphSvg}
        img={SelectParagraphSvg}
        tooltip="Selecting paragraph"
        onClick={() => {
          // CSS can be applied to .ProseMirror-selectednode class
          props.editor?.chain().focus().selectParentNode().run();
        }}
      />

      <TooltipButton
        img={UndoSvg}
        tooltip="Undo"
        onClick={() => {
          props.editor?.chain().focus().undo().run();
        }}
      />

      <TooltipButton
        img={RedoSvg}
        tooltip="Redo"
        onClick={() => {
          props.editor?.chain().focus().redo().run();
        }}
      />
    </div>
  );
};
