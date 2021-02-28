
import { html } from '../../build/build-util.js';

import { htmlTemplate } from '../html-template.js';

export function notFoundView(lang = 'en', url = '/') {
    return htmlTemplate('Page not found', html`
        <style>
            .not-found-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
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
        </style>
        <div class="not-found-container">
            <div class="not-found-title">404</div>
            <div class="not-found-text">${{
                'en':'Page cannot be found',
                'de':'Seite konnte nicht gefunden werden',
                'it':'Sito non poteva essere trovato',
            }[lang]}</div>
        </div>
    `, lang, url);
}
