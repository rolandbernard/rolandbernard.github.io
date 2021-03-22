
import { html, css, changeUrlLanguage } from '../build/build-util.js';
import { languages } from '../config.js';

export function pageHeaderStyles() {
    return css`
        .header {
            position: fixed;
            top: 0;
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
            contain: layout size;
        }
        .header-placeholder {
            height: 3rem;
            flex: 0 0 auto;
            contain: strict;
        }
        .header .header-spacer {
            flex: 1 1 100%;
        }
        .header .link {
            flex: 0 0 auto;
            width: max-content;
            overflow: hidden;
            padding: 0.5rem;
        }
        .header .link span {
            font-size: 1.2rem;
            font-weight: 400;
            font-family: Roland, OpenSans, Arial, Helvetica, sans-serif;
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
            padding: 0.5rem 1rem;
            font-size: 1.1rem;
            font-weight: 400;
            font-family: Roland, OpenSans, Arial, Helvetica, sans-serif;
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
            outline: none;
        }
        @media (max-width: 350px) {
            .header .lang-select {
                display: none;
            }
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
            box-shadow: var(--shadow-small);
            clip-path: circle(0 at 100% 0);
            transition: clip-path 0.2s ease-in-out;
            background: var(--background-darkish);
        }
        .header .lang-select:focus-within .lang-select-options {
            clip-path: circle(200% at 100% 0);
        }
        .header .lang-select .lang-option {
            display: block;
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
        .header .link span::after,
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
        .header .link:hover span::after,
        .header .lang-select .lang-select-options .lang-option:hover span::after,
        .header .lang-select:hover .lang-select-current::after,
        .header .link:focus-within span::after,
        .header .lang-select .lang-select-options .lang-option:focus-within span::after,
        .header .lang-select:focus-within .lang-select-current::after {
            transform: scaleX(1);
        }
    `;
}

export function pageHeader(lang = 'en', url = '/') {
    return html`
        <div class="header-placeholder"></div>
        <header class="header">
            <nav class="header-nav">
                <a class="link" href="/${lang}"><span>${{
                    'en': 'Home',
                    'de': 'Home',
                    'it': 'Home',
                }[lang]}</span></a>
                <span class="line-seperator"></span>
                <a class="link" href="/${lang}/projects"><span>${{
                    'en': 'Projects',
                    'de': 'Projekte',
                    'it': 'Progetti',
                }[lang]}</span></a>
                <span class="line-seperator"></span>
                <a class="link" href="/${lang}/posts"><span>${{
                    'en': 'Posts',
                    'de': 'Posts',
                    'it': 'Posti',
                }[lang]}</span></a>
                <span class="header-spacer"></span>
                <div class="lang-select" tabindex="-1">
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
    `;
}
