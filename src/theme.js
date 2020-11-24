
import { css } from './build-util.js';

export function themeCss() {
    return css`
        * {
            --background-dark: #373f51;
            --background-darkish: #454d61;
            --background-light: #F8F8F8;
            --primary: #008DD5;
            --secondary: #CE8147;
            --accent: #B3001B;
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
