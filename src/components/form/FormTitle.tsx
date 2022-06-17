import { Link } from "react-router-dom";
import { isThrownErr, Status } from "../../api/base";
import { NumsCreateAccount } from "../../api/fetches";

export const FormTitle = (props: {
  didSubmitOnce: boolean;
  submitMsg: string;
  isLoading: boolean;
  redirectRoute: string;
  redirectLabel: string;
}) => {
  return (
    <div>
      <h1 className="text-2xl">Create your account</h1>

      {!props.didSubmitOnce ? null : props.isLoading ? (
        <div className="w-full rounded-md  ">{"Wait for minutes..."}</div>
      ) : props.submitMsg ? (
        <div className="w-full rounded-md bg-red-400 text-white font-bold">
          {props.submitMsg}
        </div>
      ) : (
        <div className="w-full rounded-md bg-blue-400 text-white font-bold">
          Succeeded! If you see this page yet, please go to{" "}
          <Link
            className="font-bold text-rose-500 hover:text-rose-400"
            to={
              props.redirectRoute[0] === "/"
                ? props.redirectRoute
                : "/" + props.redirectRoute
            }
          >
            {props.redirectLabel}
          </Link>
          !
        </div>
      )}
    </div>
  );
};
