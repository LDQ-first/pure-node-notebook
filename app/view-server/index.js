
/*
*    view-server
*/


//映射表

//ejs动态渲染数据
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const urlrewriteMap = require('./urlrewrite');
module.exports = (ctx) => {
    let { req, resCtx } = ctx;
    let { url } = req;
    return Promise.resolve({
        then: (resolve, reject) => {
            //过滤(只有html才做重定向)
            if (url.match('action') || url.match(/\./)) {
                resolve()
            }
            else {
                const viewPath = path.resolve(__dirname, 'ejs');
                let ejsName =  urlrewriteMap[url];

                if (ejsName) {
                    let layoutPath = path.resolve(viewPath, 'layout.ejs');
                    let layoutHtml = fs.readFileSync(layoutPath, 'utf8');
                    let render = ejs.compile(layoutHtml, {
                        compileDebug: true,
                        filename: layoutPath
                    });
                    
                    let htmlPath = path.resolve(viewPath, ejsName + '.ejs');
                    

            
                    let html = render({
                        templateName: ejsName,
                        hasUser: resCtx.hasUser
                    })

                    resCtx.headers = Object.assign(resCtx.headers, {
                        'Content-Type': 'text/html'
                    })
                    resCtx.body = html;
                    resolve();
                }
                else {
                    //实现重定向
                    resCtx.headers = Object.assign(resCtx.headers, {
                        'Location': '/'
                    })
                    resCtx.statusCode = 302;
                    resCtx.statusMessage = 'redirect'; 
                    resCtx.body = '';
                    resolve();
                }
            }

            //urlMap[url]

            /*if (urlMap[url]) {
                let {viewName} = urlMap[url];
                
                resCtx.headers = Object.assign(resCtx.headers, {
                    'Content-Type': mime.lookup(htmlPath)
                })
                let tempStr = fs.readFileSync(htmlPath, 'utf-8')
                let render = ejs.compile(tempStr, {
                    compileDebug: true
                });
                resCtx.body = render();
                resolve();
            }
            else {
                resolve();
            }*/

        }
    })
}
