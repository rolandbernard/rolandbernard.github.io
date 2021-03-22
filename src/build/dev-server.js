
import { watch, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { exec } from 'child_process';
import serve from 'serve-handler';
import http from 'http';

const server = http.createServer((req, res) => serve(req, res, { public: 'dist/' }));

server.listen(8080, () => {
    console.log(`[${(new Date()).toLocaleString()}] Running at http://localhost:8080`);
});

function build() {
    console.log(`[${(new Date()).toLocaleString()}] Started rebuilding...`);
    exec('node src/build/build.js', (err, _, stderr) => {
        if(stderr || err) {
            console.error(`[${(new Date()).toLocaleString()}] Failed rebuild:`);
            console.error(stderr);
        } else {
            console.log(`[${(new Date()).toLocaleString()}] Finished rebuild.`);
        }
    });
}

let last_timeout = null;
function recursiveWatch(dir) {
    watch(dir, (e, f) => {
        clearTimeout(last_timeout);
        last_timeout = setTimeout(build, 100);
    });
    const dir_content = readdirSync(dir);
    for(const file of dir_content) {
        const full_path = join(dir, file);
        if(statSync(full_path).isDirectory()) {
            recursiveWatch(full_path);
        }
    }
}

build();
recursiveWatch('src/');
