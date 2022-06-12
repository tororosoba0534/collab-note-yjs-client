import "./TiptapEditor.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import config from "../../config";
import { useContext, useMemo } from "react";
import { PopupsContext, PopupsProvider } from "../popups/PopupsProvider";

export const TiptapEditor = ({ username }: { username: string }) => {
  // ydoc should be recreated when user changes
  // so "username" should be in the dependency array of useMemo.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ydoc = useMemo(() => new Y.Doc(), [username]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const provider = useMemo(
    () => new WebsocketProvider(config.wsserver.URL, username, ydoc),
    [username, ydoc]
  );

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
          " border-4 border-gray-500 focus:bg-white focus:outline-none focus:border-gray-400 focus:ring focus:ring-offset-2 focus:ring-gray-400 px-3 py-5 rounded-xl mb-20",
      },
    },
  });

  const { setIsOpenLogout } = useContext(PopupsContext);

  return (
    <div className="relative">
      <div className="fixed top-0 w-full h-16 border-2 border-rose-400 bg-rose-300 z-10 flex items-center justify-around">
        <button
          onClick={() => {
            // CSS can be applied to .ProseMirror-selectednode class
            editor?.chain().focus().selectParentNode().run();
          }}
        >
          <p>select</p>
          <p>paragraph</p>
        </button>

        <button
          onClick={() => {
            editor?.chain().focus().undo().run();
          }}
        >
          UNDO
        </button>

        <button
          onClick={() => {
            editor?.chain().focus().redo().run();
          }}
        >
          REDO
        </button>

        <button onClick={() => setIsOpenLogout(true)}>Logout</button>
      </div>
      <div className="absolute inset-x-10 top-20 mb-10">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
