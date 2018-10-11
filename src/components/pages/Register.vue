<template>
    <div>
       <van-nav-bar
        title="用户注册"
        left-text="返回"
        left-arrow
        @click-left="goBack"
        />
        <div class="register-panel">
        <van-field
            v-model="username"
            label="用户名"
            icon="clear"
            placeholder="请输入用户名"
            required
            @click-icon="username = ''"
            :error-message="userNameErrorMessage"
        />
        <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
            :error-message="passwordErrorMessage"
        />
        <div class="register-button">
            <van-button type="primary" size="large" :loading="openLoading" @click="loginAction">马上注册</van-button>
        </div>
       </div>
    </div>
</template>
<script>
import axios from 'axios';
import url from '@/serviceAPI.config.js';
import {Toast} from 'vant';
export default {
    data() {
        return {
            username: '',
            password: '',
            openLoading: false,
            userNameErrorMessage: '',
            passwordErrorMessage: '',
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        loginAction() {
            this.checkForm() && this.axiosRegisterUser();
        },
        checkForm() {
            let isOk = true;
            if(this.username.length < 2) {
                this.userNameErrorMessage = '用户名不能小于3位';
                isOk = false;
            }else{
                this.userNameErrorMessage = '';
            }
            if(this.password.length < 6) {
                this.passwordErrorMessage = '密码不能小于6位';
                isOk = false;
            }else{
                this.passwordErrorMessage = '';
            }
            return isOk;
        },
        axiosRegisterUser() {
            this.openLoading = true;
            axios({
                url: url.registerUser,
                method: 'post',
                data: {
                    userName: this.username,
                    password: this.password
                }
            }).then(res => {
                if(res.data.code == 200) {
                    Toast.success('注册成功');
                    this.$router.push('/')
                }else{
                    Toast.fail('注册失败');
                    this.openLoading = false;
                }
            }).catch((error) => {
                console.log(error);
                Toast.fail('注册失败')
                this.openLoading = false;
            })
        }
    }
}
</script>

<style scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
</style>


