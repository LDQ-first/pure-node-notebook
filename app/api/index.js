/*
* api server
*/

module.exports = (request) => {
    let { url, method,context } = request; // 解构赋值 let url = request.url
    let apiMap = {
        '/list.action': ['流星', '烟花', 'node'],
        '/user.action': ['ldq', '10086', 'share']
    }
    method = method.toLowerCase();
    if (method === 'get') {
        return Promise.resolve(apiMap[url])
    }
    else {
        let {body} = context;
        //处理post B post ===socket=== S
        return Promise.resolve(body);
    }
}
