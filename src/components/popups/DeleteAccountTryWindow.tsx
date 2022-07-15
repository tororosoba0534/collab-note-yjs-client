import { useContext, useEffect, useRef, useState } from "react";
import { isThrownErr } from "../../api/base";
import { useDeleteAccount } from "../../api/hooks/useDeleteAccount";
import { Validate } from "../../utils/validation";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { FormFrame } from "../form/FormFrame";
import { PersonalContext } from "../personal/PersonalContext";
import { PopupTemplate } from "./PopupTemplate";
import { ScrollPopupInner } from "./ScrollPopupInner";
import { ScrollPopupTemplate } from "./ScrollPopupTemplate";

export const DeleteAccountTryWindow = (props: { realUserID: string }) => {
  const { deleteAccount } = useDeleteAccount();

  const [submitMsg, setSubmitMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [confirmUserID, setConfirmUserID] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const { setPopupStatus } = useContext(PersonalContext);

  const submitBtnElm = useRef<HTMLButtonElement | null>(null);

  // Prevent abusing too many fetches
  const canSubmit = useRef(true);
  useEffect(() => {
    canSubmit.current = true;
  }, [confirmUserID, adminPassword]);

  const handleClickDeleteAccount = () => {
    if (!confirmUserID || !adminPassword) {
      setSubmitMsg("Fill in all blanks");
      return;
    }
    if (confirmUserID !== props.realUserID) {
      setSubmitMsg("User ID wrong.");
      return;
    }
    if (Validate.isNotValidPassword(adminPassword)) {
      setSubmitMsg("admin password is wrong");
      return;
    }

    if (!canSubmit.current) return;
    canSubmit.current = false;
    setIsLoading(true);
    deleteAccount(adminPassword).then(({ status }) => {
      setIsLoading(false);
      if (status === 200) {
        setPopupStatus("deleteAccountOK");
      }
      if (isThrownErr(status)) {
        setSubmitMsg(`Thrown ERR: ${status}`);
        return;
      }
      if (status === 401) {
        setPopupStatus("sessionTimeout");
        return;
      }
      if (status === 403) {
        setSubmitMsg("admin password is wrong.");
        return;
      }
      if (status === 500) {
        setSubmitMsg(
          "500 Internal Server Error: Please wait for a minutes till the server is recovered."
        );
        return;
      }
      console.error("unexpected status code.");
    });
  };

  return (
    <ScrollPopupTemplate
      submitBtnElm={submitBtnElm}
      handleClose={() => setPopupStatus(null)}
      title="Delete Account"
      isLoading={isLoading}
      submitMsg={submitMsg}
    >
      <p className="m-1 text-sm">
        This is very <span className="bg-rose-200 px-1">dangerous</span>{" "}
        operation. You <span className="bg-rose-200 px-1">can NOT recover</span>{" "}
        your account. If you'd like to delete this account, please fill in the
        below blank with your user ID.
      </p>
      <div className="w-full my-5 px-3">
        <input
          className="w-full border-2 border-gray-300 rounded-full px-3 focus:outline-none focus:border-rose-600"
          value={confirmUserID}
          onChange={(e) => setConfirmUserID(e.currentTarget.value)}
        />
      </div>

      <ScrollPopupInner>
        <FloatingLabelInput
          label="Admin Password"
          type="password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.currentTarget.value)}
        />
      </ScrollPopupInner>

      <div className="flex items-center justify-around h-20">
        <button
          className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
          onClick={() => {
            handleClickDeleteAccount();
          }}
          ref={submitBtnElm}
        >
          Delete
        </button>
        <button
          className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
          onClick={() => setPopupStatus(null)}
        >
          Cancel
        </button>
      </div>
    </ScrollPopupTemplate>
  );
};
