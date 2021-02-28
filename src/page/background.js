
import { html } from '../build/build-util.js';

import { colors } from './theme.js';

export function background(id, content) {
    return html`
        <div class="background-wrap-${id}">
            <style>
                .background-wrap-${id} {
                    color: ${colors[id % colors.length][1]};
                    position: relative;
                    margin-top: -5rem;
                    padding-top: 10rem;
                    padding-bottom: 10rem;
                }
                .background-${id} {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    background: ${colors[id % colors.length][0]};
                    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 90%);
                }
            </style>
            <div class="background-${id}">
            </div>
            ${content}
        </div>
    `;
}
