
import { Builder } from './builder.js';
import { languages } from '../config.js';

import { notFoundView } from '../page/views/not-found-view.js';

const debug = process.argv.includes('-d');

const builder = new Builder('dist/', { debug: debug });

builder.copyDirContent('assets/');

for(const lang of ['', ...languages]) {

    builder.addHtmlFile(`${lang}/404.html`, notFoundView(lang || 'en'));
}
