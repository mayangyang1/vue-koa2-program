const Router = require('koa-router');
const mongoose = require('mongoose')
let router = new Router();
router.get('/', async(ctx) => {
    ctx.body = '这是用户操作首页'
})

router.post('/register', async(ctx)=>{ //注册
    //取得model
    const User = mongoose.model('User');
    let newUser = new User(ctx.request.body);
    await newUser.save().then(() => {
        ctx.body={
            code:200,
            message:'注册成功'
        }
    }).catch(error=>{
        ctx.body={
            code:500,
            message:error
        }
    })
})

router.post('/login', async(ctx)=>{//登录
    //获取前端返回的数据
    let loginUser = ctx.request.body;
    let userName = loginUser.userName;
    let password = loginUser.password;

    //引入User的Model
    const User = mongoose.model('User');

    //查询用户是否存在，如果存在开始比对密码
    await User.findOne({userName: userName}).exec().then(async(result)=>{
        if(result) {//用户名存在 开始比对密码
            let newUser = new User() //因为是实例方法 需要new个对象；
            await newUser.comparePassword(password, result.password).then((isMatch) =>{
                
                ctx.body = {
                    code: 200,
                    message:isMatch
                }
            })
            .catch(error => {
                ctx.body = {code: 500, message: error}
            })
        }else{
            ctx.body={
                code:200,
                message:'用户名不存在'
            }
        }
    }).catch(error => {
        ctx.body={
            code: 500,
            message: error
        }
    })


})

module.exports = router;