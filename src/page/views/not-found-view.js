
import { html, css } from '../../build/build-util.js';

import { htmlTemplate } from '../html-template.js';

export function notFoundView(lang = 'en', url = '/') {
    return htmlTemplate('Page not found', html`
        <main class="not-found-container">
            <div class="not-found-title">404</div>
            <div class="not-found-text">${{
                'en':'Page cannot be found',
                'de':'Seite konnte nicht gefunden werden',
                'it':'Sito non poteva essere trovato',
            }[lang]}</div>
        </main>
    `, css`
        .not-found-container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: OpenSans, Roland, Arial, Helvetica, sans-serif;
            user-select: none;
            text-align: center;
        }
        .not-found-title {
            font-size: 3rem;
        }
        .not-found-text {
            font-size: 1.5rem;
        }
    `, lang, url);
}
