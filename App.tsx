import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Container, Texto } from './styles'; 
import theme from './src/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Texto style= {{color: "black"}}>Olá João</Texto>
      </Container>
    </ThemeProvider>
  );
}