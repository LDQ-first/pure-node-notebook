/*
    主逻辑入口
*/

const fs = require('fs');
const path = require('path');


class App {
    constructor() {
        this.middlewareArr = [];
        //设计一个空的Promise
        this.middlewareChain = Promise.resolve();
    }
    use(middleware){
        this.middlewareArr.push(middleware);
    }
    //创建Promise链条
    composeMiddleware(context) {
        let {middlewareArr} = this;
        //根据中间件数组 创建Promise链条
        /*this.middlewareChain = this.middlewareChain.then( () => {
            return middlewareArr[0](context);
        })
        this.middlewareChain = this.middlewareChain.then( () => {
            return middlewareArr[1](context);
        })
        this.middlewareChain = this.middlewareChain.then( () => {
            return middlewareArr[2](context);
        })*/
        
        /*this.middlewareChain = this.middlewareChain.then( () => {
            return middlewareArr[0](context);
        }).then( () => {
            return middlewareArr[1](context);
        }).then( () => {
            return middlewareArr[2](context);
        })*/

        for(let middleware of middlewareArr ) {
            this.middlewareChain = this.middlewareChain.then( () => {
                return middleware(context);
            })
        }
        return this.middlewareChain;

    }
    initServer() {
        return (request, response) => {
            let { url, method } = request; // 解构赋值 let url = request.url
            //每个请求逻辑      
            //DRY
           /* request.context = {
                body: '',
                query: {},
                method: 'get'
            };*/
            let context = {
                req: request,
                reqCtx: {
                    body: '', //post请求的数据
                    query: {} //处理客户端get请求

                },
                res: response,
                resCtx: {
                    //用来表示用户
                    hasUser:false,
                    statusCode: 200, //状态码
                    statusMessage: 'resolve ok',
                    headers: {}, //response的返回报文
                    body: '', //返回给前端的内容区
                }
            };
            //request + response
            //1. 每一块中间件只需要关注修改context对象即可，彼此独立
            //2. 设计use和composeMiddleware这两个api来创建Promise链
            //3. 开发者可以专注于中间件的开发
            //函数体可以百年不变
            this.composeMiddleware(context).then( () => {
                let base = { 'X-powered-by': 'Node.js' };
                let {body, headers, statusCode, statusMessage} = context.resCtx;
                //返回的字符串或者Buffer
                response.writeHead(statusCode, statusMessage,
                    Object.assign(base, headers));
                response.end(body);
            })
            /*urlParser(context).then(() => {
                return apiServer(context);
            }).then(() => {
                return staticServer(context);
            }).then(() => {
                let base = { 'X-powered-by': 'Node.js' };
                let {body, headers} = context.resCtx;
                //返回的字符串或者Buffer
                response.writeHead(200, 'resolve ok',
                    Object.assign(base, headers));
                response.end(body);
            });*/
        }
    }
}

module.exports = App
