import { RedoSvg } from "./icons/RedoSvg";
import { SelectParagraphSvg } from "./icons/SelectParagraphSvg";
import { UndoSvg } from "./icons/UndoSvg";
import { TooltipButton } from "./TooltipButton";
import * as encoding from "lib0/encoding";
import { yjsConsts } from "../../yjs/yjsConsts";
import { Editor } from "@tiptap/react";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";
import { ConnStatus, ConnStatusBox } from "./ConnStatusBox";
import { ToggleToolButton } from "./ToggleToolButton";
import { AlignCenterSvg } from "./icons/AlignCenterSvg";
import { ListSvg } from "./icons/ListSvg";
import { AlignRightSvg } from "./icons/AlignRightSvg";
import { SinkListItemSvg } from "./icons/SinkListItemSvg";
import { LiftListItemSvg } from "./icons/LiftListItemSvg";
import { WebsocketProvider } from "y-websocket";
import { useEffect, useState } from "react";
import { LoadingCircleSvg } from "../LoadingCircleSvg";

export const TopToolBar = (props: {
  editor: Editor | null;
  provider: CustomWSProvider | WebsocketProvider;
}) => {
  const [connStatus, setConnStatus] = useState<ConnStatus>("connecting");
  useEffect(() => {
    const interval = setInterval(() => {
      setConnStatus(
        props.provider.wsconnected
          ? "connected"
          : props.provider.wsconnecting
          ? "connecting"
          : "disconnected"
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [props.provider]);

  // if (connStatus === "connecting") {
  //   return (
  //     <div className="grow h-full relative">
  //       <div className="absolute left-12 top-5 w-8 h-8">
  //         <LoadingCircleSvg />
  //       </div>
  //       <div className="absolute text-xl right-10 top-5">Now connecting...</div>
  //     </div>
  //   );
  // }

  // if (connStatus === "disconnected") {
  //   return (
  //     <div className="grow h-full relative">
  //       <div className="absolute left-[90px]">Connection failed!</div>
  //       <button
  //         className="absolute bottom-2 left-24 bg-red-300 hover:bg-red-200 px-2 mx-1 rounded-md"
  //         onClick={() => window.location.reload()}
  //       >
  //         Try reconnect
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className="relative w-full h-16">
      {connStatus === "connecting" ? (
        <div className="absolute w-full h-16 z-50 bg-white  flex justify-center items-center">
          <div className="w-8 h-8">
            <LoadingCircleSvg />
          </div>
          <div className="text-xl">Now connecting...</div>
        </div>
      ) : connStatus === "disconnected" ? (
        <div className="absolute w-full h-16 z-50 bg-red-600 text-white  flex justify-center items-center xs:gap-5">
          <div className="py-2 pl-5 pr-0 w-fit">
            <span className="w-24">Connection</span> <span>failed!</span>
          </div>
          <button
            className=" bg-red-300 hover:bg-red-200 px-2 mx-1 mr-5 rounded-md text-gray-800"
            onClick={() => window.location.reload()}
          >
            Try reconnect
          </button>
        </div>
      ) : null}

      <div className="absolute w-full h-16">
        <div className="flex items-center justify-around">
          <div className="flex flex-col gap-1">
            <ToggleToolButton
              onClick={() => {
                props.editor?.chain().focus().toggleCodeBlock().run();
              }}
              isActive={
                props.editor ? props.editor.isActive("codeBlock") : false
              }
            >
              <div className="text-sm font-bold tracking-[-0.06em]">
                {"</>"}
              </div>
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
              isActive={
                props.editor ? props.editor.isActive("bulletList") : false
              }
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
                props.editor
                  ? !props.editor.can().liftListItem("listItem")
                  : true
              }
            >
              <LiftListItemSvg
                disable={
                  props.editor
                    ? !props.editor.can().liftListItem("listItem")
                    : true
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
              disable={
                props.editor ? props.editor.isActive("codeBlock") : false
              }
            >
              <AlignCenterSvg
                isActive={
                  props.editor
                    ? props.editor.isActive({ textAlign: "center" })
                    : false
                }
                disable={
                  props.editor ? props.editor.isActive("codeBlock") : false
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
                props.editor
                  ? !props.editor.can().sinkListItem("listItem")
                  : true
              }
            >
              <SinkListItemSvg
                disable={
                  props.editor
                    ? !props.editor.can().sinkListItem("listItem")
                    : true
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
                props.editor
                  ? props.editor.isActive({ textAlign: "right" })
                  : false
              }
              disable={
                props.editor ? props.editor.isActive("codeBlock") : false
              }
            >
              <AlignRightSvg
                isActive={
                  props.editor
                    ? props.editor.isActive({ textAlign: "right" })
                    : false
                }
                disable={
                  props.editor ? props.editor.isActive("codeBlock") : false
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
          {/* <div className="flex-none w-20 h-16 hidden xs:block">
            <ConnStatusBox provider={props.provider} />
          </div> */}
        </div>
      </div>
    </div>
  );
};
