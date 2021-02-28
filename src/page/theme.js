
import { css } from '../build/build-util.js';

export function themeCss() {
    return css`
        * {
            --background-dark: #070022;
            --background-darkish: #191330;
            --background-light: #fdfdf6;
            --background-lighter: #FEFEFE;
            --primary: #0021df;
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
        @media (prefers-reduced-motion) {
            * {
                transition: none;
                animation: none;
            }
        }
    `;
}

export const colors = [
    ['#E2C044', 'black'],
    ['#99E1D9', 'black'], 
    ['#EE9480', 'black'],
    ['#A09BE7', 'black'],
];
