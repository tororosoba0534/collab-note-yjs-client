import "./TiptapEditor.css";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import config from "../../config";
import { useContext, useEffect, useMemo, useState } from "react";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";
import { TopToolBar } from "./TopToolBar";
import { Menu } from "./Menu";
import { YjsWS } from "../../yjs/YjsWS";
import { PopupsInPersonal } from "./PopupsInPersonal";
import { ConnStatusBox } from "./ConnStatusBox";
import { PersonalContext } from "./PersonalContext";
import { useCheckAuth } from "../../api/hooks/useCheckAuth";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { ToggleToolButton } from "./ToggleToolButton";

export const TiptapEditor = ({ userID }: { userID: string }) => {
  const { setPopupStatus } = useContext(PersonalContext);
  const { checkAuth } = useCheckAuth();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID, ydoc]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // The Collaboration extension comes with its own history handling
        history: false,
        // listItem: { HTMLAttributes: { class: "list-disc px-3" } },
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
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
    ],
    editorProps: {
      attributes: {
        class:
          " border-4 border-gray-500 shadow-md focus:bg-white focus:outline-none focus:border-gray-400 focus:ring focus:ring-offset-2 focus:ring-gray-400 px-3 py-5 rounded-xl mb-20",
      },
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("checking auth in useEffect...");
      checkAuth().then(({ status }) => {
        if (status !== 200) {
          console.log("SESSION TIMEOUT!!");
          setPopupStatus("sessionTimeout");
          clearInterval(interval);
          provider.destroy();
        }
      });
    }, config.CHECK_AUTH_INTERVAL);
    return () => clearInterval(interval);
  }, [checkAuth, provider, setPopupStatus]);

  return (
    <div className="relative">
      <div className="fixed top-0 w-full h-16 shadow-md bg-white z-10 flex items-center">
        <TopToolBar editor={editor} />
        {/* <div className="flex-none w-20 h-16">
          <ConnStatusBox provider={provider} />
        </div> */}
        <Menu provider={provider} userID={userID} />
      </div>
      <div className="absolute inset-x-10 top-32 mb-10">
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <ToggleToolButton
              onClick={() => {
                editor?.chain().focus().toggleBold().run();
              }}
              isActive={editor ? editor.isActive("bold") : false}
              disable={editor ? editor.isActive("code") : false}
            >
              <div
                className="font-extrabold"
                style={{
                  color: editor?.isActive("code")
                    ? "#9ca3af"
                    : editor?.isActive("bold")
                    ? "white"
                    : "black",
                }}
              >
                B
              </div>
            </ToggleToolButton>
            <ToggleToolButton
              onClick={() => {
                editor?.chain().focus().toggleItalic().run();
              }}
              isActive={editor ? editor.isActive("italic") : false}
              disable={editor ? editor.isActive("code") : false}
            >
              <div
                className="italic font-serif"
                style={{
                  color: editor?.isActive("code")
                    ? "#9ca3af"
                    : editor?.isActive("italic")
                    ? "white"
                    : "black",
                }}
              >
                I
              </div>
            </ToggleToolButton>

            <ToggleToolButton
              onClick={() => {
                editor?.chain().focus().toggleUnderline().run();
              }}
              isActive={editor ? editor.isActive("underline") : false}
              disable={editor ? editor.isActive("code") : false}
            >
              <div
                className="underline"
                style={{
                  color: editor?.isActive("code")
                    ? "#9ca3af"
                    : editor?.isActive("underline")
                    ? "white"
                    : "black",
                }}
              >
                U
              </div>
            </ToggleToolButton>

            <ToggleToolButton
              onClick={() => {
                editor?.chain().focus().toggleStrike().run();
              }}
              isActive={editor ? editor.isActive("strike") : false}
              disable={editor ? editor.isActive("code") : false}
            >
              <div
                className="line-through"
                style={{
                  color: editor?.isActive("code")
                    ? "#9ca3af"
                    : editor?.isActive("strike")
                    ? "white"
                    : "black",
                }}
              >
                ab
              </div>
            </ToggleToolButton>

            <ToggleToolButton
              onClick={() => {
                editor?.chain().focus().toggleCode().run();
              }}
              isActive={editor ? editor.isActive("code") : false}
            >
              <div
                className=""
                style={{
                  color: editor?.isActive("code") ? "white" : "black",
                }}
              >
                C
              </div>
            </ToggleToolButton>
          </BubbleMenu>
        )}
        <EditorContent editor={editor} />
      </div>

      <PopupsInPersonal provider={provider} userID={userID} />
    </div>
  );
};
