
import gm from 'gm';

import { html, css, readJsonFile } from '../../build/build-util.js';

import { htmlTemplate } from '../html-template.js';
import { background, backgroundStyles } from '../background.js';

async function imageElement(url) {
    let { width, height } = await new Promise(res => {
        gm(`assets/projimg/${url}`).size((err, size) => {
            if (!err) {
                res(size);
            } else {
                res({
                    width: 480,
                    height: 480
                });
            }
        });
    });
    if (width > height) {
        height = 480 * height / width;
        width = 480;
    } else {
        width = 480 * width / height;
        height = 480;
    }
    return html`
        <img
            class="project-image"
            src="/projimg/${url}"
            alt="Example image for the project"
            width="${width}" height="${height}"
        />
    `;
}

async function projectElement(info, lang) {
    function extractData(obj, lang) {
        if (typeof(obj) === 'string' || obj instanceof Array) {
            return obj;
        } else {
            return obj[lang] || Object.values(obj)[0];
        }
    }
    return html`
        <section class="project-item" id="${extractData(info.name).toLowerCase().replace(/ /g, '')}" title="${extractData(info.name)}">
            <div class="project-text">
                <a href="${extractData(info.link, lang)}" target="_blank">
                    <h2 class="project-name">
                            ${extractData(info.name, lang)}
                    </h2>
                </a>
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
            ${info.iframe
                ? html`
                    <iframe
                        class="project-iframe"
                        src="${info.iframe}"
                        width="480" height="480"
                    ></iframe>
                `
                : info.image && await imageElement(extractData(info.image, lang))
            }
            ${info.video && html`
                <video class="project-image" autoplay loop muted playsinline width="480" height="480">
                    <source src="/projimg/${extractData(info.video, lang)}" type="video/mp4" >
                    <p>Example image for the project</p>
                </video>
            `}
        </section>
    `;
}

export async function projectsView(lang = 'en', url = '/') {
    return htmlTemplate('Roland Bernard - Projects', html`
        <main>
            ${lang !== 'en' ? html`
                <div class="note"><div>${{
                    'de': 'Hinweis: Diese Seite ist nur in englischer Sprache verfügbar.',
                    'it': 'Nota: Questa pagina è disponibile solo in inglese.',
                }[lang]}</div></div>
            ` : ''}
            ${await Promise.all(
                readJsonFile('src/page/info/projects.json')
                    .map(async (el, i) =>
                        background(i + 1, await projectElement(el, lang))
                    )
            )}
        </main>
    `, css`
        ${backgroundStyles()}
        .project-item {
            padding: 1rem;
            margin: 1rem 0;
            display: flex;
            flex-flow: row;
            align-items: center;
            width: 100%;
            max-width: 70rem;
            contain: content;
        }
        @media (max-width: 60rem) {
            .project-item {
                flex-direction: column;
            }
        }
        .project-more {
            display: block;
            width: max-content;
        }
        .project-text {
            flex: 1 1 auto;
            font-family: 'Open Sans', sans-serif;
            font-size: 1rem;
            display: flex;
            flex-flow: column;
            align-items: center;
            contain: content;
        }
        .project-name {
            font-size: 1.5rem;
            font-weight: 500;
            font-family: 'IBM Plex Sans', 'Open Sans', sans-serif;
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
            margin: 1rem 0.5rem;
        }
        .project-iframe {
            flex: 0 0 auto;
            width: 30rem;
            height: 30rem;
            border-radius: 4px;
            margin: 1rem;
            border: 0;
            padding: 0;
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
            z-index: 1;
        }
        div.note div {
            font-family: 'Open Sans', sans-serif;
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
