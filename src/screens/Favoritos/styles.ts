import styled from "styled-components/native";

// export const Container = styled.View`
//     flex: 1;
//     background-color: ${({theme}) => theme.background};
//     padding: 0 16px;
// `;

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.background };
    padding: 0 16px;
`;
export const Header = styled.View`
    flex-direction: row;
    padding: 0px 12px;
    padding-top: 4px;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-top: 44px;
    padding-left: -10px;
`;

export const Titulo = styled.Text`
    font-size: 18px;
    padding-right: 100px;
    font-family: ${({theme}) => theme.fonts.BOLD };
    color: ${({theme}) => theme.primary };
`;

export const BotaoHeader = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    padding-right: -2px;
    margin-top: -4px;
`;
