/*
* url-parser
* 处理客户端数据
*/

//request: query + body + methods
const Url = require('url');

module.exports = (ctx) => {
    let {method, url} = ctx.req;
    let { reqCtx } = ctx;
    method = method.toLowerCase();
    //将url解析并赋值到reqCtx中(避免query参数导致重定向)
    /* reqCtx
	query 对象
	pathname路径名
	index.html?a=1 ==> query:{a:1}
	*/
    Object.assign(reqCtx, Url.parse(url, true), {method});

    
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