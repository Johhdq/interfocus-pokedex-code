import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { Container } from "./styles";


function SplashScreen() {
    return (
        <Container>
            <LottieView
                style={{width: "30%"}} 
                source={require("../../assets/animations/pokeball-load.json")} 
                autoPlay
                loop
            />
        </Container>
    );
}

export default SplashScreen;