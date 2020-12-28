
import { Builder } from './builder.js';
        
import { notFoundView } from '../page/views/not-found-view.js';

const debug = process.argv.includes('-d');

const builder = new Builder('dist/', { debug: debug });

builder.copyDirContent('assets/');

for(const lang of ['', 'en', 'de', 'it']) {

}

builder.addHtmlFile(`404.html`, notFoundView());
