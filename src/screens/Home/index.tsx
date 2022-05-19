import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Keyboard, Touchable, TouchableWithoutFeedback } from "react-native";

// Cria o tipo React.FC<SvgProps> que foi criado no index.d.ts
import Pokebola from "../../assets/icons/pokeball.svg";
import SortAsc from "../../assets/icons/sortasc.svg";
import SortDesc from "../../assets/icons/sortdesc.svg";
import SmallCard from "../../components/SmallCard";
import { PokemonDTO } from "../../dtos/PokemonDTO";
import api from "../../services/api";

import {
    Container,
    Header,
    Titulo,
    ConteudoTitulo,
    BotaoOrdenacao,
    InputTexto    
} from "./styles"

// Vai ser o nome da tela "Home" no caso
export default function Home() {
    // O Container vai ser toda a tela!
    // Vai retornar mais de uma linha por isso is "()"
    
    // onPress é uma função que recebe outra função que retorna void (nada)
    // Criando um estado para filtro
    // O use state vai indicar que é um estado em si
    // O primeiro elemento do array é a variavel e o segundo é a função que vai tratar
    // Passa o tipo nos <>, como useState<boolean>, mas não precisa nesse caso pois ele vai usar inferência de tipo
    const [decrescente, setDecrescente] = useState(false);
    const [nomeFiltro, setNomeFiltro] = useState('');
    const [pokemons, setPokemons] = useState<PokemonDTO[]>([]);
    const [pokemonsFiltro, setPokemonsFiltro] = useState<PokemonDTO[]>([]);

    const navigation = useNavigation();

    function navegarParaDetalhes(pokemon: PokemonDTO) {
        
        console.log("---------", pokemon);
        navigation.navigate("Detalhes" as never, {
            pokemon
        } as never);
    }

    function alteraTipoFiltro() {
        setDecrescente(estadoAnterior => !estadoAnterior);
    }

    function alteraNomeFiltro(nome: string) {
        console.log(nome);
        setNomeFiltro(nome);
        const filtrados = pokemons.filter(p => p.name.toLowerCase().includes(nome.toLowerCase()));
        setPokemonsFiltro(filtrados);
    }

    // Essa função sempre vai ser executada quando entrar na tela de home
    async function getPokemons() {
        try {
            const filtro = decrescente ? '?_sort=name&_order=desc' : '?_sort=name&_order=asc';
            const resposta = await api.get<PokemonDTO[]>(`/pokemons${filtro}`);
            console.log("------------------------------------------------------------------");
            console.log(resposta.data);
            if (resposta.data && resposta.data.length > 0) {
                setPokemons(resposta.data);
                setPokemonsFiltro(resposta.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Vai ter dois parâmetros, vai ter primeiro uma função e em segundo um array de dependências
    useEffect(() => {
        // Sempre vai querer trazer os pokemons quando for renderizar essa tela de home
        // Pode colocar outras coisas dentro do UseEffect, outras funcionalidades
        // Pode ser montado mais de um UseEffect, caso um não afete o outro 
        console.log("Home");
        getPokemons();
    }, [decrescente]); 
    
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
            <Container>
            <Header>
                <ConteudoTitulo>
                    <Pokebola width={20} height={20}/>
                    <Titulo>Pokemon</Titulo>
                </ConteudoTitulo>

                <BotaoOrdenacao
                    onPress={() => alteraTipoFiltro()}
                >
                    {
                        decrescente ? <SortAsc /> : <SortDesc />
                    }
                </BotaoOrdenacao>
            </Header>
            <InputTexto
                placeholder="Procurar"
                onChangeText={(texto) => alteraNomeFiltro(texto)}
            />
            <FlatList
                data={pokemonsFiltro}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                contentContainerStyle={{
                    alignContent: "center",
                    justifyContent: "center"
                }}
                style={{
                    width: "100%"
                }}
                renderItem={({item})=> (
                    <SmallCard
                        pokemon={item}
                        onPress= {() => navegarParaDetalhes(item)}    
                    />
                )}
            />
            
            </Container>
        </TouchableWithoutFeedback>
        
    );
}