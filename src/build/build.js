
import { Builder } from './builder.js';
import { readJsonFile } from './build-util.js';
import { languages } from '../config.js';

import { notFoundView } from '../page/views/not-found-view.js';
import { homeView } from '../page/views/home-view.js';
import { postsView } from '../page/views/posts-view.js';
import { postView } from '../page/views/post-view.js';

(async () => {
    const debug = process.argv.includes('-d');

    const builder = new Builder('dist/', { debug: debug });

    builder.copyDirContent('assets/');

    for(const path of ['', ...languages]) {
        const lang = path || 'en';
        await builder.generateHtmlFile(`${path}/404.html`, lang, notFoundView);
        await builder.generateHtmlFile(`${path}/index.html`, lang, homeView);
        await builder.generateHtmlFile(`${path}/posts.html`, lang, postsView);
        await Promise.all(readJsonFile('src/page/info/posts.json').map(async post => {
            await builder.generateHtmlFile(`${path}/posts/${post.post}.html`, lang, postView, post);
        }));
    }
})();

