// 引入koa
const koa = require('koa2');
const path = require('path')

const app = new koa();


const static = require('koa-static');
// 配置静态web服务的中间件
app.use(static( path.normalize(__dirname+'/../dist')));
                
// 监听端口≈
app.listen(3000,function(){
    console.log('http://localhost:3000');
});