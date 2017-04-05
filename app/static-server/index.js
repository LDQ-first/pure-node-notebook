


const fs = require('fs');
const path = require('path');
const mime = require('mime');
//DRY
let getPath = url => path.resolve(process.cwd(), 'public', `.${url}`);
let staticFunc = (ctx) => {
    let {url} = ctx.req;
    let {resCtx } = ctx;
    return new Promise((resolve, reject) => {
        if(url.match(/\./) && !url.match('action')) { 
            /*if (url == '/') {
                url = '/index.html'
            }*/
          /*  let map = {
                '/': 'index.html',
                '/about': '/about.html',
                '/list': '/list.html'
            }*/
            let _path = getPath(url);
            resCtx.headers = Object.assign(resCtx.headers, {
                'Content-Type': mime.lookup(_path)
            })
            let body = fs.readFile(_path, (err, data) => {
                if (err) {
                    resCtx.body = `NOT FOUND ${err.stack}`;
                }
                resCtx.body = data;
                resolve();
            });
        }else {
            resolve();
        }
    });
};
module.exports = staticFunc