import { useLogout } from "../../api/hooks";

export const LogoutWindow = (props: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { logout } = useLogout();

  if (!props.isOpen) return null;

  return (
    <div>
      <div onClick={() => props.setIsOpen(false)}>X</div>
      <h1>This is Logout window</h1>
      <div>Really log out?</div>
      <button
        onClick={async () => {
          const { status, thrownErr } = await logout();
          if (status === 200) {
            console.log("succeed");
            return;
          }
          console.log("failed");
        }}
      >
        Logout
      </button>
      <button onClick={() => props.setIsOpen(false)}>Cancel</button>
    </div>
  );
};
