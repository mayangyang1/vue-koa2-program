<template>
    <div class="container">
        <div class="search-bar">
            <van-row>
                <van-col class="search-icon" span="3">
                    <img width="70%" :src="locationIcon" alt="">
                </van-col>
                <van-col class="serach-input" span="16">
                    <input placeholder="查找" type="text">
                </van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
        <div class="swiper-area">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index" >
                    <img v-lazy="banner.image" width="100%" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="type-bar">
            <div v-for="(cate, index) in category" :key="index">
                <img v-lazy="cate.image" width="90%" alt="">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <div class="adBanner">
            <img v-lazy="adBannerUrl" width="100%" alt="">
        </div>
        <div class="recommend-area">
            <div  class="recommend-title">商品推荐</div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiperSlide v-for="(item, index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%">
                            <div>{{item.goodsName}}</div>
                            <div>¥{{item.mallPrice | moneyFilter}}</div>
                        </div>
                    </swiperSlide>
                </swiper>
            </div>
        </div>
        <!--floor one area-->
        <floor-component :floorTitle="floorName.floor1" :floorData="floor1"></floor-component>
        <floor-component :floorTitle="floorName.floor2" :floorData="floor2"></floor-component>
        <floor-component :floorTitle="floorName.floor3" :floorData="floor3"></floor-component>
        <!-- Hot Area -->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <van-list :gutter="20">
                    <van-row gutter="20">
                        <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
                           <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import {mainHost} from '@/assets/apiList/index.js'
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import floorComponent from '../component/floorComponent'
import {toMoney} from '@/filter/moneyFilter.js'
import goodsInfo from '../component/goodsInfoComponent'
    export default {
        components: {
            swiper,
            swiperSlide,
            floorComponent,
            goodsInfo,
        },
        data() {
            return {
                locationIcon: require('../../assets/images/location.png'),
                category:[],
                bannerPicArray: [],
                adBannerUrl: '',
                recommendGoods: [],
                swiperOption: {
                   slidesPerView:3, //显示屏数
                },
                floor1:[],
                floor2:[],
                floor3:[],
                floorName: {},
                hotGoods: [],
            }
        },
        filters: {
            moneyFilter(money) {
                return toMoney(money);
            }
        },
        methods:{
            getShoppingMallData() { //获取商品首页数据
                const that = this;
                axios({
                    url: mainHost + 'shoppingMall/index',
                    method: 'get'
                }).then(response => {
                    console.log(response);
                    var shoppingMall = response.data.data;
                    that.category = shoppingMall.category;
                    that.bannerPicArray = shoppingMall.slides;
                    that.adBannerUrl = shoppingMall.advertesPicture.PICTURE_ADDRESS;
                    that.recommendGoods = shoppingMall.recommend;
                    that.floor1 = shoppingMall.floor1;
                    that.floor2 = shoppingMall.floor2;
                    that.floor3 = shoppingMall.floor3;
                    that.floorName = shoppingMall.floorName;
                    that.hotGoods = shoppingMall.hotGoods;
                }).catch(error => {
                    console.log(error);
                })
            }
        },
        created() {
            this.getShoppingMallData();
        }
    }
</script>

<style scoped>
.container{
    background-color: #f0f0f0;
}
.search-bar{
    height: 2.2rem;
    line-height: 2.2rem;
    background-color: #e5017d;
    overflow: hidden;
}
.search-icon img{
    margin-top: .2rem;
    padding-left: .3rem;
}
.serach-input input{
    width: 100%;
    border: none;
    height: 1.3rem;
    border-bottom: 1px solid #fff !important;
    background-color: #e5017d;
    color: #fff;
    font-size: .6rem;
}
.swiper-area{
    width: 20rem;
    overflow: hidden;
    clear: both;
    max-height: 10rem;

}
.type-bar{
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    font-size: 12px;
    background-color: #fff;
    border-radius: .3rem;
    margin:0 .3rem .3rem .3rem;
}
.type-bar div{
    padding: .4rem;
    text-align: center;
    flex: 1;
}

.recommend-area{
    background-color: #fff;
    margin-top: .3rem;
}
  .recommend-title{
    border-bottom:1px solid #eee;
    font-size:14px;
    padding:.2rem;
    color:#e5017d;
}
  .recommend-body{
    border-bottom: 1px solid #eee;
}
 
.recommend-item{
    width:99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
}

.hot-area{
    text-align: center;
    font-size:14px;
    height: 1.8rem;
    line-height:1.8rem;
}
</style>