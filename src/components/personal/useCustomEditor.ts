import Collaboration from "@tiptap/extension-collaboration";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useContext, useMemo } from "react";
import config from "../../config";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";
import { yjsConsts } from "../../yjs/yjsConsts";
import { YjsMsgContext } from "../../yjs/YjsMsgContext";
import * as decoding from "lib0/decoding";
import * as Y from "yjs";

export const useCustomEditor = (props: { userID: string }) => {
  const { yjsMsgStatus, setYjsMsgStatus } = useContext(YjsMsgContext);

  // ydoc should be recreated when user changes
  // so "userID" should be in the dependency array of useMemo.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ydoc = useMemo(() => new Y.Doc(), [props]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const provider = useMemo(() => {
    const provider = new CustomWSProvider(
      config.wsserver.URL,
      props.userID,
      ydoc
    );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setYjsMsgStatus, props, ydoc]);

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

  return { editor };
};
