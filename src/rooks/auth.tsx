import { ReactNode, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

interface AuthProviderProps {
    children: ReactNode;
}


function AuthProvider({children}: AuthProviderProps) {

    const [usuario, setUsuario] = useState("João");

    function autenticarComIAS() {
        console.log("IAS");
    }

    function logoff() {
        console.log("Saiu");
    }

    return (
        <AuthContext.Provider value={{
            usuario,
            autenticarComIAS,
            logoff
        }}>
            {children}
        </AuthContext.Provider>
    ) 
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };