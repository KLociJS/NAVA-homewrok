import { createContext, useContext } from "react";

const context = createContext(null);

export const PublicImageDataContextProvider = context.Provider;

export const usePublicImageDataContext = () => {
  const publicImageDataContext = useContext(context);
  if (!publicImageDataContext) {
    throw new Error(
      "usePublicImageDataContext must be used within a PublicImageDataContextProvider"
    );
  }
  return publicImageDataContext;
};
