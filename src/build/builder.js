
import { minify } from 'html-minifier-terser';
import prettier from 'prettier';
import { join, dirname } from 'path';
import { rmSync, mkdirSync, writeFileSync, readdirSync, copyFileSync, statSync } from 'fs';

export class Builder {
    
    constructor(output_dir, options = { debug: false }) {
        this.options = options;
        this.output_dir = output_dir;
        rmSync(this.output_dir, { recursive: true, force: true });
        mkdirSync(this.output_dir, { recursive: true });
    }
    
    async generateHtmlFile(filename, lang, func, ...args) {
        this.addHtmlFile(filename, await func(lang, `/${filename}`, ...args));
    }

    addHtmlFile(filename, html) {
        let content = html;
        if(this.options.debug) {
            content = prettier.format(content, { parser: 'html', tabWidth: 4 });
        } else {
            content = minify(html, {
                minifyCSS: true,
                minifyJS: true,
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeComments: true,
                removeOptionalTags: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeTagWhitespace: true,
            });
        }
        this.addFile(filename, content);
    }
   
    addFile(filename, content) {
        mkdirSync(dirname(join(this.output_dir, filename)), { recursive: true });
        writeFileSync(join(this.output_dir, filename), content, { encoding: 'utf-8' });
    }

    copyDirContent(directory, to) {
        const output_dir = join(this.output_dir, to || '');
        if(to) {
            mkdirSync(output_dir, { recursive: true });
        }
        const files = readdirSync(directory);
        for(const file of files) {
            if(statSync(join(directory, file)).isDirectory()) {
                this.copyDirContent(join(directory, file), join(to || '', file));
            } else {
                copyFileSync(join(directory, file), join(output_dir, file));
            }
        }
    }

}
