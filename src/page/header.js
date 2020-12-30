
import { html, readFile } from './build-util.js';

export function pageHeader(lang = 'en') {
    return html`
        <style>
            .header {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3.5rem;
                padding: 0.5rem;
                background: var(--background-dark);
                display: flex;
                align-items: center;
                justify-content: center;
                user-select: none;
                box-shadow: var(--shadow-large);
                box-sizing: border-box;
                border-bottom: 2px solid var(--primary);
            }
            .header .header-spacer {
                flex: 1 1 100%;
            }
            .header-placeholder {
                width: 100%;
                height: 2.75rem;
            }
            .header .link {
                flex: 0 0 auto;
                width: max-content;
                overflow: hidden;
                padding: 0.5rem;
            }
            .header .link a {
                font-size: 1.3rem;
                font-weight: 400;
                font-family: Roland;
                font-style: normal;
                text-decoration: none;
                color: white;
            }
            .header .link a:hover {
                text-decoration: underline;
            }
            .header .lang-select select {
                padding: 0.25rem 1rem;
                font-size: 1.2rem;
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
            }
            .header .lang-select select:hover {
                cursor: pointer;
                text-decoration: underline;
            }
            .header .lang-select {
                position: relative;
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
            .header .lang-select option {
                background: var(--background-darkish);
                border: none;
            }
            .header .line-seperator {
                width: 0;
                height: 1.75rem;
                /* border: 1px solid var(--primary); */
                box-sizing: border-box;
            }
            .header .header-logo {
                flex: 0 0 auto;
                padding-right: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .header .header-logo svg {
                fill: white;
                height: 1.5rem;
                width: 2.5rem;
                filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2));
            }
            .header .header-nav {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
            }
        </style>
        <header class="header">
            <span class="header-logo">
                ${readFile("src/page/icons/logo.svg")}
            </span>
            <nav class="header-nav">
                <span class="link"><a href="/${lang}/index.html">Home</a></span>
                <span class="line-seperator"></span>
                <span class="link"><a href="/${lang}/projects.html">Projects</a></span>
                <span class="line-seperator"></span>
                <span class="link"><a href="/${lang}/blog.html">Posts</a></span>
                <span class="header-spacer"></span>
                <div class="lang-select">
                    <select>
                        <option>${lang.toUpperCase()}</option>
                    </select>
                </div>
            </nav>
        </header>
        <div class="header-placeholder"></div>
        <script>
            function changeLanguage(lang) {
                
            }
            const select = document.querySelector('.header .lang-select');
            const select_wrap = document.querySelector('.header .lang-select select');
            function languageSelectClose(event) {
                select_wrap.classList.remove('open');
                console.log('close');
                window.removeEventListener('mousedown', languageSelectClose);
                select.addEventListener('mousedown', languageSelectOpen);
            }
            function languageSelectOpen(event) {
                select_wrap.classList.add('open');
                console.log('open');
                select.removeEventListener('mousedown', languageSelectOpen);
                window.addEventListener('mousedown', languageSelectClose);
            }
            select.addEventListener('mousedown', languageSelectOpen);
        </script>
    `;
}
