/*
* api server
*/

module.exports = (url) => {
    let apiMap = {
        '/list.action': ['流星','烟花','node'],
        '/user.action': ['ldq', '10086', 'share']
    }
    return Promise.resolve(apiMap[url])
}
