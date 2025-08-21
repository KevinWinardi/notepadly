import { createContext } from "react";

type LoadingContextType = {
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

export const LoadingContext = createContext<LoadingContextType>({
    isLoading: false,
    setIsLoading: () => { },
});
