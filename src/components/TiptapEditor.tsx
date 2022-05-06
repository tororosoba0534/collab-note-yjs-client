import "./TiptapEditor.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import config from "../config";

const ydoc = new Y.Doc();
const provider = new WebsocketProvider(config.wsserver.url, 'global-room', ydoc)

export const TiptapEditor = () => {
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
    content: "<p>Hello World!</p>",
  });

  return <EditorContent editor={editor} />;
};
