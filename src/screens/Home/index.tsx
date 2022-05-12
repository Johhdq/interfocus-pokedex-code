import React, { useState } from "react";

// Cria o tipo React.FC<SvgProps> que foi criado no index.d.ts
import Pokebola from "../../assets/icons/pokeball.svg";
import SortAsc from "../../assets/icons/sortasc.svg";
import SortDesc from "../../assets/icons/sortdesc.svg";
import SmallCard from "../../components/SmallCard";

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

    function alteraTipoFiltro() {
        setDecrescente(estadoAnterior => !estadoAnterior);
    }
    
    return (
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

            />
            <SmallCard />
        </Container>
    );
}