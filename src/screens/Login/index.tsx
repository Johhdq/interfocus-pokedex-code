import React from "react";
import PokebolaLogin from "../../assets/PokebolaLogin.svg"
import { useAuth } from "../../hooks/auth";
import { BotaoLogar, Container, Label } from "./styles";


// Colors é um array de cores, são as cores do LinearGradient
function Login() {

    const { autenticarComIAS } = useAuth();

    return (
        <Container 
            colors={["#133ABC", "#5EBCFC" ]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0}}
        >
            <PokebolaLogin />
            <BotaoLogar 
                onPress={autenticarComIAS}
            >
                <Label>Autenticar com o IAS</Label>
            </BotaoLogar>
        </Container>
    )
}

export default Login;