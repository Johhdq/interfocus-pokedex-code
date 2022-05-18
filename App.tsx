import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/theme';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { View } from 'react-native';
import Home from './src/screens/Home';
import Detalhes from './src/screens/Detalhes';
import Routes from './src/routes';
import { AuthProvider } from './src/rooks/auth';

export default function App() {

  // São todas as fontes que vamos utilizar
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular
  });
  
  // Verificar se ele ainda não carregou, se não carregar vai retornar uma "View"
  if (!fontsLoaded) {
    return (
      // Não precisa abrir e fechar ela no caso
      <View/>
    )
  }  

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
          <Routes />
      </AuthProvider>
      
    </ThemeProvider>
  );
}