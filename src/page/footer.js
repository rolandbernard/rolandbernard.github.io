
import { html, readFile } from './build-util.js';

export function pageFooter(lang = 'en') {
    return html`
        <style>
            .footer {
                flex: 0 0 auto;
                width: 100%;
                padding-top: 0.5rem;
                padding-bottom: 0.25rem;
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
                font-family: OpenSans;
                box-shadow: var(--shadow-small);
                white-space: nowrap;
                overflow: hidden;
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
            }
            .footer-contacts a svg, .footer-contacts a span {
                display: inline;
                vertical-align: middle;
                fill: white;
                color: white;
            }
            .footer-copyright {
                padding-top: 0.25rem;
            }
            .link-disabled {
                opacity: 0.5;
            }
        </style>
        <footer class="footer">
            <span class="footer-contacts">
                <a class="link-disabled" href="mailto:forbidden">
                    ${readFile("src/page/icons/mail.svg")}
                    <span>Mail</span>
                </a>
                <a href="https://github.com/rolandbernard">
                    ${readFile("src/page/icons/github.svg")}
                    <span>GitHub</span>
                </a>
            </span>
            <span class="footer-copyright">© 2020 - ${(new Date()).getFullYear()} Roland Bernard. MIT License</span>
        </footer>
    `;
}