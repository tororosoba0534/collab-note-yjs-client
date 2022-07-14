import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckAuth } from "../api/hooks/useCheckAuth";
import Loading from "./Loading";

const HomePage = () => {
  const navigate = useNavigate();
  const { checkAuth, userID, status } = useCheckAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) return;
    checkAuth().then(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col justify-center gap-10 text-center">
      <h1>Collab Note YJS</h1>
      <p>enables realtime collaborative notetaking with YJS</p>
      {status === 401 ? (
        <button
          className="px-4 py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      ) : status === 200 ? (
        <div>
          <button
            className="px-4 py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
            onClick={() => navigate("/personal")}
          >
            collab as {userID}
          </button>
          <button
            className="px-4 py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login other account
          </button>{" "}
        </div>
      ) : (
        <div>Something going wrong</div>
      )}
      <button
        className="px-4 py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
        onClick={() => navigate("/create-account")}
      >
        Create new account
      </button>
    </div>
  );
};

export default HomePage;
