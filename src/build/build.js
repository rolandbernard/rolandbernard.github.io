
import { Builder } from './builder.js';
import { languages } from '../config.js';

import { notFoundView } from '../page/views/not-found-view.js';
import { homeView } from '../page/views/home-view.js';
import { projectsView } from '../page/views/projects-view.js';

const debug = process.argv.includes('-d');

const builder = new Builder('dist/', { debug: debug });

builder.copyDirContent('assets/');

for(const path of ['', ...languages]) {
    const lang = path || 'en';
    builder.generateHtmlFile(`${path}/404.html`, lang, notFoundView);
    builder.generateHtmlFile(`${path}/index.html`, lang, homeView);
    builder.generateHtmlFile(`${path}/projects.html`, lang, projectsView);
}
