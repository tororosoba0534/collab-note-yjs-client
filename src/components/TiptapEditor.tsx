import "./TiptapEditor.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import config from "../config";

const ydoc = new Y.Doc();
const provider = new WebsocketProvider(config.wsserver.URL, 'global-room', ydoc)

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
  });

  return <EditorContent editor={editor} />;
};
