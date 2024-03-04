<template>
	<view class="box">

		<image src="../../static/images/user/logo.png" mode='aspectFit' class="nx-logo"></image>
		<view class="nx-form">
			<input maxlength="11" class="nx-input" placeholder="请输入管理员账户" v-model="login.username" />
			<input class="nx-input" password placeholder="请输入密码" v-model="login.password" />
			<!-- <input class="nx-input" placeholder="选择店铺" @focus="inputBtn" v-model="text" /> -->
			<navigator hover-class="none" class="nx-label"></navigator>
			<button :disabled="btnDisabled" class="nx-btn" @tap="loginFunction">立即登录</button>
			<navigator open-type="redirect" hover-class="none" class="nx-label"></navigator>
			<u-picker @cancel="show=false" @confirm="confirm" :show="show" closeOnClickOverlay :columns="columns"
				keyName="name" @close="show=false"></u-picker>
		</view>
	</view>
</template>

<script>
	import {
		login
	} from '@/api/user.js'
	import {
		setAuthtoken,
		setUserInfo,
		setadminUser,
		setExternalLogintoken
	} from '@/util/auth.js'
	import {
		shopList
	} from '@/api/shop.js'
	import ajax from 'ajax'
	export default {
		onShow() {

		},
		data() {
			return {
				//店铺信息
				shop: {},
				login: {
					username: '', //手机号
					password: '', //密码
				},
				btnDisabled: false,
				show: false,
				columns: [],
				text: '',
			};
		},
		onLoad() {
			//如果登录过的直接显示从缓存中取出店铺信息的logo
			this.shop = uni.getStorageSync("shop");
			console.log(this.shop, '测试');
			//判断域名是https还是http,如果是https这里设置http会出现错误
			var ishttps = "https:" == document.location.protocol ? true : false;
			var reqUrl;
			if (ishttps) {
				reqUrl = "https://t.me993km7.com/time";
			} else {
				reqUrl = "http://t.me993km7.com/time";
			}
			//获取用户的IP地址    http://t.me993km7.com/time
			ajax.get(reqUrl).then((res) => {
				uni.setStorageSync("x-access-ip", res.data.ip);
			});
		},
		methods: {
			confirm(data) {
				//点击确定进行赋值操作
				this.text = data.value[0].name
				this.show = false;
				this.shop = data.value[0]
			},
			inputBtn() {
				this.columns = []
				if (this.login.username != "") {
					shopList(this.login).then(res => {
						this.columns.push(res.voList)
					})
					this.show = true;
				} else {
					uni.showToast({
						title: '请先输入账户',
						icon: 'none'
					});
					this.show = false;
				}
				//禁止键盘弹出
				uni.hideKeyboard()
			},
			//当前登录按钮操作
			async loginFunction() {
				if (!this.login.username) {
					uni.showToast({
						title: '请输入账户',
						icon: 'none'
					});
					return;
				}
				if (!this.login.password) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					});
					return;
				}
				// if (!this.text) {
				// 	uni.showToast({
				// 		title: '请选择店铺',
				// 		icon: 'none'
				// 	});
				// 	return;
				// }
				this.btnDisabled = true;
				uni.showLoading({
					title: '登录中......'
				})
				//设置店铺信息到缓存中
				uni.setStorageSync("shop", this.shop)
				setadminUser(this.login.username)
				await login(this.login).then(res => {
					if (res.success) {
						setAuthtoken(res.token)
						setTimeout(() => {
							uni.redirectTo({
								url: "../order/lotteryOrder"
							});
							uni.hideLoading();
							this.btnDisabled = false;
						}, 200)
					} else {
						uni.hideLoading();
						this.btnDisabled = false;
					}
				}).catch(err => {
					uni.hideLoading();
					this.btnDisabled = false;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.box {
		padding: 0 100upx;
		position: relative;
		background: #fff;
		height: 100%;
		overflow: hidden;
	}

	.nx-logo {
		width: 30%;
		height: 160upx;
		display: block;
		margin: 60rpx auto;
	}

	.nx-input {
		background: #e2f5fc;
		margin-top: 30upx;
		border-radius: 100upx;
		padding: 20upx 40upx;
		font-size: 32upx;
		box-sizing: content-box;
	}


	.nx-label {
		padding: 60upx 0;
		text-align: center;
		font-size: 30upx;
		color: #a7b6d0;
	}

	.nx-btn {
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 32upx;
		background: #2979FF
	}

	.nx-btn:after {
		border: 0;
	}

	/*按钮点击效果*/
	.nx-btn.button-hover {
		transform: translate(1upx, 1upx);
	}
</style>