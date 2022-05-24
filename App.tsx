import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/theme';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Routes from './src/routes';
import { AuthProvider } from './src/hooks/auth';
import SplashScreen from './src/screens/SplashScreen';
import { FavoriteProvider } from './src/hooks/useFavorite';

export default function App() {

  // São todas as fontes que vamos utilizar
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular
  });

  const [teste, setTeste] = useState(false);
    function alteraState() {
        setTimeout(() => {
            setTeste(true);
        }, 7000);
    }

    useEffect(() => {
        alteraState();
    }, []);

  // Verificar se ele ainda não carregou, se não carregar vai retornar uma "View"
  if (!fontsLoaded || !teste) {
    return (
      // Não precisa abrir e fechar ela no caso
      // <View/>
      <SplashScreen />
    )
  }  

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <FavoriteProvider>
            <Routes />
        </FavoriteProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}