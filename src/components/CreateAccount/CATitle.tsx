import { Link } from "react-router-dom";

export const CATitle = (props: {
  didSubmitOnce: boolean;
  submitMsg: string;
  thrownErr: string;
  status: number;
}) => {
  return (
    <div>
      <h1 className="text-2xl">Create your account</h1>

      {!props.didSubmitOnce ? null : props.submitMsg ? (
        <div className="w-full rounded-md bg-red-400 text-white font-bold">
          {props.submitMsg}
        </div>
      ) : props.thrownErr ? (
        <div className="w-full rounded-md bg-red-400 text-white font-bold">
          {props.submitMsg}
        </div>
      ) : props.status !== 200 ? (
        <div className="w-full rounded-md bg-red-400 text-white font-bold">
          status code: {props.status}
        </div>
      ) : (
        <div className="w-full rounded-md bg-blue-400 text-white font-bold">
          Succeeded! If you see this page yet, please go to{" "}
          <Link
            className="font-bold text-rose-500 hover:text-rose-400"
            to="/login"
          >
            login page
          </Link>
          !
        </div>
      )}
    </div>
  );
};
