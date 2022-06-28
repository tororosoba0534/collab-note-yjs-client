import { Link } from "react-router-dom";
import { isThrownErr, Status } from "../../api/base";

const ErrorPage = (props: { status: Status<number> }) => {
  return (
    <div className="fixed inset-0 bg-gray-100 z-20 flex flex-col gap-10">
      <div>
        {isThrownErr(props.status)
          ? props.status
          : props.status === 500
          ? "500 Internal Server Error: Wait a minutes please!"
          : `status code: ${props.status}`}
      </div>
      <Link to="/login">Login page</Link>
      <Link to="/create-account">Create new account</Link>
    </div>
  );
};

export default ErrorPage;
