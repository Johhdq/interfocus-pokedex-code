import { ReactNode, useContext, useEffect, useState } from "react";
import { FavoritoDTO } from "../dtos/FavoritoDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PokemonDTO } from "../dtos/PokemonDTO";
import { useAuth } from "./auth";
import { useIsFocused } from "@react-navigation/native";
import { FavoriteContext } from "../context/FavoriteContext";

interface FavoriteProviderProps {
    children: ReactNode
}

const FAVORITOS_KEY = '@pokedex:favoritos';

function FavoriteProvider({children}: FavoriteProviderProps) {
    const [favoritos, setFavoritos] = useState<FavoritoDTO[]>([]);
    const {usuario} = useAuth();

    async function getFavoritos() {
        const favoritosStorage = await AsyncStorage.getItem(FAVORITOS_KEY);
        if(favoritosStorage){
            const favoritosParse = JSON.parse(favoritosStorage) as FavoritoDTO[];
            setFavoritos(favoritosParse);
        } 
    }

    async function removeStorage(id: number) {
        const favoritos = await AsyncStorage.getItem(FAVORITOS_KEY);        
        if(favoritos) {
            // Está convertendo a string para um JSON como um array de favoritos (array de JSON de favoritos)
            const favoritosParse = JSON.parse(favoritos) as FavoritoDTO[];
            const filtrados = favoritosParse.filter(f => f.pokemon.id !== id);
            await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(filtrados));
            // Chama o getFavoritos() só para atualizar a flatList de favoritos
            getFavoritos();
        }
    }
    
    async function verificaFavoritado(id:number) {
        const favoritos = await AsyncStorage.getItem(FAVORITOS_KEY);
        const favoritosConvertidos =  favoritos ? JSON.parse(favoritos) as FavoritoDTO[] : [];
        const favorito = favoritosConvertidos.filter(
            p => p.pokemon.id === id);
        if (favorito.length > 0) {
            return false;
        }
        return true;
    }
    
    async function addFavoritos(pokemon: PokemonDTO) {       
        // const pokemonString = JSON.stringify(pokemon);
        const favoritosStorage = await AsyncStorage.getItem(FAVORITOS_KEY);

        const favoritosParse = favoritosStorage ? 
            JSON.parse(favoritosStorage) as FavoritoDTO[] : [];
        
        const favorito = await verificaFavoritado(pokemon.id);
        if (favorito) {
            favoritosParse.push({ 
                id: Math.random(),
                pokemon,
                // Exclamação na frente para falar que vai ter um dado e que não vai ser null
                usuario: usuario!
            });
            await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritosParse));
        } 
    }
    
    return (
        <FavoriteContext.Provider value={{
            favoritos,
            getFavoritos,
            removeStorage,
            addFavoritos,
            verificaFavoritado
        }}>
            {children}
        </FavoriteContext.Provider>
    );
}

function useFavorite() {
    const context = useContext(FavoriteContext);
    return context;
}

export { FavoriteProvider, useFavorite };