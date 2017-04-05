
const http = require('http');
const PORT = 5000;
const APP = require('./app');
const server = new APP();
//中间件
const staticServer = require('./app/static-server');
const apiServer = require('./app/api');
const urlParser = require('./app/url-parser');

server.use(urlParser);
server.use(apiServer);
server.use(staticServer);

//启动app
http.createServer(server.initServer()).listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})