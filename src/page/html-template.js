
import { html } from '../build/build-util.js';

import { fontCss } from './fonts.js';
import { themeCss } from './theme.js';
import { pageHeader } from './header.js';
import { pageFooter } from './footer.js';

export function htmlTemplate(title, content, lang = 'en', url = '/') {
    return html`
        <!DOCTYPE html>
        <html lang="${lang}">
            <head>
                <title>${title}</title>
                <meta name="viewport" content="height=device-height,width=device-width,initial-scale=1.0" />
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta name="description" content="Personal website of Roland Bernard">
                <style>${fontCss()}</style>
                <style>${themeCss()}</style>
                <style>
                    html {
                        height: 100%;
                    }
                    body {
                        display: flex;
                        height: 100%;
                        padding: 0;
                        margin: 0;
                        flex-flow: column;
                        overflow-x: hidden;
                        --scroll: 0;
                    }
                    .page-content {
                        flex: 1 1 auto;
                    }
                    a {
                        text-decoration: none;
                        color: var(--primary);
                    }
                </style>
            </head>
            <body>
                ${pageHeader(lang, url)}
                <div class="page-content">${content}</div>
                ${pageFooter(lang, url)}
            </body>
            <script>
                document.addEventListener('scroll', (_) => {
                    document.body.style.setProperty("--scroll", (100 * window.scrollY / (document.body.scrollHeight - window.innerHeight)));
                });
            </script>
        </html>
    `;
}
