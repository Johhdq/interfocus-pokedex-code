import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import FavoriteCard from "../../components/FavoriteCard";
import { FavoritoDTO } from "../../dtos/FavoritoDTO";
import { useFavorite } from "../../hooks/useFavorite";

import {
    Container,
    Header,
    Titulo,
} from './styles';

function Favoritos(){
    
    const isFocused = useIsFocused();
    const { removeStorage, favoritos, getFavoritos } = useFavorite();

    // A use effect vai ser executada sempre quando se entra na tela
    useEffect(() => {
        console.log('bateu efeito');
        getFavoritos();
    }, [isFocused]);

    return (
        <Container>
            <Header>
                <Titulo>Favoritos</Titulo>
            </Header>

            <FlatList
                data={favoritos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <FavoriteCard 
                        pokemon={item.pokemon}
                        funcaoRemover={() => removeStorage(item.pokemon.id)}
                    />
                )}
                style={{
                    flex: 1,
                    paddingTop: 33,
                    paddingRight: 0,
                    paddingBottom: 0,
                    paddingLeft: 24
                }}
            />
        </Container>
    )
}

export default Favoritos