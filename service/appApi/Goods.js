
const Router = require('koa-router');
let router = new Router();

const mongoose = require('mongoose');
const fs = require('fs');

router.get('/insertAllGoodsInfo', async (ctx) => { //批量插入商品详情数据到数据库
    fs.readFile('./data_json/newGoods.json', 'utf8', function(err, data) {
        data = JSON.parse(data);
        let saveCount = 0;
        const Goods = mongoose.model('Goods');
        data.map((value, index) => {
            console.log(value);
            let newGoods = new Goods(value);
            newGoods.save().then(() => {
                saveCount++;
                console.log('成功' + saveCount);
            }).catch(error=> {
                console.log('失败' + error);
            })
        })
    })
    ctx.body = '开始导入数据';
})

router.get('/insertAllCaregory', async (ctx) => { //批量插入商品大类数据到数据库
    fs.readFile('./data_json/category.json', 'utf8', function(err, data) {
        data = JSON.parse(data);
        let saveCount = 0;
        const Category = mongoose.model('Category');
        data.RECORDS.map((value, index) => {
            let newCategory = new Category(value);
            newCategory.save().then(()=> {
                saveCount++;
                console.log('成功'+ saveCount);
            }).catch(error=>{
                console.log('失败' + error);
            })
        })
    })
    ctx.body="开始倒入数据";

})

router.get('/insertAllCategorySub', async(ctx) => {//批量插入商品子类数据到数据库
    fs.readFile('./data_json/category_sub.json', 'utf8', function(err, data) {
        data = JSON.parse(data);
        let saveCount = 0;
        const CategorySub = mongoose.model('CategorySub');
        data.RECORDS.map((value, index) => {
            let newCategorySub = new CategorySub(value);
            newCategorySub.save().then(()=>{
                saveCount++;
                console.log('成功'+saveCount);
            }).catch(error=>{
                console.log('失败'+error);
            })
        })
    })
    ctx.body='开始导入数据';
})

/**
 * 获取商品详情
 * @params goodsId 商品id值
 */

 router.post('/getDetailGoodsInfo', async(ctx) =>{
     try{
        let goodsId = ctx.request.body.goodsId;
        const Goods = mongoose.model('Goods');
        let result = await Goods.findOne({
          ID: goodsId
        }).exec();
        ctx.body = {
          code: 200,
          message: result
        };
     }catch(err){
        ctx.body={code:500, message:err}
     }
     
 })

module.exports=router;