// const Koa = require('koa');
// const app = new Koa();
const {connect} = require('./database/init.js');

//立即执行函数
(async () => {
    await connect();
})()

// app.use(async ctx => {
//     ctx.body = 'Hello Koa';
// })
// app.listen(3000, ()=>{
//     console.log('Server starting in port 3000');
// })