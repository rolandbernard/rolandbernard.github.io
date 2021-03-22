
import { html } from '../build/build-util.js';

import { fontStyles } from './fonts.js';
import { themeStyles } from './theme.js';
import { pageHeader, pageHeaderStyles } from './header.js';
import { pageFooter, pageFooterStyles } from './footer.js';

export function htmlTemplate(title, content, style, lang = 'en', url = '/') {
    return html`
        <!DOCTYPE html>
        <html lang="${lang}">
            <head>
                <title>${title}</title>
                <meta name="viewport" content="height=device-height,width=device-width,initial-scale=1.0" />
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta name="description" content="Personal website of Roland Bernard">
                <meta charset="UTF-8">
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
                    }
                    .page-content {
                        flex: 1 1 auto;
                        display: flex;
                        flex-direction: column;
                    }
                    .main-content {
                        flex: 1 1 auto;
                    }
                    a, a:active {
                        text-decoration: none;
                        color: var(--primary);
                    }
                    a:hover {
                        color: var(--primary-light);
                    }
                    img {
                        contain: content;
                    }
                    ${themeStyles()}
                    ${pageHeaderStyles()}
                    ${style}
                    ${pageFooterStyles()}
                </style>
                <style>${fontStyles()}</style>
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
