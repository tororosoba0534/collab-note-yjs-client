import "./TiptapEditor.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import config from "../config";
import { useMemo } from "react";
import { useAuth } from "../auths/useAuth";




export const TiptapEditor = ({username}: {username: string}) => {
  const {logout} = useAuth()
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ydoc = useMemo(() => new Y.Doc(), [username])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const provider = useMemo(() => new WebsocketProvider(config.wsserver.URL, username, ydoc), [username, ydoc])

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

  return <div className="editor-page">
    <div className="editor-main" >
      <button onClick={() => logout()}>logout</button>
      <button onClick={() => {
        // CSS can be applied to .ProseMirror-selectednode class
        editor?.chain().focus().selectParentNode().run()
        }}>selectParentNode</button>
      <EditorContent editor={editor} />
    </div>
    <div className="editor-menu" >
      <button className="editor-menu-title">HERE COMES MENU</button>
      <div className="editor-menu-inner">
        <button >pseudo Logout</button>
        <button >pseudo Account Setting</button>
      </div>
    </div>
    
  </div> 
};
