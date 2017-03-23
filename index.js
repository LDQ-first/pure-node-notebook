
const http = require('http');
const PORT = 5000;
const APP = require('./app');
const server = new APP();
http.createServer(server.initServer()).listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})