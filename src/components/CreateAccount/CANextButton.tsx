import { useContext } from "react";
import { Link } from "react-router-dom";
import { VividButton } from "../buttons/VividButton";
import { CAStepNum } from "./CAStep";
import { CreateAccountContext } from "./CreateAccountContext";

export const CANextButton = (props: {
  disable: boolean;
  label?: string;
  disableLabel?: string;
}) => {
  const { setStep } = useContext(CreateAccountContext);
  return (
    <div className="w-full p-5 pb-0 bg-gray-100">
      <VividButton
        label={props.label || "NEXT"}
        disableLabel={props.disableLabel}
        onClick={() =>
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
          })
        }
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
};
