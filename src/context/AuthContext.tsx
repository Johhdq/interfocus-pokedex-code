import { createContext } from "react";
import { UsuarioDTO } from "../dtos/UsuarioDTO";

// Vai precisar que se passe os valores para este contexto

// O contexto vai ter um usuário e duas funções, mas não está falando quais vão ser elas
interface IAuthContext { 
    usuario: UsuarioDTO | null,
    // Promise pois agora a função criada vai executar uma promise, então tem que esperar acontecer alguma coisa
    autenticarComIAS(): Promise<void>;
    logoff(): Promise<void>;
}

// Criou um contexto vazio, mas é um contexto
export const AuthContext = createContext({} as IAuthContext);