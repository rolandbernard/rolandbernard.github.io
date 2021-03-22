
import { html, css, readPostFile } from '../../build/build-util.js';
import { compileMarkdown, markdownStyles } from '../../build/markdown.js';

import { htmlTemplate } from '../html-template.js';

export function postView(lang = 'en', url = '/', post) {
    function extractData(obj, lang) {
        if (typeof(obj) === 'string' || obj instanceof Array) {
            return obj;
        } else {
            return obj[lang] || Object.values(obj)[0];
        }
    }
    const [post_content, post_lang] = readPostFile(post.post, lang);
    return htmlTemplate(`Roland Bernard - ${extractData(post.name, lang)}`, html`
        ${lang !== post_lang ? html`
            <div class="note"><div>${{
                'en': 'Note: This page is not available in English.',
                'de': 'Hinweis: Diese Seite ist nicht in deutscher Sprache verfügbar.',
                'it': 'Nota: Questa pagina non è disponibile in italiano.',
            }[lang]}</div></div>
        ` : ''}
        <main class="post">
            <div class="post-head">
                <h1 class="post-name">${extractData(post.name, lang)}</h1>
                <p class="post-info">
                    ${post.published && html`
                        <span class="post-date">${extractData(post.published, lang)}</span>
                    `}
                    ${post.tags && html`
                        <span class="post-tags">${
                            extractData(post.tags, lang).map(tag => html`
                                <span>${tag}</span>
                            `)
                        }</span>
                    `}
                </p>
            </div>
            <article class="post-content">
                ${compileMarkdown(post_content)}
            </article>
        </main>
    `, css`
        ${markdownStyles()}
        .post {
            display: flex;
            flex-flow: column;
            padding: 4rem 1rem;
            padding-bottom: 5rem;
            align-items: center;
            font-family: 'Open Sans', sans-serif;
            contain: content;
        }
        .post-content {
            width: 100%;
            max-width: 50rem;
        }
        .post-head {
            width: 100%;
            max-width: 50rem;
            border-bottom: 1px solid #00000020;
            margin-bottom: 1rem;
            contain: content;
        }
        .post-name {
            font-size: 2.5rem;
            margin: 0;
            margin-bottom: 0.25rem;
            font-family: 'IBM Plex Sans', 'Open Sans', sans-serif;
        }
        .post-info {
            display: flex;
            font-size: 0.75rem;
            margin: 0.5rem;
        }
        .post-date {
            color: #000000a0;
            border-right: 1px solid #00000020;
            padding-right: 0.5rem;
        }
        .post-tags {
            color: #000000a0;
            padding-left: 0.5rem;
        }
        .post-tags span {
            padding-right: 0.5rem;
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
