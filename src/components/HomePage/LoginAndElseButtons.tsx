import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isThrownErr } from "../../api/base";
import { useCheckAuth } from "../../api/hooks/useCheckAuth";
import { LoadingCircleSvg } from "../LoadingCircleSvg";

export const LoginAndElseButtons = () => {
  const navigate = useNavigate();
  const { checkAuth, userID, status } = useCheckAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) return;
    checkAuth().then(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-5">
      {isLoading ? (
        <button className="w-60 h-14 rounded border-4 border-gray-500  text-gray-500 font-semibold text-center cursor-progress flex items-center justify-center gap-1">
          <div className="w-6 h-6">
            <LoadingCircleSvg />
          </div>
          <div className="">Checking...</div>
        </button>
      ) : status === 200 ? (
        <button
          className="w-60 h-14 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block  focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
          onClick={() => navigate("/personal")}
        >
          <div className="w-full text-sm">Collab as</div>
          <div className="w-full text-sm ">
            <span className="text-black px-1 bg-white rounded-sm">
              {userID}
            </span>
          </div>
        </button>
      ) : status === 401 ? (
        <div className="w-60 h-14 rounded border-4 border-gray-500  text-gray-500 font-semibold text-center">
          <div className="w-full">Please login</div>
          <div className="w-full">or create your account</div>
        </div>
      ) : (
        <div className="w-60 h-14 rounded border-4 border-gray-500  text-gray-500 font-semibold flex justify-center items-center text-sm">
          ERR: {isThrownErr(status) ? status : `status code ${status}`}
        </div>
      )}
      {!isLoading && status === 200 ? (
        <button
          className="w-60 h-14  py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block  focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login another account
        </button>
      ) : (
        <button
          className="w-60 h-14  py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block  focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
      <button
        className="w-60 h-14  py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block  focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
        onClick={() => navigate("/create-account")}
      >
        Create new account
      </button>
    </div>
  );
};
