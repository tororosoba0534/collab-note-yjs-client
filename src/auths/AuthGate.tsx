import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useCheckAuth } from "../api/hooks";
import Loading from "../components/Loading";

const AuthGate = ({ children }: { children: JSX.Element }) => {
  console.log("RequireAuth rendered");

  const { checkAuth, status, thrownErr } = useCheckAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    checkAuth().then(() => setIsLoading(false));
  }, [checkAuth, setIsLoading]);

  if (thrownErr !== "") {
    console.error(thrownErr);
  }

  if (isLoading) return <Loading />;

  if (status === 200) return children;

  return <Navigate to="/login" replace />;
};

export default AuthGate;
