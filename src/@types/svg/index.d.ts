// Arquivo de tipagem
// Vai falar que todos os arquivos que tiverem a tipagem svg, vai criar um tipo 'const content: React.FC<SvgProps>;'

declare module '*.svg' {
    import React from "react";
    import { SvgProps } from "react-native-svg"

    const content: React.FC<SvgProps>;
    export default content;
}