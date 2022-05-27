import React from "react";
import { Image } from "react-native";
import { useAuth } from "../../hooks/auth";
import { BackgroundImage, BotaoSair, Container, Conteudo, Header, Sair, Titulo } from "./styles";

function Perfil() {
    
    const {usuario, logoff} = useAuth();

    return (
        <Container>
            <Header>
                <Titulo style={{
                    padding: 10,
                    paddingLeft: 5
                }}
                    
                >
                    Perfil
                </Titulo>
            </Header>
            <Conteudo>
                <BackgroundImage>
                    <Image 
                        source={{
                            uri: 'https://avatars.githubusercontent.com/u/91682867?v=4'
                        }}
                        style={{
                            width: 130,
                            height: 130,
                            borderRadius: 65
                        }} 
                    />
                </BackgroundImage>
                <Titulo style = {{
                    paddingLeft: 105 
                }}
                >
                    {usuario?.usuarioNome}
                </Titulo>
                <BotaoSair
                    onPress={logoff}
                >
                    <Sair>Sair</Sair>
                </BotaoSair> 
            </Conteudo>
        </Container>
    )
}

export default Perfil;