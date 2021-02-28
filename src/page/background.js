
import { html, css } from '../build/build-util.js';

import { colors } from './theme.js';

export function background(id, content) {
    return html`
        <div class="background-wrap-${id}">
            <style>
                .background-wrap-${id} {
                    color: ${colors[id % colors.length][1]};
                    margin-top: -2.6rem;
                    padding-top: 7.5rem;
                    padding-bottom: 10rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    width: 100%;
                }
                .background-${id} {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    background: ${colors[id % colors.length][0]};
                    clip-path: polygon(0 0, 100% 2.5rem, 100% 100%, 0 100%);
                    z-index: -1;
                }
            </style>
            <div class="background-${id}">
            </div>
            ${content}
        </div>
    `;
}
