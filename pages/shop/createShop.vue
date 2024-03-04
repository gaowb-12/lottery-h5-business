<template>
	<view class="box">
		<nav-bar :title="'创建店铺'" :back="true" style="margin-bottom: 50px;"></nav-bar>
		<view class="form_box">
			<u-form :model="form" ref="uForm" label-width="100">
				<u-form-item label="店铺名称" ><u-input v-model="form.name" /></u-form-item>
				<u-form-item label="余额"><u-input v-model="form.balance" /></u-form-item>
				<u-form-item label="扣款比例"><u-input v-model="form.shop_rate" /></u-form-item>
				<u-form-item label="店铺logo">
					<view class="add_i">
						<image :src="form.logo?form.logo:'/static/images/personal/icon_add.png'" style="width: 300upx;height:300upx;" @click="showActionSheet(1)">
						</image>
					</view>
				</u-form-item>
				<u-form-item label="后台用户名"><u-input v-model="form.sysUsername" /></u-form-item>
				<u-form-item label="后台密码"><u-input v-model="form.sysPassword" /></u-form-item>
				<!-- <u-form-item label="支付密码"><u-input v-model="form.shop_rate" /></u-form-item> -->
				<u-form-item label="APP手机号"><u-input v-model="form.appPhone" /></u-form-item>
				<u-form-item label="APP密码"><u-input v-model="form.appPassword" /></u-form-item>
			</u-form>
		</view>
		<u-button @click="submit" style="background-color: #515ffb;color:#fff;">提交</u-button>
	</view>
</template>

<script>
	import {
		shopList,
		createShop
	} from '@/api/shop.js'
	import ajax from 'ajax'
	import cfg from '@/util/environment.js';
	export default {
		onShow() {

		},
		data() {
			return {
				form: {
					name:"",
					balance:0,
					shop_rate:0.00,
					logo:"",
					payPwd:"123456",
					sysUsername:"",
					sysPassword:"",
					appPhone:"",
					appPassword:""
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
			
		},
		methods: {
			showActionSheet(index) {
				var that = this;
				uni.chooseImage({
					count: 1,
					sourceType: ['相机', '相册'], //拍照或相册
					sizeType: ['compressed', 'original'], //压缩或原图
					success: (res) => {
						uni.showLoading();
						var tempPath = res.tempFilePaths[0]
						uni.uploadFile({
							url: cfg.BASE_API + "/file/upload",
							filePath: tempPath,
							name: 'file',
							header: {
								'x-access-token': uni.getStorageSync("vue_authtoken"),
								'X-Sys': 1,
								'X-User': uni.getStorageSync("admin_user"),
							},
							success: (uploadFileRes) => {
								uni.hideLoading();
								if (uploadFileRes.statusCode == 200) {
									this.form.logo = (JSON.parse(uploadFileRes.data)).url;
								}
							},
							fail: (res) => {
								uni.hideLoading();
								console.log("上传失败==" + JSON.stringify(res));
							}
						})
			
					}
				})
			},
			submit(){
				uni.showLoading();
				if(this.form.name==""){
					uni.showToast({
						title: "请输入店铺名称",
						icon: "none"
					})
					return false
				}
				
				if(this.form.logo==""){
					uni.showToast({
						title: "请上传店铺logo",
						icon: "none"
					})
					return false
				}
				if(this.form.sysUsername==""){
					uni.showToast({
						title: "请输入后台用户名",
						icon: "none"
					})
					return false
				}
				if(this.form.sysPassword==""){
					uni.showToast({
						title: "请输入后台密码",
						icon: "none"
					})
					return false
				}
				if(this.form.appPhone==""){
					uni.showToast({
						title: "请输入店铺端登陆手机号",
						icon: "none"
					})
					return false
				}
				if(this.form.appPassword==""){
					uni.showToast({
						title: "请输入店铺端登陆密码",
						icon: "none"
					})
					return false
				}
				createShop(this.form).then(res=>{
					if(res.success){
						uni.hideLoading();
						uni.showToast({
							title: "创建成功",
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