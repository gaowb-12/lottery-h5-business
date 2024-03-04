<template>
	<view class="box">
		<nav-bar :title="'站点设置'" :back="true" style="margin-bottom: 50px;"></nav-bar>
		<view class="form_box">
			<u-form :model="form" ref="uForm" label-width="100">
				<u-form-item label="App前端地址" ><u-input v-model="form.appUrl" /></u-form-item>
				<u-form-item label="App下载地址"><u-input v-model="form.downloadUrl" /></u-form-item>
			</u-form>
		</view>
		<u-button @click="submit" style="background-color: #515ffb;color:#fff;">提交</u-button>
	</view>
</template>

<script>
	import {
		shopList,
		createShop,
		domainQuery,
		update
	} from '@/api/shop.js'
	import ajax from 'ajax'
	import cfg from '@/util/environment.js';
	export default {
		onShow() {

		},
		data() {
			return {
				form: {
					downloadUrl:"",
					appUrl:0,
					id:0
				},
				//店铺信息
				login: {
					username: '', //手机号
					password: '', //密码
				},
				btnDisabled: false,
				show: false,
				columns: [],
				text: '',
				action: 'http://www.example.com/upload',
				fileList: []
			};
		},
		onLoad() {
			this.init()
		},
		methods: {
			init(){
				domainQuery().then(res=>{
					if(res.success){
						this.form = res.voList[0]
					}
				})
			},
			submit(){
				uni.showLoading();
				update(this.form).then(res=>{
					if(res.success){
						uni.hideLoading();
						uni.showToast({
							title: "操作成功",
							icon: "none"
						})
						setTimeout(function() {
							location.reload();	
						}, 1000);
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.box {
		padding: 0 30upx;
		position: relative;
		background: #fff;
		height: 100%;
	}

</style>