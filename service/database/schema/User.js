const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

let ObjectId = Schema.Types.ObjectId //声明object类型
let SALT_WORK_FACTOR = 10; //定义加密密码强度

//创建我们的 Schema
const userSchema = new Schema({
    UserId: ObjectId,
    userName: {unique: true, type:String},
    password: String,
    createAt: {type:Date, default:Date.now()},
    lastLoginAt: {type:Date, default: Date.now()}
},{
    collection: "user"
})
userSchema.pre('save', function(next) {
    let user = this;
    //进行加密
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, function (err, hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
          next();
        })

    })
    
})
userSchema.methods = {
    //密码对比的方法
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if(!err){
                    resolve(isMatch);
                }else{
                    reject(err);
                }
            })
        })
    }
}

//发布模型
mongoose.model('User', userSchema);