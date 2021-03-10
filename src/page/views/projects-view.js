
import { html, css, readJsonFile } from '../../build/build-util.js';

import { htmlTemplate } from '../html-template.js';
import { background, backgroundStyles } from '../background.js';

function projectElement(info, lang) {
    function extractData(obj, lang) {
        if (typeof(obj) === 'string' || obj instanceof Array) {
            return obj;
        } else {
            return obj[lang] || Object.values(obj)[0];
        }
    }
    return html`
        <section class="project-item" id="${info.name.toLowerCase().replace(/ /g, '')}" title="${info.name}">
            <div class="project-text">
                <h2>
                    <a class="project-name" href="${extractData(info.link, lang)}" target="_blank">
                        ${extractData(info.name, lang)}
                    </a>
                </h2>
                ${info.tags && html`
                    <div class="project-tags">${
                        extractData(info.tags, lang).map(tag => html`
                            <span>${tag}</span>
                        `)
                    }</div>
                `}
                <p class="project-desc">
                    <span>${extractData(info.desc, lang)}</span>
                    <a class="project-more" href="${extractData(info.link, lang)}" target="_blank">
                        More
                    </a>
                </p>
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
        </section>
    `;
}

export function projectsView(lang = 'en', url = '/') {
    return htmlTemplate('Roland Bernard - Home', html`
        <main>
            ${lang !== 'en' ? html`
                <div class="note"><div>${{
                    'de': 'Hinweis: Diese Seite ist nur in englischer Sprache verfügbar.',
                    'it': 'Nota: Questa pagina è disponibile solo in inglese.',
                }[lang]}</div></div>
            ` : ''}
            ${readJsonFile('src/page/info/projects.json').map((el, i) => background(i + 1, projectElement(el, lang)))}
        </main>
    `, css`
        ${backgroundStyles()}
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
        .project-more {
            display: block;
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
            margin: 1rem;
        }
        .project-image {
            flex: 0 0 auto;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            max-width: 30rem;
            max-height: 30rem;
            margin: 1rem;
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
    `, lang, url);
}