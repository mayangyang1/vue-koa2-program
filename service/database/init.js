const mongoose = require('mongoose');
const db = "mongodb://localhost/simle-db";

mongoose.Promise = global.Promise;

exports.connect = () => {
    //链接数据库
    mongoose.connect(db);

    let maxConnectTimes = 0;

    return new Promise((resolve, reject) => {
        //增加数据库链接的监听
        mongoose.connection.on('disconnected', () => { //监听 链接失败
            console.log('*******数据库断开**********')
            if(maxConnectTimes < 3) {
                maxConnectTimes ++ ;
                //进行重连
                mongoose.connect(db);
            }else{
                reject();
                throw new Error('数据库出现问题，程序无法搞定，请人为修理.......');
            }
            
        })

        //数据库出现错误时
        mongoose.connection.on('error', err => {
            console.log('********数据库错误*******');
            if(maxConnectTimes < 3) {
                maxConnectTimes ++ ;
                //进行重连
                mongoose.connect(db);
            }else {
                reject();
                throw new Error('数据库出现问题，程序无法搞定，请人为修理.......');
            }
            
        })

        //链接打开时
        mongoose.connection.once('open', () => {
            console.log('MongoDB Connected Successfully')
            resolve();
        })
    })

    
}