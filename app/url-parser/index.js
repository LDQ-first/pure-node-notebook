/*
* url-parser
* 处理客户端数据
*/

//request: query + body + methods

module.exports = (ctx) => {
    let {method, url} = ctx.req;
    let { reqCtx } = ctx;
    method = method.toLowerCase();
    return Promise.resolve({
        then: (resolve, reject) => {
            if (method === 'post') {
                let data = [];
                //原型链readable stream eventEmitter
                ctx.req.on('data', (chunk) => {
                    //data += chunk;
                    data.push(chunk);
                }).on('end', () => {
                    let endData = Buffer.concat(data).toString();
                    reqCtx.body = JSON.parse(endData);
                   // resolve(JSON.parse(data)); //body
                   //通知下一个流程
                   resolve();
                })
            }
            else {
                resolve();
            }
        }
    })
}