import styled from "styled-components/native";
import { PokemonName } from "../../dtos/PokemonDTO";

interface Props {
    type: PokemonName
}

export const Container = styled.View<Props>`
    padding: 4px 8px;
    align-items: center;
    border-radius: 20px;
    margin-right: 12px;
    justify-content: center;
    background-color: ${({theme, type}) => theme[type]};
`;


export const Tipo = styled.Text`
    font-family: ${({theme}) => theme.fonts.BOLD};
    color: ${({theme}) => theme.white};
    font-size: 10px;

`;