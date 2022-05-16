import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Detalhes from "../screens/Detalhes";
import { Header } from "react-native/Libraries/NewAppScreen";

const Stack = createNativeStackNavigator();

function AppRoutes() {
    return (
        // Stack.Navigator são todas as telas que podemos acessar na pilha
        // Uma tela em uma aplicação abre uma em cima da outra, há um empilhamento de telas
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Detalhes" component={Detalhes}/>
        </Stack.Navigator>
    );
}
export default AppRoutes;
