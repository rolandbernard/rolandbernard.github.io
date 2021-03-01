
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
                        width: 100%;
                        padding: 0;
                        margin: 0;
                        flex-flow: column;
                        overflow: hidden;
                    }
                    .page-content {
                        flex: 1 1 auto;
                        display: flex;
                        flex-flow: column;
                        overflow: hidden;
                        overflow-x: hidden;
                        overflow-y: auto;
                        scroll-behavior: smooth;
                    }
                    .main-content {
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
                <div class="page-content">
                    <div class="main-content">
                        ${content}
                    </div>
                    ${pageFooter(lang, url)}
                </div>
            </body>
        </html>
    `;
}
