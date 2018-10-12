const BASEURL = 'https://www.easy-mock.com/mock/5b3ebc4304502462c6feb5ad/ownerProgram';

const LOCALURL = "http://localhost:3000/"

const URL = {
    getShoppingMallInfo: BASEURL + '/shoppingMall/index',
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    registerUser: LOCALURL + 'user/register', //用户注册接口
    login: LOCALURL + 'user/login', //用户注册接口
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', //获取商品详情
    getCategoryList: LOCALURL + 'goods/getCategoryList', //获取商品大类信息
    getCategorySubList: LOCALURL + 'goods/getCategorySubList', //获取商品小类信息
    getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubId', //
}

export default URL;