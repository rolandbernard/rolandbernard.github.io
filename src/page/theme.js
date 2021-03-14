
import { css } from '../build/build-util.js';

export const colors = [
    ['#E2C044', 'black'],
    ['#E5E6E4', 'black'],
    ['#EE9480', 'black'],
    ['#A09BE7', 'black'],
    ['#99E1D9', 'black'], 
];

export function themeStyles() {
    return css`
        * {
            --background-dark: #220022;
            --background-darkish: #2a1330;
            --background-light: #fdfdf6;
            --background-lighter: #FEFEFE;
            --primary: #001ec5;
            --primary-light: #344fe6;
            --shadow-large: 0px 2px 4px -1px rgba(0,0,0,0.2),
                0px 4px 5px 0px rgba(0,0,0,0.14),
                0px 1px 10px 0px rgba(0,0,0,0.12);
            --shadow-small: 0px 2px 4px -2px rgba(0,0,0,0.2),
                0px 4px 5px -2px rgba(0,0,0,0.14),
                0px 1px 10px -2px rgba(0,0,0,0.12);
        }
        html {
            background: ${colors[1][0]};
        }
        @media (prefers-reduced-motion) {
            *, *::after, *::before {
                transition: none !important;
                animation: none !important;
            }
        }
    `;
}
