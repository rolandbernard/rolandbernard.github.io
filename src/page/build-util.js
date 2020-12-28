
import { readFileSync } from 'fs';

function templateJoin(str, ...vals) {
    return str.map((s, i) => s + (vals[i] || '')).join('');
}

export {
    templateJoin as html,
    templateJoin as css,
    templateJoin as svg,
};

export function readFile(filename) {
    return readFileSync(filename, { encoding: 'utf-8' });
}
