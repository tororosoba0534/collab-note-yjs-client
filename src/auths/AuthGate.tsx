import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isThrownErr } from "../api/base";
import { useCheckAuth } from "../api/hooks";
import ErrorPage from "../components/errorPages/ErrorPage";
import Loading from "../components/Loading";

const AuthGate = ({ children }: { children: JSX.Element }) => {
  console.log("RequireAuth rendered");

  const { checkAuth, status } = useCheckAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    checkAuth().then(() => setIsLoading(false));
  }, [checkAuth, setIsLoading]);

  if (isThrownErr(status)) {
    console.error(status);
  }

  if (isLoading) return <Loading />;

  if (status === 200) return children;

  if (status === 401) return <Navigate to="/login" replace />;

  return <ErrorPage status={status} />;
};

export default AuthGate;
