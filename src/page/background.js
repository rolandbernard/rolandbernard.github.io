
import { html, css } from '../build/build-util.js';

import { colors } from './theme.js';

function blendColors(colors, proportion) {
    const ret = [0, 0, 0];
    const sum = proportion.reduce((a, b) => a + b, 0);
    if (sum === 0) {
        return colors[0] || ret;
    } else {
        colors.forEach((col, i) => ret.forEach((_, j) => ret[j] += Math.pow(col[j], 1/3)*proportion[i]));
        return ret.map(el => Math.pow(el / sum, 3));
    }
}

export function specialBackgroundStyles() {
    return css`
       .special-background-wrap {
            margin-top: -2.6rem;
            padding-top: 5rem;
            padding-bottom: 7.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 100%;
            color: ${colors[0][1]};
        }
        .special-background {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            clip-path: polygon(0 0, 100% 2.5rem, 100% 100%, 0 100%);
            z-index: -1;
            background: ${colors[0][0]};
            overflow: hidden;
            contain: strict;
        }
        .special-background svg {
            position: absolute;
            animation-fill-mode: forwards;
            animation-timing-function: ease-out;
            animation-duration: 1s;
            transform-origin: 50% 50%;
            transform: translate(-50%, -50%) scale(0);
            animation-name: spawn-in;
            contain: strict;
        }
        @media (prefers-reduced-motion) {
            .special-background svg {
                transform: translate(-50%, -50%) scale(1);
            }
        }
        .special-background .left svg {
            top: 0;
            left: 0;
        }
        .special-background .right svg {
            top: 10vh;
            left: 95vw;
        }
        .special-background .bottom-left svg {
            top: 105vh;
            left: 0;
        }
        .special-background .bottom-right svg {
            top: 100vh;
            left: 100vw;
        }
        ${[...Array(10)].map((_, i) => css`
            .special-background .left svg:nth-child(${i + 1}) {
                width: ${15 * (i + 1)}vw;
                height: ${15 * (i + 1)}vh;
                animation-delay: ${0.1 * (10 - i)}s;
                z-index: ${10 - i};
                fill: rgb(${blendColors([[0xb5,0x30,0x5c], colors[0][2]], [(10 - i), i]).join(',')});
            }
            .special-background .right svg:nth-child(${i + 1}) {
                width: ${15 * (i + 1)}vw;
                height: ${15 * (i + 1)}vh;
                animation-delay: ${0.1 * (10 - i)}s;
                z-index: ${10 - i};
                fill: rgb(${blendColors([[0x5a,0x2d,0xac], colors[0][2]], [(10 - i), i]).join(',')});
            }
            .special-background .bottom-left svg:nth-child(${i + 1}) {
                width: ${15 * (i + 1)}vw;
                height: ${15 * (i + 1)}vh;
                animation-delay: ${0.1 * (10 - i)}s;
                z-index: ${10 - i};
                fill: rgb(${blendColors([[0x0e,0x88,0xb5], colors[0][2]], [(10 - i), i]).join(',')});
            }
            .special-background .bottom-right svg:nth-child(${i + 1}) {
                width: ${15 * (i + 1)}vw;
                height: ${15 * (i + 1)}vh;
                animation-delay: ${0.1 * (10 - i)}s;
                z-index: ${10 - i};
                fill: rgb(${blendColors([[0x22,0x8B,0x22], colors[0][2]], [(10 - i), i]).join(',')});
            }
        `)}
        @keyframes spawn-in {
            0% {
                transform: translate(-50%, -50%) scale(0);
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
}

export function specialBackground(content) {
    return html`
        <div class="special-background-wrap">
            <div class="special-background">
                <div class="left">
                    ${[...Array(10)].map((_, i) => html`
                        <svg viewBox="0 0 200 200">
                          <path d="M34.9,-51.9C48.6,-52.7,65.1,-49.9,75.1,-40.7C85.1,-31.5,88.4,-15.7,81.6,-4C74.7,7.8,57.5,15.5,48.4,26.2C39.2,36.8,38,50.3,31.3,63.1C24.6,75.8,12.3,87.9,2.2,84C-7.8,80.2,-15.6,60.4,-24.3,48.8C-33,37.1,-42.5,33.6,-51.2,26.8C-59.8,20,-67.7,10,-72.5,-2.8C-77.4,-15.6,-79.3,-31.3,-71.5,-39.5C-63.7,-47.7,-46.1,-48.5,-32.5,-47.9C-19,-47.2,-9.5,-45,0.6,-46C10.7,-47,21.3,-51.2,34.9,-51.9Z" transform="translate(100 100) rotate(${i})" />
                        </svg>
                    `)}
                </div>
                <div class="right">
                    ${[...Array(10)].map((_, i) => html`
                        <svg viewBox="0 0 200 200">
                          <path d="M28.3,-57.7C30.3,-47.9,21.1,-27.4,22,-16C22.8,-4.6,33.7,-2.3,38.8,2.9C43.9,8.2,43.2,16.4,41.7,26.5C40.1,36.7,37.7,48.8,30.6,53.1C23.5,57.4,11.7,53.9,2.9,48.9C-6,43.8,-11.9,37.4,-25.9,37.1C-39.9,36.8,-61.9,42.6,-67.2,37.5C-72.5,32.3,-61.1,16.2,-50,6.4C-39,-3.4,-28.4,-6.8,-25.6,-16.4C-22.8,-25.9,-28,-41.6,-25,-50.9C-22.1,-60.2,-11,-63.1,1.1,-64.9C13.2,-66.7,26.3,-67.5,28.3,-57.7Z" transform="translate(100 100)" />
                        </svg>
                    `)}
                </div>
                <div class="bottom-left">
                    ${[...Array(10)].map((_, i) => html`
                        <svg viewBox="0 0 200 200">
                          <path d="M41.9,-65.2C51.7,-66.9,55.3,-50.4,63.8,-36.5C72.3,-22.6,85.9,-11.3,84.1,-1C82.3,9.3,65.3,18.6,52.3,24.7C39.3,30.8,30.3,33.8,22.2,44.5C14.2,55.2,7.1,73.7,0,73.6C-7,73.6,-14.1,55.1,-17.9,42C-21.8,28.9,-22.5,21.1,-30.1,15C-37.7,8.9,-52.3,4.5,-53.3,-0.5C-54.2,-5.5,-41.5,-11.1,-35.8,-20.5C-30.1,-30,-31.4,-43.4,-26.6,-44.6C-21.8,-45.8,-10.9,-34.9,2.6,-39.3C16,-43.8,32.1,-63.6,41.9,-65.2Z" transform="translate(100 100) rotate(${-i})" />
                        </svg>
                    `)}
                </div>
                <div class="bottom-right">
                    ${[...Array(10)].map((_, i) => html`
                        <svg viewBox="0 0 200 200">
                          <path d="M31.9,-53.7C36.3,-52.7,31.4,-34,27.7,-22.1C24.1,-10.2,21.7,-5.1,28.8,4.1C35.9,13.3,52.4,26.5,55.6,37.6C58.8,48.7,48.6,57.6,37.1,59.9C25.6,62.1,12.8,57.7,2.1,54.1C-8.6,50.4,-17.2,47.5,-28.3,45C-39.3,42.5,-52.9,40.5,-53.9,33C-54.8,25.6,-43,12.8,-43.6,-0.3C-44.2,-13.5,-57.2,-27,-58.9,-39.1C-60.7,-51.2,-51.3,-61.9,-39.6,-58.6C-27.9,-55.4,-14,-38.3,-0.1,-38.1C13.7,-37.9,27.5,-54.7,31.9,-53.7Z" transform="translate(100 100) rotate(${i * 2})" />
                        </svg>
                    `)}
                </div>
            </div>
            ${content}
        </div>
    `;
}

export function backgroundStyles() {
    return css`
       .background-wrap {
            margin-top: -2.6rem;
            padding-top: 5rem;
            padding-bottom: 7.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 100%;
        }
        .background {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            clip-path: polygon(0 0, 100% 2.5rem, 100% 100%, 0 100%);
            z-index: -1;
        }
    `;
}

export function background(id, content) {
    return html`
        <div class="background-wrap" style="color: ${colors[id % colors.length][1]};">
            <div class="background" style="background: ${colors[id % colors.length][0]};">
            </div>
            ${content}
        </div>
    `;
}
