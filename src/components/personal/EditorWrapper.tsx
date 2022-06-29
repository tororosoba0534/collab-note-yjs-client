import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useCheckAuth } from "../../api/hooks";
import Loading from "../Loading";
import { TiptapEditor } from "./TiptapEditor";

export const EditorWrapper = () => {
  const { checkAuth, userID, status } = useCheckAuth();
  const [isLoading, setIsLoading] = useState(true);

  console.log("EditorWrapper");

  useEffect(() => {
    if (!isLoading) return;
    console.log("inside useEffect in EditorWrapper");

    checkAuth().then(() => setIsLoading(false));
  }, [checkAuth, isLoading]);

  if (isLoading) return <Loading />;

  if (status === 200 && userID !== "") return <TiptapEditor userID={userID} />;

  if (userID === "") {
    console.log(`userID is empty`);
  }

  return <Navigate to="/login" replace />;
};
