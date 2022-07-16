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
import { AlignRightSvg } from "./icons/AlignRightSvg";
import { SinkListItemSvg } from "./icons/SinkListItemSvg";
import { LiftListItemSvg } from "./icons/LiftListItemSvg";

export const TopToolBar = (props: { editor: Editor | null }) => {
  return (
    <div className="flex items-center justify-around w-full h-16">
      <div className="flex flex-col gap-1">
        <ToggleToolButton
          onClick={() => {
            props.editor?.chain().focus().toggleCodeBlock().run();
          }}
          isActive={props.editor ? props.editor.isActive("codeBlock") : false}
        >
          <div className="text-sm font-bold tracking-[-0.06em]">{"</>"}</div>
        </ToggleToolButton>

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
          h1
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
            props.editor?.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          isActive={
            props.editor
              ? props.editor.isActive("heading", { level: 2 })
              : false
          }
        >
          h2
        </ToggleToolButton>
      </div>

      <div className="flex flex-col gap-1">
        <ToggleToolButton
          onClick={() => {
            props.editor?.chain().focus().liftListItem("listItem").run();
          }}
          isActive={false}
          disable={
            props.editor ? !props.editor.can().liftListItem("listItem") : true
          }
        >
          <LiftListItemSvg
            disable={
              props.editor ? !props.editor.can().liftListItem("listItem") : true
            }
          />
        </ToggleToolButton>

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
      </div>

      <div className="flex flex-col gap-1">
        <ToggleToolButton
          onClick={() => {
            props.editor?.chain().focus().sinkListItem("listItem").run();
          }}
          isActive={false}
          disable={
            props.editor ? !props.editor.can().sinkListItem("listItem") : true
          }
        >
          <SinkListItemSvg
            disable={
              props.editor ? !props.editor.can().sinkListItem("listItem") : true
            }
          />
        </ToggleToolButton>

        <ToggleToolButton
          onClick={() => {
            if (!props.editor) return;

            if (props.editor.isActive({ textAlign: "right" })) {
              props.editor.chain().focus().unsetTextAlign().run();
              return;
            }
            props.editor.chain().focus().setTextAlign("right").run();
          }}
          isActive={
            props.editor ? props.editor.isActive({ textAlign: "right" }) : false
          }
        >
          <AlignRightSvg
            isActive={
              props.editor
                ? props.editor.isActive({ textAlign: "right" })
                : false
            }
          />
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
