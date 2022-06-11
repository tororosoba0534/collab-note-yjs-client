import { createContext, useState } from "react";

type TypePopupContext = {
  isOpenLogout: boolean;
  setIsOpenLogout: React.Dispatch<React.SetStateAction<boolean>>;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const PopupsContext = createContext<TypePopupContext>(null!);

export const PopupsProvider = ({ children }: any) => {
  const [isOpenLogout, setIsOpenLogout] = useState(false);
  return (
    <PopupsContext.Provider value={{ isOpenLogout, setIsOpenLogout }}>
      {children}
    </PopupsContext.Provider>
  );
};
