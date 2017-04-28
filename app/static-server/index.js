


const fs = require('fs');
const path = require('path');
const mime = require('mime');
//DRY
let getPath = pathname => path.resolve(process.cwd(), 'public', `.${pathname}`);
let staticFunc = (ctx) => {
    let {pathname} = ctx.reqCtx;
    let {resCtx } = ctx;
    return new Promise((resolve, reject) => {
        if(pathname.match(/\./) && !pathname.match('action')) { 
            /*if (url == '/') {
                url = '/index.html'
            }*/
          /*  let map = {
                '/': 'index.html',
                '/about': '/about.html',
                '/list': '/list.html'
            }*/
            let _path = getPath(pathname);
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