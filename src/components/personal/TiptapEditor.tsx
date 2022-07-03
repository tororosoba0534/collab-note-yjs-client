import "./TiptapEditor.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import config from "../../config";
import { useEffect, useMemo, useState } from "react";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";
import { TopToolBar } from "./TopToolBar";
import { Menu } from "./Menu";
import { YjsWS } from "../../yjs/YjsWS";
import { PopupsInPersonal } from "./PopupsInPersonal";
import { ConnStatusBox } from "./ConnStatusBox";

export type PopupStatus =
  | null
  | "logout"
  | "test"
  | "deleteAccountTry"
  | "changeUserIDTry"
  | "changePasswordTry"
  | "deleteAccountOK"
  | "changeUserIDOK"
  | "changePasswordOK";

export const TiptapEditor = ({ userID }: { userID: string }) => {
  const [popupStatus, setPopupStatus] = useState<PopupStatus>(null);

  // ydoc should be recreated when user changes
  // so "userID" should be in the dependency array of useMemo.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ydoc = useMemo(() => new Y.Doc(), [userID]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const provider = useMemo(() => {
    const provider = new CustomWSProvider(config.wsserver.URL, userID, ydoc, {
      disableBc: true,
    });
    if (provider.ws) {
      provider.ws.addEventListener("message", (event) => {
        YjsWS.manageMsgPopup(event, { setPopupStatus });
      });
      provider.ws.addEventListener("open", () => {
        console.log("websocket connection open event fired!");
      });
      provider.ws.addEventListener("close", () => {
        console.log("websocket connection close event fired!");
      });
    }

    return provider;
  }, [userID, ydoc]);

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
      // CollaborationCursor.configure({
      //   provider: provider,
      //   user: {
      //     name: "Cyndi Lauper",
      //     color: "#f783ac",
      //   },
      // }),
    ],
    editorProps: {
      attributes: {
        class:
          " border-4 border-gray-500 shadow-md focus:bg-white focus:outline-none focus:border-gray-400 focus:ring focus:ring-offset-2 focus:ring-gray-400 px-3 py-5 rounded-xl mb-20",
      },
    },
  });

  return (
    <div className="relative">
      <div className="fixed top-0 w-full h-16 shadow-md bg-white z-10 flex ">
        <TopToolBar editor={editor} />
        <div className="flex-none w-40 h-16">
          <ConnStatusBox provider={provider} />
        </div>
        <Menu setPopupStatus={setPopupStatus} provider={provider} />
      </div>
      <div className="absolute inset-x-10 top-20 mb-10">
        <EditorContent editor={editor} />
      </div>

      <PopupsInPersonal
        provider={provider}
        popupStatus={popupStatus}
        setPopupStatus={setPopupStatus}
      />
    </div>
  );
};
