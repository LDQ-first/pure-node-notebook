/*
    主逻辑入口
*/

const fs = require('fs');
const path = require('path');
const staticServer = require('./static-server');
const apiServer = require('./api');

class App {
    constructor() {

    }
    initServer() {
        return (request, response) => {
            let { url } = request; // 解构赋值 let url = request.url
            //每个请求逻辑      
            //DRY
            //返回的字符串或者Buffer
            let body = '';
            //响应头
            let headers = {};
            if (url.match('action')) {
                apiServer(url).then(val => {
                    body = JSON.stringify(val);
                    headers = {
                        'Content-Type': 'application/json'
                    }
                    let fianlHeader = Object.assign(headers, { 'X-powered-by': 'Node.js' });
                    response.writeHead(200, 'resolve ok', fianlHeader);
                    response.end(body);
                })
            }
            else {
                staticServer(url).then((body) => {
                    let fianlHeader = Object.assign(headers, { 'X-powered-by': 'Node.js' });
                    response.writeHead(200, 'resolve ok', fianlHeader);
                    response.end(body);
                });
            }
        }
    }
}

module.exports = App
