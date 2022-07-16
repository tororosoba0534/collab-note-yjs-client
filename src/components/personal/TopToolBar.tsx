import { RedoSvg } from "./icons/RedoSvg";
import { SelectParagraphSvg } from "./icons/SelectParagraphSvg";
import { UndoSvg } from "./icons/UndoSvg";
import { TooltipButton } from "./TooltipButton";
import * as encoding from "lib0/encoding";
import { yjsConsts } from "../../yjs/yjsConsts";
import { Editor } from "@tiptap/react";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";
import { ConnStatusBox } from "./ConnStatusBox";
import { ToggleToolButton } from "./ToggleToolButton";
import { AlignCenterSvg } from "./icons/AlignCenterSvg";
import { ListSvg } from "./icons/ListSvg";

export const TopToolBar = (props: { editor: Editor | null }) => {
  return (
    <div className="flex items-center justify-around w-full h-16">
      <div className="flex flex-col gap-1">
        <ToggleToolButton
          onClick={() => {
            props.editor?.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          isActive={
            props.editor
              ? props.editor.isActive("heading", { level: 1 })
              : false
          }
        >
          H
        </ToggleToolButton>

        <ToggleToolButton
          onClick={() => {
            props.editor?.chain().focus().toggleBold().run();
          }}
          isActive={props.editor ? props.editor.isActive("bold") : false}
        >
          <div
            className="font-extrabold"
            style={{
              color: props.editor?.isActive("bold") ? "white" : "black",
            }}
          >
            B
          </div>
        </ToggleToolButton>
      </div>

      <div className="flex flex-col gap-1">
        <ToggleToolButton
          onClick={() => {
            if (!props.editor) return;

            if (props.editor.isActive({ textAlign: "center" })) {
              props.editor.chain().focus().unsetTextAlign().run();
              return;
            }
            props.editor.chain().focus().setTextAlign("center").run();
          }}
          isActive={
            props.editor
              ? props.editor.isActive({ textAlign: "center" })
              : false
          }
        >
          <AlignCenterSvg
            isActive={
              props.editor
                ? props.editor.isActive({ textAlign: "center" })
                : false
            }
          />
        </ToggleToolButton>

        <ToggleToolButton
          onClick={() => {
            props.editor?.chain().focus().toggleItalic().run();
          }}
          isActive={props.editor ? props.editor.isActive("italic") : false}
        >
          <div
            className="italic font-serif"
            style={{
              color: props.editor?.isActive("italic") ? "white" : "black",
            }}
          >
            I
          </div>
        </ToggleToolButton>
      </div>

      <div className="flex flex-col gap-1">
        <ToggleToolButton
          onClick={() => {
            props.editor?.chain().focus().toggleBulletList().run();
          }}
          isActive={props.editor ? props.editor.isActive("bulletList") : false}
        >
          <ListSvg
            isActive={
              props.editor ? props.editor.isActive("bulletList") : false
            }
          />
        </ToggleToolButton>

        <ToggleToolButton
          onClick={() => {
            props.editor?.chain().focus().toggleUnderline().run();
          }}
          isActive={props.editor ? props.editor.isActive("underline") : false}
        >
          <div
            className="underline"
            style={{
              color: props.editor?.isActive("underline") ? "white" : "black",
            }}
          >
            U
          </div>
        </ToggleToolButton>
      </div>

      <div className="flex flex-col">
        <div className="">
          <button className=" bg-gray-100 border-2 border-gray-300 rounded-md hover:bg-rose-100">
            <div className="w-6 h-6"></div>
          </button>
        </div>

        <ToggleToolButton
          onClick={() => {
            props.editor?.chain().focus().toggleStrike().run();
          }}
          isActive={props.editor ? props.editor.isActive("strike") : false}
        >
          <div
            className="line-through"
            style={{
              color: props.editor?.isActive("strike") ? "white" : "black",
            }}
          >
            ab
          </div>
        </ToggleToolButton>
      </div>

      <div className="flex flex-col">
        <ToggleToolButton
          disable
          isActive
          onClick={() => {
            return;
          }}
        >
          <div></div>
        </ToggleToolButton>

        <ToggleToolButton
          onClick={() => {
            props.editor?.chain().focus().toggleCode().run();
          }}
          isActive={props.editor ? props.editor.isActive("code") : false}
        >
          <div
            className=""
            style={{
              color: props.editor?.isActive("code") ? "white" : "black",
            }}
          >
            C
          </div>
        </ToggleToolButton>
      </div>

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
