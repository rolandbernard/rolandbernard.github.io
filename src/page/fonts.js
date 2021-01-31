
import { css } from '../build/build-util.js';

export function fontCss() {
    return css`
        @font-face {
            font-family: Roland;
            font-weight: 400;
            src: url("/fonts/Roland-Regular.woff2") format("woff2"),
                 url("/fonts/Roland-Regular.ttf") format("truetype");
        }
        @font-face {
            font-family: Roland;
            font-weight: 500;
            src: url("/fonts/Roland-Medium.woff2") format("woff2"),
                 url("/fonts/Roland-Medium.ttf") format("truetype");
        }
        @font-face {
            font-family: Roland;
            font-weight: 600;
            src: url("/fonts/Roland-Semi-Bold.woff2") format("woff2"),
                 url("/fonts/Roland-Semi-Bold.ttf") format("truetype");
        }
        @font-face {
            font-family: Roland;
            font-weight: 700;
            src: url("/fonts/Roland-Bold.woff2") format("woff2"),
                 url("/fonts/Roland-Bold.ttf") format("truetype");
        }
        @font-face {
            font-family: OpenSans;
            font-weight: 400;
            src: url("/fonts/OpenSans-Regular.woff2") format("woff2"),
                 url("/fonts/OpenSans-Regular.ttf") format("truetype");
        }
    `;
}
