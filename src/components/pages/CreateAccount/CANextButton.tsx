import { forwardRef, useContext } from "react";
import { VividButton } from "../../buttons/VividButton";
import { CreateAccountContext } from "./CreateAccountContext";

type Props = {
  disable: boolean;
  label?: string;
  disableLabel?: string;
  // nextFocusHandler?: () => void;
};

export const CANextButton = forwardRef<HTMLButtonElement, Props>(
  (props: Props, ref) => {
    const { setStep } = useContext(CreateAccountContext);
    return (
      <div className="w-full p-5 pb-0 bg-gray-100">
        <VividButton
          ref={ref}
          label={props.label || "NEXT"}
          disableLabel={props.disableLabel}
          onClick={() => {
            // if (props.nextFocusHandler) props.nextFocusHandler();
            setStep((prev) => {
              switch (prev) {
                case 1:
                  return 2;
                case 2:
                  return 3;
                case 3:
                  return 4;
                case 4:
                  return 4;
              }
            });
          }}
          disable={props.disable}
        />
        {/* <div>
        ... or already have an account?{" "}
        <Link
          className="font-bold text-rose-500 hover:text-rose-400"
          to="/login"
        >
          LOGIN
        </Link>
      </div> */}
      </div>
    );
  }
);
