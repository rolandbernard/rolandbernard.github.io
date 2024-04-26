
import { html, css } from '../../build/build-util.js';

import { htmlTemplate } from '../html-template.js';
import { backgroundStyles, specialBackground, specialBackgroundStyles } from '../background.js';

export function homeView(lang = 'en', url = '/') {
    return htmlTemplate('Roland Bernard - Home', html`
        <main>
           ${specialBackground(html`
                <section
                    class="main-info-wrap"
                    title="${{
            'en': 'Who am I?',
            'de': 'Wer bin ich?',
            'it': 'Chi sono?',
        }[lang]}"
                >
                    <div class="main-info">
                        <img class="main-info-image" src="/img/profile.jpg" alt="Not a photo of me" width="160" height="160" />
                        <div class="main-info-text">
                            <div class="main-info-name">Roland Bernard</div>
                        </div>
                        <hr class="home-divider" />
                    </div>
                </section>
            `)}
        </main>
    `, css`
        ${specialBackgroundStyles()}
        ${backgroundStyles()}
        .main-info-wrap {
            height: calc(100vh - 10rem);
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .main-info {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            position: relative;
            margin-top: 1rem;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            contain: content;
        }
        .main-info-image {
            flex: 0 0 auto;
            width: 10rem;
            height: 10rem;
            border-radius: 50%;
            margin: 1rem;
            object-fit: cover;
            box-shadow: var(--shadow-small);
            pointer-events: none;
            contain: content;
        }
        @media (max-width: 500px) {
            .main-info {
                flex-direction: column;
            }
        }
        .main-info-text {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 1rem;
            text-align: center;
            height: 6rem;
        }
        .main-info-name {
            font-family: 'IBM Plex Sans', 'Open Sans', sans-serif;
            font-size: 2.25rem;
            font-weight: 500;
        }
        .main-info-desc {
            font-family: 'Open Sans', sans-serif;
            font-size: 1.25rem;
        }
        .main-info-desc span {
            display: inline-block;
        }
        .home-divider {
            position: absolute;
            bottom: 0;
            width: 80%;
            border-color: var(--primary);
            background: var(--primary);
        }
    `, lang, url);
}
