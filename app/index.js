/*
    主逻辑入口
*/

const fs = require('fs');
const path = require('path');
const staticServer = require('./static-server');


class App {
    constructor(){

    }
    initServer(){
        return (request, response) => {
            let { url } = request; // 解构赋值 let url = request.url
            //每个请求逻辑      
            let body = staticServer(url);
            response.writeHead(200, 'resolve ok', {'X-powered-by': 'Node.js'})
            response.end(body);
                   
        }
    }
}

module.exports = App
