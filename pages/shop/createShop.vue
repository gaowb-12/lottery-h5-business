<template>
	<view class="box">
		<nav-bar :title="'创建店铺'" :back="true" style="margin-bottom: 50px;"></nav-bar>
		<nav-bottom :current="10"></nav-bottom>
		<view class="form_box">
			<u-form :model="form" ref="uForm" label-width="100">
				<u-form-item label="用户名" ><u-input v-model="form.username" /></u-form-item>
				<u-form-item label="昵称"><u-input v-model="form.name" /></u-form-item>
				<u-form-item label="密码"><u-input v-model="form.password" /></u-form-item>
				<!-- <u-form-item label="扣款比例"><u-input v-model="form.shopRate" /></u-form-item>
				<u-form-item label="等级区间"><u-input type="number" inputAlign="center" v-model="form.startGrade" /><u--text align="center" size="20" style="flex: 0.3;" text="-"></u--text><u-input type="number" inputAlign="center" v-model="form.endGrade" /></u-form-item>
				
				<u-form-item label="店铺logo">
					<view class="add_i">
						<image :src="form.logo?form.logo:'/static/images/personal/icon_add.png'" style="width: 300upx;height:300upx;" @click="showActionSheet(1)">
						</image>
					</view>
				</u-form-item>
				<u-form-item label="后台用户名"><u-input v-model="form.sysUsername" /></u-form-item>
				<u-form-item label="后台密码"><u-input v-model="form.sysPassword" /></u-form-item> -->
				<!-- <u-form-item label="支付密码"><u-input v-model="form.shop_rate" /></u-form-item> -->
				<!-- <u-form-item label="APP手机号"><u-input v-model="form.appPhone" /></u-form-item>
				<u-form-item label="APP密码"><u-input v-model="form.appPassword" /></u-form-item> -->
			</u-form>
		</view>
		<u-button @click="submit" style="background-color: #515ffb;color:#fff;">提交</u-button>
	</view>
</template>

<script>
	import {
		createShopX
	} from '@/api/shop.js'
	import ajax from 'ajax'
	import cfg from '@/util/environment.js';
	export default {
		onShow() {

		},
		data() {
			return {
				form: {
					username:'',
					name: '',
					password:''
					// startGrade:0,
					// endGrade:100,
					// name:"",
					// balance:0,
					// shopRate:0.00,
					// logo:"",
					// payPwd:"123456",
					// sysUsername:"",
					// sysPassword:"",
					// appPhone:"",
					// appPassword:""
				},
				//店铺信息
				// login: {
				// 	username: '', //手机号
				// 	password: '', //密码
				// },
				// btnDisabled: false,
				// show: false,
				// columns: [],
				// text: '',
				// action: 'http://www.example.com/upload',
				// fileList: []
			};
		},
		onLoad() {
			
		},
		methods: {
			isAllDigits(str) {
			    // 定义只包含数字的正则表达式
			    var regex = /^\d+$/;
			    return regex.test(str);
			},
			// showActionSheet(index) {
			// 	var that = this;
			// 	uni.chooseImage({
			// 		count: 1,
			// 		sourceType: ['相机', '相册'], //拍照或相册
			// 		sizeType: ['compressed', 'original'], //压缩或原图
			// 		success: (res) => {
			// 			uni.showLoading();
			// 			var tempPath = res.tempFilePaths[0]
			// 			uni.uploadFile({
			// 				url: cfg.BASE_API + "/file/upload",
			// 				filePath: tempPath,
			// 				name: 'file',
			// 				header: {
			// 					'x-access-token': uni.getStorageSync("vue_authtoken"),
			// 					'X-Sys': 1,
			// 					'X-User': uni.getStorageSync("admin_user"),
			// 				},
			// 				success: (uploadFileRes) => {
			// 					uni.hideLoading();
			// 					if (uploadFileRes.statusCode == 200) {
			// 						this.form.logo = (JSON.parse(uploadFileRes.data)).url;
			// 					}
			// 				},
			// 				fail: (res) => {
			// 					uni.hideLoading();
			// 					console.log("上传失败==" + JSON.stringify(res));
			// 				}
			// 			})
			
			// 		}
			// 	})
			// },
			submit(){
				debugger
				uni.showLoading();
				if(this.form.username==""){
					uni.showToast({
						title: "请输入用户名",
						icon: "none"
					})
					return false
				}
				if(this.isAllDigits(this.form.username)){
					uni.showToast({
						title: "用户名请输入字符",
						icon: "none"
					})
					return false
				}
				
				if(this.form.name==""){
					uni.showToast({
						title: "请输入昵称",
						icon: "none"
					})
					return false
				}
				if(this.form.password==""){
					uni.showToast({
						title: "请输入密码",
						icon: "none"
					})
					return false
				}
				createShopX(this.form).then(res=>{
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
		padding:10upx;
		position: relative;
		background: #fff;
	}

</style>