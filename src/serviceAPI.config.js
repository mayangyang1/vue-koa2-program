const BASEURL = 'https://www.easy-mock.com/mock/5b3ebc4304502462c6feb5ad/ownerProgram';

const LOCALURL = "http://localhost:3000/"

const URL = {
    getShoppingMallInfo: BASEURL + '/shoppingMall/index',
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    registerUser: LOCALURL + 'user/register', //用户注册接口
    login: LOCALURL + 'user/login', //用户注册接口
}

export default URL;