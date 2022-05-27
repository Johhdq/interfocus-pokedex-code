import { Feather } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useTheme } from "styled-components";
import FavoriteCard from "../../components/FavoriteCard";
import { useFavorite } from "../../hooks/useFavorite";

import {
    BotaoHeader,
    Container,
    Header,
    Titulo,
} from './styles';

function Favoritos(){
    
    const isFocused = useIsFocused();
    const { removeStorage, favoritos, getFavoritos } = useFavorite();
    const tema = useTheme();

    const navigation = useNavigation();

    function voltar() {
        navigation.goBack();
    }

    // A use effect vai ser executada sempre quando se entra na tela
    useEffect(() => {
        console.log('bateu efeito');
        getFavoritos();
    }, [isFocused]);

    return (
        <Container>
            <Header>
                <BotaoHeader
                    onPress={() => voltar()}
                >
                    <Feather 
                        name="arrow-left" 
                        size={18} 
                        color={tema.dark_gray} 
                    /> 
                </BotaoHeader>
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
                    paddingLeft: 20,
                    marginLeft: -5,
                    marginBottom: 5             
                }}
            />
        </Container>
    )
}

export default Favoritos