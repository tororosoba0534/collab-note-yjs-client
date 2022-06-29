import "./TiptapEditor.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import config from "../../config";
import { useContext, useMemo, useState } from "react";
import { LogoutWindow } from "../popups/LogoutWindow";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";
import { YjsMsgContext } from "../../yjs/YjsMsgContext";
import { TopToolBar } from "./TopToolBar";
import { Menu } from "./Menu";
import { YjsWS } from "../../yjs/YjsWS";
import { DeleteAccountWindow } from "../popups/DeleteAccountWindow";
import { PopupsInPersonal } from "./PopupsInPersonal";

export const TiptapEditor = ({ userID }: { userID: string }) => {
  const { yjsMsgStatus, setYjsMsgStatus, isYjsOriginOf } =
    useContext(YjsMsgContext);

  // ydoc should be recreated when user changes
  // so "userID" should be in the dependency array of useMemo.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ydoc = useMemo(() => new Y.Doc(), [userID]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const provider = useMemo(() => {
    const provider = new CustomWSProvider(config.wsserver.URL, userID, ydoc);
    if (provider.ws) {
      provider.ws.addEventListener("message", (event) => {
        YjsWS.manageMsgPopup(event, setYjsMsgStatus, isYjsOriginOf);
      });
    }

    return provider;
  }, [isYjsOriginOf, setYjsMsgStatus, userID, ydoc]);

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

  const [popupStatus, setPopupStatus] = useState<
    null | "logout" | "deleteAccount" | "changeUserID" | "changePassword"
  >(null);

  return (
    <div className="relative">
      <div className="fixed top-0 w-full h-16 shadow-md bg-white z-10 flex ">
        <TopToolBar editor={editor} />
        <Menu setPopupStatus={setPopupStatus} provider={provider} />
      </div>
      <div className="absolute inset-x-10 top-20 mb-10">
        <EditorContent editor={editor} />
      </div>

      <PopupsInPersonal
        popupStatus={popupStatus}
        setPopupStatus={setPopupStatus}
      />
    </div>
  );
};
