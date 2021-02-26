
import { css } from '../build/build-util.js';

export function fontCss() {
    return css`
        @font-face {
            font-family: Roland;
            font-weight: 400;
            src: url("/font/Roland-Regular.woff2") format("woff2"),
                 url("/font/Roland-Regular.ttf") format("truetype");
        }
        @font-face {
            font-family: Roland;
            font-weight: 500;
            src: url("/font/Roland-Medium.woff2") format("woff2"),
                 url("/font/Roland-Medium.ttf") format("truetype");
        }
        @font-face {
            font-family: Roland;
            font-weight: 600;
            src: url("/font/Roland-Semi-Bold.woff2") format("woff2"),
                 url("/font/Roland-Semi-Bold.ttf") format("truetype");
        }
        @font-face {
            font-family: Roland;
            font-weight: 700;
            src: url("/font/Roland-Bold.woff2") format("woff2"),
                 url("/font/Roland-Bold.ttf") format("truetype");
        }
        @font-face {
            font-family: OpenSans;
            font-weight: 400;
            src: url("/font/OpenSans-Regular.woff2") format("woff2"),
                 url("/font/OpenSans-Regular.ttf") format("truetype");
        }
    `;
}
