<template>
<div>
    <div class="navbar-div">
        <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
    </div>
    <div class="topimage-div">
        <img :src="goodsInfo.IMAGE1" width="100%"/>
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
    <div>
        <van-tabs  swipeable sticky >
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL">
          </div>
        </van-tab>
        <van-tab title="评价">
            正在制作中
        </van-tab>
        </van-tabs>
    </div>
    <div class="goods-bottom">
        <div>
            <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
        </div>
        <div>
            <van-button size="large" type="danger">直接购买</van-button>
        </div>
    </div>
</div>
    
</template>
<script>
import axios from 'axios';
import { Toast } from 'vant';
import url from '@/serviceAPI.config.js';
import {toMoney} from '@/filter/moneyFilter.js';
export default {
    data() {
        return {
            goodsId:'775e575ce28a4f89b1dfe2c99eb08ae7',
            goodsInfo: {}, //详细数据
        }
    },
    created() {
        this.goodsId = this.$route.query.goodsId? this.$route.query.goodsId : this.$route.params.goodsId;
        console.log(this.goodsId)
        this.getInfo();
    },
    filters:{
        moneyFilter(money){
            return toMoney(money)
        }  
    },
    methods: {
        getInfo() {
            axios({
                url: url.getDetailGoodsInfo,
                method: 'post',
                data:{
                    goodsId: this.goodsId
                }
            }).then(response =>{
                console.log(response);
                if(response.data.code === 200 && response.data.message) {
                    this.goodsInfo = response.data.message 
                }else{
                    Toast('服务器错误，数据取得失败')
                }
            }).catch(error=>{
                console.log(error);
            })
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        addGoodsToCart() {
            //去除购物车里的商品数据
            const that = this;
            let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : [];

            let isHaveGoods = cartInfo.find(cart => {
                if(cart.goodsId == that.goodsId) {
                    return true;
                }
                
            })
            if(!isHaveGoods) {
                let newGoodsInfo = {
                    goodsId: this.goodsInfo.ID,
                    Name: this.goodsInfo.NAME,
                    price: this.goodsInfo.PRESENT_PRICE,
                    image: this.goodsInfo.IMAGE1,
                    count:1
                }
                cartInfo.push(newGoodsInfo);
                localStorage.cartInfo=JSON.stringify(cartInfo) //操作本地数据
                Toast.success('添加成功')
            }else{
                Toast.success('已有此商品');
            }
            this.$router.push({name: 'Cart'}) //跳转到购物车页面
        }
    }
}
</script>

<style scoped>
    .detail{
     font-size:0px;
    }
    .goods-name{
        background-color: #fff;
    }
    .goods-price{
        background-color: #fff;
    }
    .goods-bottom{
        position: fixed;
        bottom:0px;
        left:0px;
        background-color: #FFF;
        width:100%;
        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
    }
    .goods-bottom > div{
        flex:1;
        padding:5px;
    }
</style>


