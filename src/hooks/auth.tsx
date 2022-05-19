import { ReactNode, useContext, useEffect, useState } from "react";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { UsuarioDTO } from "../dtos/UsuarioDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProviderProps {
    // Vai ser todos os componentes que vão estar entre o meu provider
    children: ReactNode;
}

const URL_ACESSO_IAS = 'http://192.168.10.40:91';
// AppToken que vai tentar autenticar no IAS
const CLIENT_ID = '3f3f15d0-7231-4407-ac94-391e7fa33b2b';
// Para retornar um code para a gente
const RESPONSE_TYPE = 'code';
// Para qual aplicação vai redirecionar após fazer o login
const REDIRECT_URI = 'exp://192.168.11.3:19000';
// Para setar dados no async storage vai precisar de uma key
// Não tem um nome específico para dar para a chave mas no caso foi dado este nome '@pokedex:usuario'
const USUARIO_KEY_STORAGE = '@pokedex:usuario';

function AuthProvider({children}: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioDTO | null>(null);

    async function getDadosCode(code: string) {
        try {
            const response = await api.post<UsuarioDTO>("api/token", {
                code,
                grant_type: "authorization_code"
            }, 
            {
                baseURL: "http://192.168.10.40:92"
            });
            console.log(response.data);
            return response.data && response.data.usuarioId != 0 ? response.data : null
        } catch (error) {
            console.log(error);
            return null;
        }
        
    }

    // async pois ela não vai dar o retorno imediatamente, é necessário esperar algo
    async function autenticarComIAS() {
        try {
            let result = await WebBrowser.openAuthSessionAsync(
                `${URL_ACESSO_IAS}/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`, REDIRECT_URI            
            );
            console.log("Resultado Auth", result);

            let redirectData;

            if (result.type == "success") {
                // Linking para ajustar a url que retornar
                redirectData = Linking.parse(result.url);
                
                console.log(redirectData);
                const codePostAuth = redirectData.queryParams["code"];
                const usuarioIas = await getDadosCode(codePostAuth);
                setUsuario(usuarioIas);

                // Precisa salvar como string no async storage
                await AsyncStorage.setItem(USUARIO_KEY_STORAGE, JSON.stringify(usuarioIas));
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function logoff() {
        setUsuario(null);
        await AsyncStorage.removeItem(USUARIO_KEY_STORAGE);
    }


    // Use effect é o ciclo de vida, é o que sempre vai ser executado ao entrar na aplicação
    useEffect(() => {
        async function consultaUsuarioStorage() {
            const usuarioStorage = await AsyncStorage.getItem(USUARIO_KEY_STORAGE);
            console.log("UsuarioStorage: ", usuarioStorage);

            if (usuarioStorage) {
                // Convertendo de volta os dados em string/JSON em objeto
                const usuarioParse = JSON.parse(usuarioStorage) as UsuarioDTO;
                setUsuario(usuarioParse);
            }
        }
        consultaUsuarioStorage();
    }, []) 

    // É dentro do provider que vai falar quais são os dados por parâmetro que o provider vai ser recebido
    // O value é exatamente a função que foi criado com o usuário e as funções
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