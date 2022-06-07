import { createContext } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }: any) => {
  return <ErrorContext.Provider value={}>{children}</ErrorContext.Provider>;
};
