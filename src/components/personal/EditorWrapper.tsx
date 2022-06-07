import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCheckAuth } from "../../api/hooks";
import Loading from "../Loading";
import { TiptapEditor } from "./TiptapEditor";

export const EditorWrapper = () => {
  const { checkAuth, isLoading, thrownErr, username, status } = useCheckAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) return <Loading />;

  if (status === 200) return <TiptapEditor username={username} />;

  return <Navigate to="/login" replace />;
};
