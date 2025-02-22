import { createContext } from "react";
import { useState } from "react";

export const UserIDContext = createContext();

const UserIDContextProvider = ({ children }) => {

    const [UserID, setUserID] = useState(null);

    return (
        <UserIDContext.Provider value={{ UserID,setUserID }}>
            {children}
        </UserIDContext.Provider>
    );

}

export { UserIDContextProvider };