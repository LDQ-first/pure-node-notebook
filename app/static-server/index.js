


const fs = require('fs');
const path = require('path');

//DRY
let getPath = url => path.resolve(process.cwd(), 'public', `.${url}`);
let staticFunc = (request) => {
    let {url} = request;
    return new Promise((resolve, reject) => {
        if (url == '/') {
            url = '/index.html'
        }
        let map = {
            '/': 'index.html',
            '/about': '/about.html',
            '/list': '/list.html'
        }
        let _path = getPath(url);
        //  console.log(_path);
        let body = fs.readFile(_path, (err, data) => {
            if (err) {
                reject(`NOT FOUND ${err.stack}`);
            }
            resolve(data);
        });
    });
};
module.exports = staticFunc