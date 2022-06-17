import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useCheckAuth } from "../../api/hooks";
import Loading from "../Loading";
import { TiptapEditor } from "./TiptapEditor";

export const EditorWrapper = () => {
  const { checkAuth, userID, status } = useCheckAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    checkAuth().then(() => setIsLoading(false));
  }, [checkAuth, setIsLoading]);

  if (isLoading) return <Loading />;

  if (status === 200 && userID !== "") return <TiptapEditor userID={userID} />;

  if (userID === "") {
    console.log(`userID === ${userID}`);
  }

  return <Navigate to="/login" replace />;
};
