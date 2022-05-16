import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { PokemonDTO } from "../../dtos/PokemonDTO";
import retornaSvg from "../../utils/retornaSvg";
import { Header, Container, BotaoHeader, Codigo, Conteudo, ConteudoSvg, ConteudoTitulo, Nome } from "./style";

// Interface só para tipar os parâmetros que podem ser mandados nessa rota
interface ParametrosRota {
    pokemon: PokemonDTO;
}

// É o componente
function Detalhes() {

    const [pokemon, setPokemon] = useState<PokemonDTO>();

    const route = useRoute();

    useEffect(() => {
        const parametros = route.params as ParametrosRota;
        console.log(parametros.pokemon);
        setPokemon(parametros.pokemon);
    },[]);

    if (!pokemon) return <View />
    // ? pois pode ser undefined
    return (
        <Container
            type={pokemon.types[0].name}
        >
            <Header>
                <ConteudoTitulo>
                    <Nome>{pokemon?.name}</Nome>
                    <Codigo>{pokemon?.code}</Codigo>
                </ConteudoTitulo>     
                <BotaoHeader />           
            </Header>
            <Conteudo>
                <ConteudoSvg>
                    {retornaSvg(pokemon.name, 200, 200)}
                </ConteudoSvg>
            </Conteudo>
        </Container>
    )
}
export default Detalhes;