/*
 * 处理cookie
 */
const cookie_parser = require('cookie');
//设置白名单
const whiteNameList=['/ldq'];
module.exports = (ctx)=>{
	let { pathname } = ctx.reqCtx;
	let { cookie } = ctx.req.headers;
	let { resCtx,res } = ctx;
	let cookieObj = cookie_parser.parse(cookie||'');
	return Promise.resolve({
		then:(resolve,reject)=>{
			let cookieStr =time=>`authd=hello;Max-Age=${time}`;

			if(cookieObj['authd']){
				resCtx.hasUser = true;
				res.setHeader('Set-Cookie',cookieStr(3600))
			}
			/*//设置白名单
			const whiteNameList=['/ldq'];*/
			//登录
			if(whiteNameList.indexOf(pathname)>-1){
				console.log(whiteNameList);
				console.log(pathname);
				res.setHeader('Set-Cookie',cookieStr(3600))
			};
			//登出
			if(pathname=='/logout'){
				res.setHeader('Set-Cookie',cookieStr(0))
			}
			resolve()
		}
	})	 		
} 
