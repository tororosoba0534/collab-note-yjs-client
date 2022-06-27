import "./TiptapEditor.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import * as encoding from "lib0/encoding";
import { WebsocketProvider } from "y-websocket";
import config from "../../config";
import { useContext, useMemo, useState } from "react";
import { TooltipButton } from "./TooltipButton";
// import selectParagraphSvg from "./selectParagraph.svg";
import { SelectParagraphSvg } from "./icons/SelectParagraphSvg";
import { UndoSvg } from "./icons/UndoSvg";
import { RedoSvg } from "./icons/RedoSvg";
import { LogoutWindow } from "../popups/LogoutWindow";
import ErrorPage from "../errorPages/ErrorPage";

import * as decoding from "lib0/decoding";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";
import { YjsMsgContext } from "../../yjs/YjsMsgContext";
import { yjsConsts } from "../../yjs/yjsConsts";

export const TiptapEditor = ({ userID }: { userID: string }) => {
  const { yjsMsgStatus, setYjsMsgStatus } = useContext(YjsMsgContext);

  // ydoc should be recreated when user changes
  // so "userID" should be in the dependency array of useMemo.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ydoc = useMemo(() => new Y.Doc(), [userID]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const provider = useMemo(() => {
    const provider = new CustomWSProvider(config.wsserver.URL, userID, ydoc);
    if (provider.ws) {
      provider.ws.addEventListener("message", (event) => {
        const decoder = decoding.createDecoder(new Uint8Array(event.data));
        const messageType = decoding.readVarUint(decoder);
        console.log(`messageType: ${messageType}`);
        setYjsMsgStatus((prevStatus) => {
          if (prevStatus) return prevStatus;
          return messageType === yjsConsts.MESSAGE_DELETE_ACCOUNT
            ? "deleteAccount"
            : messageType === yjsConsts.MESSAGE_CHANGE_USER_ID
            ? "changeUserID"
            : messageType === yjsConsts.MESSAGE_CHANGE_PASSWORD
            ? "changePassword"
            : messageType === yjsConsts.MESSAGE_TEST
            ? "test"
            : prevStatus;
        });
      });
    }

    return provider;
  }, [setYjsMsgStatus, userID, ydoc]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // The Collaboration extension comes with its own history handling
        history: false,
      }),
      // Register the document with Tiptap
      Collaboration.configure({
        document: ydoc,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          " border-4 border-gray-500 shadow-md focus:bg-white focus:outline-none focus:border-gray-400 focus:ring focus:ring-offset-2 focus:ring-gray-400 px-3 py-5 rounded-xl mb-20",
      },
    },
  });

  const [isOpenLogout, setIsOpenLogout] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(true);
  const [didTryLogoutOnce, setDidTryLogoutOnce] = useState(false);

  if (!isLogoutLoading && didTryLogoutOnce)
    return <ErrorPage status={status} />;

  return (
    <div className="relative">
      <div className="fixed top-0 w-full h-16 shadow-md bg-white z-10 flex items-center justify-around">
        <TooltipButton
          // src={selectParagraphSvg}
          img={SelectParagraphSvg}
          tooltip="Selecting paragraph"
          onClick={() => {
            // CSS can be applied to .ProseMirror-selectednode class
            editor?.chain().focus().selectParentNode().run();
          }}
        />

        <TooltipButton
          img={UndoSvg}
          tooltip="Undo"
          onClick={() => {
            editor?.chain().focus().undo().run();
          }}
        />

        <TooltipButton
          img={RedoSvg}
          tooltip="Redo"
          onClick={() => {
            editor?.chain().focus().redo().run();
          }}
        />

        <TooltipButton label="LOGOUT" onClick={() => setIsOpenLogout(true)} />

        <TooltipButton
          label="TEST"
          onClick={() => {
            const encoder = encoding.createEncoder();
            encoding.writeVarUint(encoder, yjsConsts.MESSAGE_TEST);
            provider.ws?.send(encoding.toUint8Array(encoder));
          }}
        />
      </div>
      <div className="absolute inset-x-10 top-20 mb-10">
        <EditorContent editor={editor} />
      </div>

      <LogoutWindow
        isOpenLogout={isOpenLogout}
        setIsOpenLogout={setIsOpenLogout}
        setDidTryOnce={setDidTryLogoutOnce}
        setIsLoading={setIsLogoutLoading}
      />
    </div>
  );
};
