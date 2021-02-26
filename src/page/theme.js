
import { css } from '../build/build-util.js';

export function themeCss() {
    return css`
        * {
            --background-dark: #070022;
            --background-darkish: #303030;
            --background-light: #fafaf2;
            --background-lighter: #FEFEFE;
            --primary: #0026ff;
            --secondary: #e96e10;
            --accent: #c90522;
            --shadow-large: 0px 2px 4px -1px rgba(0,0,0,0.2),
                0px 4px 5px 0px rgba(0,0,0,0.14),
                0px 1px 10px 0px rgba(0,0,0,0.12);
            --shadow-small: 0px 2px 4px -2px rgba(0,0,0,0.2),
                0px 4px 5px -2px rgba(0,0,0,0.14),
                0px 1px 10px -2px rgba(0,0,0,0.12);
        }
        html {
            background: var(--background-light);
        }
    `;
}
