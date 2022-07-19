import "./TiptapEditor.css";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import config from "../../config";
import { useContext, useEffect, useMemo } from "react";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";
import { TopToolBar } from "./TopToolBar";
import { Menu } from "./Menu";
import { YjsWS } from "../../yjs/YjsWS";
import { PopupsInPersonal } from "./PopupsInPersonal";
import { PersonalContext } from "./PersonalContext";
import { useCheckAuth } from "../../api/hooks/useCheckAuth";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { ToggleToolButton } from "./ToggleToolButton";
import { CustomCollaboration } from "../../tiptap/CustomCollaboration";

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
    //     content: `
    //     <h1 style="text-align: center">WELCOME to <u>Collab-Note-YJS</u> !!!</h1>
    //     <h2 style="text-align: right">created by tororosoba0534</h2>
    //     <p></p>
    //     <p>This content is just an example, so you can freely overwrite it📝</p>
    //     <p></p>
    //     <p style="text-align: center">You can select some texts and change them <strong>bold</strong>, <em>italic</em>, <u>underlined</u>, and <code>codeLike</code>.</p>
    //     <p></p>
    //     <p>Also you may turn a paragraph into:</p>
    //     <ul><li>bullet list like that!<ul><li>(and make nest deeper)</li></ul></li></ul>
    //     <p></p>
    //     <pre><code>// or code-like style.
    // export const greeting = () => {
    //   console.log("Hello world!")
    // }</code></pre>
    // <p></p>
    //     `,
    extensions: [
      StarterKit.configure({
        // The Collaboration extension comes with its own history handling
        history: false,
        // listItem: { HTMLAttributes: { class: "list-disc px-3" } },
      }),
      // Register the document with Tiptap

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

      // https://github.com/ueberdosis/tiptap/issues/2761
      // Fork Collaboration Plugin so that undo and redo work well with BubbleMenu.
      CustomCollaboration.configure({
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

  useEffect(() => {
    console.log("test useEffect");

    return () => {
      console.log("test useEffect return");

      // Destroy websocket connection when webpage changes.
      // But should ignore while development probably because of strange behavior of webpack hot reload.
      if (config.NODE_ENV === "production") {
        provider.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      <div className="fixed top-0 w-full h-20 shadow-md bg-white z-20 flex items-center">
        <TopToolBar editor={editor} provider={provider} />
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
              disable={
                editor
                  ? !editor.can().toggleBold() ||
                    editor.isActive("code") ||
                    editor.isActive("codeBlock")
                  : false
              }
            >
              <div className="font-extrabold">B</div>
            </ToggleToolButton>
            <ToggleToolButton
              onClick={() => {
                editor?.chain().focus().toggleItalic().run();
              }}
              isActive={editor ? editor.isActive("italic") : false}
              disable={
                editor
                  ? !editor.can().toggleItalic() ||
                    editor.isActive("code") ||
                    editor.isActive("codeBlock")
                  : false
              }
            >
              <div className="italic font-serif">I</div>
            </ToggleToolButton>

            <ToggleToolButton
              onClick={() => {
                editor?.chain().focus().toggleUnderline().run();
              }}
              isActive={editor ? editor.isActive("underline") : false}
              disable={
                editor
                  ? !editor.can().toggleUnderline() ||
                    editor.isActive("code") ||
                    editor.isActive("codeBlock")
                  : false
              }
            >
              <div className="underline">U</div>
            </ToggleToolButton>

            <ToggleToolButton
              onClick={() => {
                editor?.chain().focus().toggleStrike().run();
              }}
              isActive={editor ? editor.isActive("strike") : false}
              disable={
                editor
                  ? !editor.can().toggleStrike() ||
                    editor.isActive("code") ||
                    editor.isActive("codeBlock")
                  : false
              }
            >
              <div className="line-through">ab</div>
            </ToggleToolButton>

            <ToggleToolButton
              onClick={() => {
                editor?.chain().focus().toggleCode().run();
              }}
              isActive={editor ? editor.isActive("code") : false}
              disable={editor.isActive("codeBlock")}
            >
              <div className="">C</div>
            </ToggleToolButton>
          </BubbleMenu>
        )}
        <EditorContent editor={editor} />
      </div>

      <PopupsInPersonal provider={provider} userID={userID} />
    </div>
  );
};
