import { createContext, useContext } from "react";

const ImageDataContext = createContext(null);

export const ImageDataContextProvider = ImageDataContext.Provider;

export const useImageDataContext = () => {
  const context = useContext(ImageDataContext);
  if (!context) {
    throw new Error(
      "useImageDataContext must be used within a ImageDataProvider"
    );
  }
  return context;
};
