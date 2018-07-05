<template>
    <div>
        <van-row class="search-bar">
            <van-col class="search-icon" span="3">
                <img width="80%" :src="locationIcon" alt="">
            </van-col>
            <van-col class="serach-input" span="16">
                <input placeholder="查找" type="text">
            </van-col>
            <van-col span="5">
                <van-button size="mini">查找</van-button>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                locationIcon: require('../assets/images/location.png'),
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
    padding-top: .2rem;
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
</style>