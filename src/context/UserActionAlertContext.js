import { createContext, useContext } from "react";

const context = createContext(null);

export const UserActionAlertContextProvider = context.Provider;

export const useUserActionAlertContext = () => {
  const userAlertContext = useContext(context);

  if (!userAlertContext) {
    throw new Error(
      "useUserActionAlertContext must be used within a UserActionAlertContextProvider"
    );
  }

  return userAlertContext;
};
