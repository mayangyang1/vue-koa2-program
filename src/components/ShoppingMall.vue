<template>
    <div>
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
                <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index" v-lazy="banner.imageUrl">
                    <img :src="banner.imageUrl" width="100%" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                locationIcon: require('../assets/images/location.png'),
                bannerPicArray: [
                    {imageUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg'},
                    {imageUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg'},
                    {imageUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'}
                ]
            }
        }
    }
</script>

<style scoped>
.search-bar{
    height: 2.2rem;
    line-height: 2.2rem;
    background-color: #e5017d;
}
.search-icon{
    line-height: 1.2rem;
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
}
</style>