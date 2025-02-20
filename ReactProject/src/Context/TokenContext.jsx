import { createContext } from "react";
import { useState } from "react";

export const TokenContext = createContext();

const TokenContextProvider = ({ children }) => {

    const [Token, setToken] = useState(null);

    return (
        <TokenContext.Provider value={{ Token,setToken }}>
            {children}
        </TokenContext.Provider>
    );

}

export { TokenContextProvider };