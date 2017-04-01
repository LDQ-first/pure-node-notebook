/*
* url-parser
* 处理客户端数据
*/

//request: query + body + methods

module.exports = (request) => {
    let {method, url, context} = request;
    method = method.toLowerCase();
    return Promise.resolve({
        then: (resolve, reject) => {
            context.method = method;
            context.query = {};
            if (method === 'post') {
                let data = '';
                //原型链readable stream eventEmitter
                request.on('data', (chunk) => {
                    data += chunk;
                }).on('end', () => {
                    context.body = JSON.parse(data);
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