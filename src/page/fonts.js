
import { css } from '../build/build-util.js';

export function fontCss() {
    return css`
        @font-face {
            font-family: Roland;
            font-weight: 400;
            src: url("/font/Roland-Regular.woff2") format("woff2"),
                 url("/font/Roland-Regular.ttf") format("truetype");
            font-display: swap;
        }
        @font-face {
            font-family: Roland;
            font-weight: 700;
            src: url("/font/Roland-Bold.woff2") format("woff2"),
                 url("/font/Roland-Bold.ttf") format("truetype");
            font-display: swap;
        }
        @font-face {
            font-family: OpenSans;
            font-weight: 400;
            src: url("/font/OpenSans-Regular.woff2") format("woff2"),
                 url("/font/OpenSans-Regular.ttf") format("truetype");
            font-display: swap;
        }
        @font-face {
            font-family: 'Plex Mono';
            font-weight: 400;
            src: url("/font/IBMPlexMono-Regular.woff2") format("woff2"),
                 url("/font/IBMPlexMono-Regular.ttf") format("truetype");
            font-display: swap;
        }
    `;
}
