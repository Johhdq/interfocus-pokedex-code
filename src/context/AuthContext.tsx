import { createContext } from "react";

// Vai precisar que se passe os valores para este contexto

interface IAuthContext { 
    usuario: string,
    autenticarComIAS(): void;
    logoff(): void;
}

export const AuthContext = createContext({} as IAuthContext);