
import { html, readJsonFile } from '../../build/build-util.js';

import { htmlTemplate } from '../html-template.js';
import { background } from '../background.js';

function projectElement(info, lang) {
    function extractData(obj, lang) {
        if (typeof(obj) === 'string' || obj instanceof Array) {
            return obj;
        } else {
            return obj[lang] || Object.values(obj)[0];
        }
    }
    return html`
        <div class="project-item">
            <div class="project-text">
                <a class="project-name" href="${extractData(info.link, lang)}">
                    ${extractData(info.name, lang)}
                </a>
                ${info.tags && html`
                    <div class="project-tags">${
                        extractData(info.tags, lang).map(tag => html`
                            <span>${tag}</span>
                        `)
                    }</div>
                `}
                <div class="project-desc">
                    <span>${extractData(info.desc, lang)}</span>
                    <a class="project-more" href="${extractData(info.link, lang)}">
                        More
                    </a>
                </div>
            </div>
            ${info.image && html`
                <img
                    class="project-image"
                    src="/projimg/${extractData(info.image, lang)}"
                    alt="Example image for the project"
                    width="480" height="480"
                />
            `}
            ${info.video && html`
                <video class="project-image" autoplay loop muted playsinline width="480" height="480">
                    <source src="/projimg/${extractData(info.video, lang)}" type="video/mp4" >
                    <p>Example image for the project</p>
                </video>
            `}
        </div>
    `;
}

export function projectsView(lang = 'en', url = '/') {
    return htmlTemplate('Roland Bernard - Home', html`
        <style>
            .project-item {
                padding: 1rem;
                margin: 1rem;
                display: flex;
                flex-flow: row;
                align-items: center;
                width: 90%;
                max-width: 70rem;
            }
            @media (max-width: 60rem) {
                .project-item {
                    flex-direction: column;
                }
            }
            .project-text {
                flex: 1 1 auto;
                font-family: OpenSans, Roland, Arial, Helvetica, sans-serif;
                font-size: 1rem;
                display: flex;
                flex-flow: column;
                align-items: center;
            }
            .project-name {
                font-size: 1.5rem;
            }
            .project-tags {
                font-size: 0.85rem;
                color: var(--background-darkish);
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                justify-content: center;
            }
            .project-tags span {
                padding: 0.3rem 0.65rem;
                margin: 0.25rem;
                border-radius: 2rem;
                background: var(--background-light);
            }
            .project-desc {
                padding: 0.5rem;
            }
            .project-image {
                flex: 0 0 auto;
                width: 100%;
                height: 100%;
                border-radius: 4px;
                max-width: 30rem;
                max-height: 30rem;
                padding: 1rem;
            }
            div.note {
                position: absolute;
                top: 4rem;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
            }
            div.note div {
                font-family: OpenSans, Roland, Arial, Helvetica, sans-serif;
                font-size: 0.75rem;
                color: var(--background-darkish);
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                justify-content: center;
                padding: 0.25rem 0.5rem;
                border-radius: 2rem;
                background: var(--background-lighter);
            }
        </style>
        <div>
            ${lang !== 'en' ? html`
                <div class="note"><div>${{
                    'de': 'Hinweis: Diese Seite ist nur in englischer Sprache verfügbar.',
                    'it': 'Nota: Questa pagina è disponibile solo in inglese.',
                }[lang]}</div></div>
            ` : ''}
            ${readJsonFile('src/page/info/projects.json').map((el, i) => background(i + 1, projectElement(el, lang)))}
        </div>
    `, lang, url);
}