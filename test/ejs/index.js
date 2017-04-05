const path = require('path');
const ejs = require('ejs');

const html = `hello
    <% if(world.match('jjj')) {%>
    <%- world %>
    <% }%>
    <%- include('test') %>   
    <%= hhh %>`;

const f1 = ejs.compile(html, {
    filename: path.resolve(__filename),
    compileDebug: true
});
const finalStr = f1({
    world: 'xxxx',
    hhh: '<script>alert(1)</script>'
});


