import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { PokemonDTO } from "../../dtos/PokemonDTO";
import retornaSvg from "../../utils/retornaSvg";
import { Header, Container, BotaoHeader, Codigo, Conteudo, ConteudoSvg, ConteudoTitulo, Nome, Tipos, LabelDestaque, Sobre } from "./style";
import {Feather, MaterialCommunityIcons} from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import TypeCard from "../../components/TypeCard";
import AboutData from "../../components/AboutData";
import BaseStats from "../../components/BaseStats";
import { useFavorite } from "../../hooks/useFavorite";

// Interface só para tipar os parâmetros que podem ser mandados nessa rota
interface ParametrosRota {
    pokemon: PokemonDTO;
}

// É o componente
function Detalhes() {

    const isFocused = useIsFocused();

    const [estado, setNomeDoEstado] = useState<boolean>();
    const [pokemon, setPokemon] = useState<PokemonDTO>();
    const tema = useTheme();
    const route = useRoute();
    const { addFavoritos, verificaFavoritado, removeStorage } = useFavorite();

    async function verificaFavorito(id:number) {
        const resultado = await verificaFavoritado(id);
        setNomeDoEstado(resultado);
    }

    async function addOrRemovePokemonFav(pokemon: PokemonDTO) {
       estado ? addFavoritos(pokemon) : removeStorage(pokemon.id);
       setNomeDoEstado(estado => !estado);
    }

    useEffect(() => {
        const parametros = route.params as ParametrosRota;
        console.log(parametros.pokemon);
        setPokemon(parametros.pokemon);
        verificaFavorito(parametros.pokemon.id);
    },[isFocused]);

    const navigation = useNavigation();

    function voltar() {
        navigation.goBack();
    }
    
    if (!pokemon) return <View />
    // ? pois pode ser undefined
    return (
        <Container
            type={pokemon.types[0].name}
        >
            <Header>
                <ConteudoTitulo>
                    <BotaoHeader
                        onPress={() => voltar()}
                    >
                        <Feather 
                            name="arrow-left" 
                            size={18} 
                            color={tema.white} 
                        /> 
                    </BotaoHeader>
                    <Nome>{pokemon?.name}</Nome>
                    <Codigo>{pokemon?.code}</Codigo>
                </ConteudoTitulo>     
                <BotaoHeader
                    onPress={() => addOrRemovePokemonFav(pokemon)}
                >
                    {
                        !estado ? <MaterialCommunityIcons name="heart" size={22} color={tema.white} />
                            : <Feather name="heart" size={22} color={tema.background}  />
                    }
                </BotaoHeader>       
            </Header>
            <Conteudo>
                <ConteudoSvg>
                    {retornaSvg(pokemon.name, 200, 200)}
                </ConteudoSvg>
                <Tipos>
                    {
                        pokemon.types.map(p => (
                            <TypeCard tipoPokemon={p} key={p.id} />
                        ))
                    }
                </Tipos>
                <LabelDestaque
                    type={pokemon.types[0].name}
                >
                    About
                </LabelDestaque>
                <AboutData 
                    weight={pokemon.about.weight} 
                    height={pokemon.about.height} 
                    moves={pokemon.moves}                
                />
                <Sobre>{pokemon.about.description}</Sobre>

                <LabelDestaque
                    type={pokemon.types[0].name}
                >
                    Base Stats
                </LabelDestaque>
                <BaseStats 
                    pokemonType={pokemon.types[0].name}
                    stats={pokemon.base_stats}
                />
            </Conteudo>
        </Container>
    )
}
export default Detalhes;