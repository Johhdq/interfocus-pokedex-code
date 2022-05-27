import styled from "styled-components/native";
import { PokemonName } from "../../dtos/PokemonDTO";

interface Props {
    type: PokemonName
}

export const Container = styled.View`
    width: 92%;
    flex-direction: row;
    background-color: ${({theme}) => theme.white };
    border-radius: 8px;
    padding-top: 5px;
    align-items: center;
    margin-bottom: 37px;
    justify-content: space-between;
    elevation: 8;
    /* shadow-color: ${({theme}) => theme.dark_gray };
    shadow-offset: 8px 4px;
    shadow-opacity: 0.25;
    shadow-radius: 4px; */
    margin-left: 23px;    
`;

export const ConteudoSvg = styled.View`
    margin-left: -36px;
    justify-content: flex-start;
    align-items: flex-start;
    position: absolute;  
`;

export const ConteudoTexto = styled.View`
    align-items: flex-start;
    justify-content: center;
    margin-left: 87px;
    padding-top: 8px;
    padding-bottom: 8px;
`;

export const Descricao = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const LabelBold = styled.Text<Props>`
    font-size: 16px;
    font-family: ${({theme}) => theme.fonts.BOLD };
    color: ${({theme, type}) => theme[type] };
`;

export const Tipos = styled.View`
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 8px;
`;

export const Opcao = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: -22px;
`;

export const Botao = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    align-items: flex-start;
    justify-content: flex-start;
    
`;