
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
            .header svg {
                flex: 0 0 auto;
                height: 1.5rem;
                width: 4rem;
                filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2));
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
            .header .lang-select {
                padding: 2rem;
                font-size: 1.3rem;
                font-weight: 400;
                font-family: Roland;
                font-style: normal;
                text-decoration: none;
                color: white;
            }
            .header .line-seperator {
                width: 0;
                height: 1.75rem;
                /* border: 1px solid var(--primary); */
                box-sizing: border-box;
            }
            .header-logo {
                fill: white;
            }
            .header-nav {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        </style>
        <header class="header">
            <span class="header-logo">
                ${readFile("src/page/icons/logo.svg")}
            </span>
            <span class="header-spacer"></span>
            <nav class="header-nav">
                <span class="lang-select">${lang.toUpperCase()}</span>
                <span class="link"><a href="/${lang}/index.html">Home</a></span>
                <span class="line-seperator"></span>
                <span class="link"><a href="/${lang}/projects.html">Projects</a></span>
                <span class="line-seperator"></span>
                <span class="link"><a href="/${lang}/blog.html">Posts</a></span>
            </nav>
        </header>
        <div class="header-placeholder"></div>
    `;
}
