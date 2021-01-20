
import { html } from './build-util.js';

import { fontCss } from './fonts.js';
import { themeCss } from './theme.js';
import { pageHeader } from './header.js';
import { pageFooter } from './footer.js';

export function htmlTemplate(title, content, lang = 'en') {
    return html`
        <!DOCTYPE html>
        <html>
            <head>
                <title>${title}</title>
                <meta name="viewport" content="height=device-height,width=device-width,initial-scale=1.0" />
                <link rel="shortcut icon" href="/favicon.svg" />
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
                ${pageHeader(lang)}
                <div class="page-content">${content}</div>
                ${pageFooter(lang)}
            </body>
        </html>
    `;
}
