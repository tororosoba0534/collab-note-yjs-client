import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isThrownErr } from "../../api/base";
import { useCheckAuth } from "../../api/hooks/useCheckAuth";
import { LoadingCircleSvg } from "../LoadingCircleSvg";

const CustomButton = (props: {
  children: ReactNode;
  disable?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  if (props.disable)
    return (
      <div className="w-60 h-14 rounded border-4 border-gray-500  text-gray-500 font-semibold text-center flex items-center justify-center gap-1">
        {props.children}
      </div>
    );
  return (
    <button
      className="w-60 h-14 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block  focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

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
    <div className="w-full lg:w-[1024px] flex flex-col sm:flex-row items-center justify-around gap-5 px-5">
      {isLoading ? (
        <CustomButton disable>
          <div className="w-6 h-6">
            <LoadingCircleSvg />
          </div>
          <div className="">Checking...</div>
        </CustomButton>
      ) : status === 200 ? (
        <CustomButton onClick={() => navigate("/personal")}>
          <div className="w-full text-sm">Collab as</div>
          <div className="w-full text-sm ">
            <span className="text-black px-1 bg-white rounded-sm">
              {userID}
            </span>
          </div>
        </CustomButton>
      ) : status === 401 ? (
        <CustomButton disable>
          <div className="flex flex-col items-center justify-center">
            <div className="w-full">Please LOGIN</div>
            <div className="w-full">or CREATE your account</div>
          </div>
        </CustomButton>
      ) : (
        <CustomButton disable>
          ERR: {isThrownErr(status) ? status : `status code ${status}`}
        </CustomButton>
      )}
      {!isLoading && status === 200 ? (
        <CustomButton onClick={() => navigate("/login")}>
          LOGIN another account
        </CustomButton>
      ) : (
        <CustomButton onClick={() => navigate("/login")}>LOGIN</CustomButton>
      )}
      <CustomButton onClick={() => navigate("/create-account")}>
        CREATE new account
      </CustomButton>
    </div>
  );
};
