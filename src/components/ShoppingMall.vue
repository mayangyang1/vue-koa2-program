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
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data() {
            return {
                locationIcon: require('../assets/images/location.png'),
                category:[],
                bannerPicArray: [],
                adBannerUrl: ''
            }
        },
        methods:{
            getShoppingMallData() { //获取商品首页数据
                const that = this;
                axios({
                    url: 'https://www.easy-mock.com/mock/5b3deb59b4180c1de2924a98/example/shoppingMall/index',
                    method: 'get'
                }).then(response => {
                    console.log(response);
                    var shoppingMall = response.data.data;
                    that.category = shoppingMall.category;
                    that.bannerPicArray = shoppingMall.slides;
                    that.adBannerUrl = shoppingMall.advertesPicture.PICTURE_ADDRESS
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
</style>