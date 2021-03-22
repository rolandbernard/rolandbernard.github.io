
import { languages } from '../config.js';
import { existsSync, readFileSync } from 'fs';

function templateJoin(str, ...vals) {
    return str.map((s, i) => {
        if (vals[i] instanceof Array) {
            return s + (vals[i].flat(Infinity).map(el => el.toString()).join('') || '')
        } else {
            return s + (vals[i]?.toString() || '')
        }
    }).join('');
}

// These are manly just to get the correct syntax highliting
export {
    templateJoin as html,
    templateJoin as css,
    templateJoin as svg,
};

export function readFile(filename) {
    return readFileSync(filename, { encoding: 'utf-8' });
}

export function readFileDataUrl(filename, mime) {
    return `data:${mime};base64,${Buffer.from(readFile(filename)).toString('base64')}`;
}

export function readJsonFile(filename) {
    return JSON.parse(readFileSync(filename, { encoding: 'utf-8' }));
}

export function readPostFile(filename, prefered_lang) {
    for (const lang of [prefered_lang, ...languages]) {
        if (existsSync(`src/page/posts/${lang}/${filename}.md`)) {
            return [readFileSync(`src/page/posts/${lang}/${filename}.md`, { encoding: 'utf-8' }), lang];
        }
    }
    return ['', ''];
}

export function changeUrlLanguage(url, lang) {
    const matched = url.match(/^\/([^\/]+)(\/?.*)$/);
    if (matched) {
        return '/' + lang + matched[2];
    } else {
        return '/' + lang;
    }
}
