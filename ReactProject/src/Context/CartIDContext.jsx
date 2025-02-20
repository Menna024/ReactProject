import { createContext } from "react";
import { useState } from "react";

export const CartIDContext = createContext();

const CartIDContextProvider = ({ children }) => {

    const [CartID, setCartID] = useState(null);

    return (
        <CartIDContext.Provider value={{ CartID, setCartID }}>
            {children}
        </CartIDContext.Provider>
    );

}

export { CartIDContextProvider };