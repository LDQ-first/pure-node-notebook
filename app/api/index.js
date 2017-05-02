/*
* api server
*/
let Router = require('./ajax');


module.exports = (ctx) => {
    let { pathname, method } = ctx.reqCtx;
    let { resCtx, reqCtx } = ctx;
    let { res } = ctx;

    /*let apiMap = {
        '/list.action': ['流星', '烟花', 'node'],
        '/user.action': ['ldq', '10086', 'share']
    }*/
    return Promise.resolve({
        then: (resolve, reject) => {
            if (pathname.match('action')) {
                 return Router.routes(ctx).then(val=>{
                    resCtx.body = JSON.stringify(val);
                    resCtx.headers = Object.assign( resCtx.headers, {
                        "Content-Type" : "application/json"
                    })
                    resolve();
                })
                /*if (method === 'get') {
                    resCtx.body = JSON.stringify(apiMap[pathname]);
                }
                else {
                    let {body} = reqCtx;
                    resCtx.body = JSON.stringify(body);
                    //处理post B post ===socket=== S
                }
                //res.setHeader("Content-Type","application/json")
                resCtx.headers = Object.assign( resCtx.headers, {
                    "Content-Type" : "application/json"
                })*/
            }
            //通知下一个流程来处理
            resolve()
        }
    })
}
