
import { html, css, readJsonFile, readPostFile } from '../../build/build-util.js';

import { htmlTemplate } from '../html-template.js';

function postElement(info, lang) {
    function extractData(obj, lang) {
        if (typeof(obj) === 'string' || obj instanceof Array) {
            return obj;
        } else {
            return obj[lang] || Object.values(obj)[0];
        }
    }
    function extractText(string) {
        return string.replace(/[#<>/"'\\`%\|\-_*~]/g, '').substr(0, 200).replace(/\S*$/, '');
    }
    return html`
        <article class="post-item" id="${info.name.toLowerCase().replace(/ /g, '')}" title="${info.name}">
            <a href="/${lang}/posts/${extractData(info.post, lang)}">
                <h2 class="post-name">
                        ${extractData(info.name, lang)}
                </h2>
            </a>
            <p class="post-info">
                ${info.published && html`
                    <span class="post-date">${extractData(info.published, lang)}</span>
                `}
                ${info.tags && html`
                    <span class="post-tags">${
                        extractData(info.tags, lang).map(tag => html`
                            <span>${tag}</span>
                        `)
                    }</span>
                `}
            </p>
            <p class="post-preview">
                ${extractText(readPostFile(extractData(info.post, lang), lang)[0])}
                <a href="/${lang}/posts/${extractData(info.post, lang)}">${{
                    "en": "more...",
                    "de": "mehr...",
                    "it": "altro...",
                }[lang]}</a>
            </p>
        </article>
    `;
}

export function postsView(lang = 'en', url = '/') {
    return htmlTemplate('Roland Bernard - Posts', html`
        <main class="posts">
            ${readJsonFile('src/page/info/posts.json').map(el => postElement(el, lang))}
        </main>
    `, css`
        .posts {
            height: max-content;
            min-height: 100%;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
            padding: 2.5rem 1rem;
            padding-bottom: 5rem;
            box-sizing: border-box;
        }
        .post-item {
            padding: 1rem 0;
            margin: 1rem;
            display: flex;
            flex-flow: column;
            align-items: start;
            width: 100%;
            max-width: 50rem;
            font-family: OpenSans, Roland, Arial, Helvetica, sans-serif;
            border-bottom: 1px solid #00000020;
            box-sizing: border-box;
        }
        .post-name {
            font-size: 1.75rem;
            margin: 0;
            margin-bottom: 0.25rem;
        }
        .post-info {
            display: flex;
            font-size: 0.75rem;
            margin: 0;
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
            position: relative;
        }
    `, lang, url);
}