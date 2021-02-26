
import { html, readFile, changeUrlLanguage } from '../build/build-util.js';
import { languages } from '../config.js';

export function pageHeader(lang = 'en', url = '/') {
    return html`
        <style>
            .header {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3rem;
                padding: 0.5rem;
                background: var(--background-dark);
                display: flex;
                align-items: center;
                justify-content: center;
                user-select: none;
                box-shadow: var(--shadow-large);
                box-sizing: border-box;
                border-bottom: 2px solid var(--primary);
                z-index: 10;
            }
            .header .header-spacer {
                flex: 1 1 100%;
            }
            .header-placeholder {
                width: 100%;
                height: 3rem;
                flex: 0 0 auto;
            }
            .header .link {
                flex: 0 0 auto;
                width: max-content;
                overflow: hidden;
                padding: 0.5rem;
            }
            .header .link a {
                font-size: 1.2rem;
                font-weight: 400;
                font-family: Roland;
                font-style: normal;
                text-decoration: none;
                color: white;
                position: relative;
            }
            .header .lang-select .lang-select-current {
                position: relative;
                width: 1.5rem;
            }
            .header .lang-select {
                padding: 0.25rem 1rem;
                font-size: 1.1rem;
                font-weight: 400;
                font-family: Roland;
                font-style: normal;
                text-decoration: none;
                color: white;
                appearance: none;
                background: none;
                border-radius: 0px;
                border-style: dashed;
                border: none;
                text-align: center;
                cursor: pointer;
                position: relative;
            }
            @media (max-width: 350px) {
                .header .lang-select {
                    display: none;
                }
            }
            .header .lang-select input {
                appearance: none;
                background: none;
                border: none;
                outline: none;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                margin: 0;
                z-index: 10;
                cursor: pointer;
            }
            .header .lang-select input:checked {
                position: fixed;
                cursor: auto;
            }
            .header .lang-select:after {
                position: absolute;
                content: "";
                top: calc(50% - 2px);
                right: 0;
                width: 0;
                height: 0;
                border: 6px solid transparent;
                border-color: #fff transparent transparent transparent;
                transform-origin: 50% 25%;
                transition: transform 0.1s;
                pointer-events: none;
            }
            .header .lang-select.open:after {
                transform: rotate(180deg);
            }
            .header .lang-select .lang-select-options {
                display: block;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 100;
                border-radius: 4px;
                overflow: hidden;
                box-shadow: var(--shadow-small);
                clip-path: circle(0 at 100% 0);
                transition: clip-path 0.2s ease-in-out;
            }
            .header .lang-select input:checked ~ .lang-select-options {
                clip-path: circle(200% at 100% 0);
            }
            @media (prefers-reduced-motion) {
                .header .lang-select .lang-select-options {
                    transition: none;
                }
            }
            .header .lang-select .lang-option {
                display: block;
                background: var(--background-darkish);
                border: none;
                padding: 1rem;
            }
            .header .lang-select .lang-option span {
                color: white;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 1.5rem;
            }
            .header .line-seperator {
                width: 0;
                height: 1.75rem;
                /* border: 1px solid var(--primary); */
                box-sizing: border-box;
            }
            .header .header-nav {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
            }
            .header .link a::after,
            .header .lang-select .lang-select-options .lang-option span::after,
            .header .lang-select .lang-select-current::after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 0;
                width: 100%;
                height: 1px;
                background: currentColor;
                transform: scaleX(0);
                transform-origin: 0% 50%;
                transition: transform 0.2s ease-in-out;
                z-index: 1;
            }
            @media (prefers-reduced-motion) {
                .header .link a::after,
                .header .lang-select .lang-select-options .lang-option span::after,
                .header .lang-select .lang-select-current::after {
                    transition: none;
                }
            }
            .header .link:hover a::after,
            .header .lang-select .lang-select-options .lang-option:hover span::after,
            .header .lang-select:hover .lang-select-current::after {
                transform: scaleX(1);
            }
        </style>
        <header class="header">
            <nav class="header-nav">
                <span class="link"><a href="/${lang}">${{
                    'en': 'Home',
                    'de': 'Home',
                    'it': 'Home',
                }[lang]}</a></span>
                <span class="line-seperator"></span>
                <span class="link"><a href="/${lang}/projects">${{
                    'en': 'Projects',
                    'de': 'Projekte',
                    'it': 'Progetti',
                }[lang]}</a></span>
                <span class="line-seperator"></span>
                <span class="link"><a href="/${lang}/blog">${{
                    'en': 'Posts',
                    'de': 'Posts',
                    'it': 'Posti',
                }[lang]}</a></span>
                <span class="header-spacer"></span>
                <div class="lang-select">
                    <input type="checkbox" />
                    <div class="lang-select-current">${lang.toUpperCase()}</div>
                    <div class="lang-select-options">
                        ${languages.map(language => html`
                            <a class="lang-option" href="${changeUrlLanguage(url, language)}">
                                <span>${language.toUpperCase()}</span>
                            </a>
                        `)}
                    </div>
                </div>
            </nav>
        </header>
        <div class="header-placeholder"></div>
    `;
}
