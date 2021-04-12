import { useContext, createContext } from "react";

export const AppContext = createContext(null);
export const AddressViewContext = createContext(null);

export function useAppContext(){
    return useContext(AppContext);
}

export function useAddressViewContext(){
    return useContext(AddressViewContext);
}