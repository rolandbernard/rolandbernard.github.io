
import { readFileSync } from 'fs';

function templateJoin(str, ...vals) {
    return str.map((s, i) => {
        if (vals[i] instanceof Array) {
            return s + (vals[i].flat(Infinity).map(el => el.toString()).join('') || '')
        } else {
            return s + (vals[i]?.toString() || '')
        }
    }).join('');
}

export {
    templateJoin as html,
    templateJoin as css,
    templateJoin as svg,
};

export function readFile(filename) {
    return readFileSync(filename, { encoding: 'utf-8' });
}

export function readJsonFile(filename) {
    return JSON.parse(readFileSync(filename, { encoding: 'utf-8' }));
}

export function changeUrlLanguage(url, lang) {
    const matched = url.match(/^\/([^\/]+)(\/?.*)$/);
    if (matched) {
        return '/' + lang + matched[2];
    } else {
        return '/' + lang;
    }
}
