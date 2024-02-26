import React, { createContext, ReactNode, useContext, useState } from "react";

interface AppContextType {
  isLoading: boolean;
  setIsLoading: any;
  showModel: boolean;
  setShowModel: any;
  responseMassage: any;
  setResponseMassage: any;
}

interface IProps {
  message: string;
  statusCode: number;
}

const AppContext = createContext<AppContextType | null>(null);

const LoadingAppAlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [responseMassage, setResponseMassage] = useState<IProps>({
    message: "",
    statusCode: 0,
  });

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        showModel,
        setShowModel,
        responseMassage,
        setResponseMassage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default LoadingAppAlertProvider;

export const useAppAlert = () => {
  const context = useContext(AppContext);
  return {
    isLoading: context?.isLoading,
    setIsLoading: context?.setIsLoading,
    showModel: context?.showModel,
    setShowModel: context?.setShowModel,
    responseMassage: context?.responseMassage,
    setResponseMassage: context?.setResponseMassage,
  };
};
