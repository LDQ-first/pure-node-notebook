


const fs = require('fs');
const path = require('path');

//DRY
let getPath = url=> path.resolve(process.cwd(), 'public', `.${url}`);
let staticFunc = (url) => {
                if(url == '/'){
                    url = '/index.html'
                }
                let map = {
                    '/': 'index.html',
                    '/about': '/about.html',
                    '/list': '/list.html'
                }
                let _path = getPath(url);
              //  console.log(_path);
                let body = '';
                try{
                    body = fs.readFileSync(_path);
                }
                catch(err){
                    body = `NOT FOUND ${err.stack}`
                }
                return body;
            };
module.exports = staticFunc