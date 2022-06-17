import { useDeleteAccount } from "../../api/hooks";

export const DeleteAccountWindow = (props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { deleteAccount } = useDeleteAccount();

  if (!props.isOpen) return null;

  return (
    <div>
      <div onClick={() => props.setIsOpen(false)}>X</div>
      <h1>This is DeleteAccount window</h1>
      <div>Really delete account?</div>
      <button
        onClick={async () => {
          const { status } = await deleteAccount();
          if (status === 200) {
            console.log("delete account succeeded!");
            return;
          }
          console.log("delete account failed");
        }}
      >
        Delete
      </button>
      <button onClick={() => props.setIsOpen(false)}>Cancel</button>
    </div>
  );
};
