
import { html } from './build-util.js';

import { fontCss } from './fonts.js';
import { themeCss } from './theme.js';
import { pageHeader } from './header.js';

export function htmlTemplate(title, content, lang = 'en') {
    return html`
        <!DOCTYPE html>
        <html>
            <head>
                <title>${title}</title>
                <meta name="viewport" content="height=device-height,width=device-width,initial-scale=1.0" />
                <style>${fontCss()}</style>
                <style>${themeCss()}</style>
            </head>
            <body>
                ${pageHeader(lang)}
                ${content}
            </body>
        </html>
    `;
}
