import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center gap-10 text-center">
      <h1>Collab Note YJS</h1>
      <p>enables realtime collaborative notetaking with YJS</p>
      <button
        className="px-4 py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
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
