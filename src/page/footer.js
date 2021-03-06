
import { html, css, readFile } from '../build/build-util.js';

export function pageFooterStyles() {
    return css`
        .footer {
            flex: 0 0 auto;
            width: 100%;
            padding-top: 0.75rem;
            padding-bottom: 0.5rem;
            background: var(--background-dark);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            user-select: none;
            box-sizing: border-box;
            color: white;
            font-size: 0.75rem;
            font-weight: 400;
            color: lightgray;
            font-family: 'Open Sans', sans-serif;
            box-shadow: var(--shadow-small);
            white-space: nowrap;
            overflow: hidden;
            contain: content;
        }
        .footer-contacts a {
            padding-left: 0.25rem;
            padding-right: 0.25rem;
            padding-bottom: 0.25rem;
            text-decoration: none;
        }
        .footer-contacts a svg {
            width: 1.25rem;
            height: 1.25rem;
            color: lightgray;
        }
        .footer-contacts a svg, .footer-contacts a span {
            display: inline;
            vertical-align: middle;
            fill: white;
            color: lightgray;
        }
        .footer-copyright {
            padding-top: 0.5rem;
        }
        .link-disabled {
            opacity: 0.5;
        }
    `;
}

export function pageFooter() {
    return html`
        <footer class="footer">
            <span class="footer-contacts">
                <a rel="noreferrer" href="https://github.com/rolandbernard">
                    ${readFile("src/page/icons/github.svg")}
                    <span>GitHub</span>
                </a>
            </span>
            <span class="footer-copyright">© 2020 - ${(new Date()).getFullYear()} Roland Bernard.</span>
        </footer>
    `;
}
