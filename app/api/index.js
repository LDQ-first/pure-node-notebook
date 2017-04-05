/*
* api server
*/

module.exports = (ctx) => {
    let { url, method } = ctx.req;
    let { resCtx, reqCtx } = ctx;
    let { res } = ctx;

    let apiMap = {
        '/list.action': ['流星', '烟花', 'node'],
        '/user.action': ['ldq', '10086', 'share']
    }
    method = method.toLowerCase();
    return Promise.resolve({
        then: (resolve, reject) => {
            if (url.match('action')) {
                if (method === 'get') {
                    resCtx.body = JSON.stringify(apiMap[url]);
                }
                else {
                    let {body} = reqCtx;
                    resCtx.body = JSON.stringify(body);
                    //处理post B post ===socket=== S
                }
                //res.setHeader("Content-Type","application/json")
                resCtx.headers = Object.assign( resCtx.headers, {
                    "Content-Type" : "application/json"
                })
            }
            //通知下一个流程来处理
            resolve()
        }
    })
}
