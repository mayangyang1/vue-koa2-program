const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const mongoose = require('mongoose');
let user = require('./appApi/User.js');
const {connect, initSchemas} = require('./database/init.js');

let router = new Router();
router.use('/user', user.routes());

//立即执行函数
(async () => {
    await connect();
    initSchemas();
    // const User = mongoose.model('User');
    // let oneUser = new User({userName: 'myy', password: '123456'});
    // oneUser.save().then(()=>{
    //     console.log('插入成功')
    // })

    // let users = await User.findOne({}).exec();
    // console.log('..................')
    // console.log(users);
    // console.log('..................')
})()


app.use(cors({
    origin: function (ctx) {
        if (ctx.url === 'user/register') {
          return "*"; // 允许来自所有域名请求
        }
    return 'http://localhost:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async ctx => {
    ctx.body = 'Hello Koa';
})
app.listen(3000, ()=>{
    console.log('Server starting in port 3000');
})