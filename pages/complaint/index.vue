<template>
	<view class="content box" >
		
			<nav-bar :title="'投诉'" :back="true"></nav-bar>
			<view class="list" style="">
				
				<view class="list-call">
					
					<view>
						投诉标题：<br>
						<input class="sl-input" type="text" v-model="recover.title" placeholder="请输入标题" />
					</view>
				</view>
				
				<view class="list-call" style="margin-top: 20upx;height: 300upx;text-align: start;">
					
					<view >
						投诉内容：<br>
						<textarea v-model="recover.content" class="sl-input"  placeholder="请输入投诉内容"></textarea> 
					</view>
				</view>
				
			</view>
			<view class="button-login" @tap="change()">
				<text>提交</text>
			</view>
		
	</view>
</template>

<script>
	import {
		removeAuthtoken,
		removeUserInfo,
		removeExternalLogintoken
	} from "@/util/auth.js"
	import {
		createComplaints,
		send,
		logout,
	} from '@/api/user.js'
	var _this, js;
	export default {
		data() {
			return {
				recover: {
					title: '', //标题
					content: '', //内容
				},
				second: 0,
				showPassword: false,
				user:{}
			}
		},
		onLoad() {
			_this = this;
		},
		computed: {
			computedCode() {
				if (this.second == 0) {
					return '获取验证码';
				} else {
					if (this.second < 10) {
						return '重新获取0' + this.second;
					} else {
						return '重新获取' + this.second;
					}
				}
			}
		},
		onUnload() {
			this.clear()
		},
		methods: {
			//显示或者隐藏密码
			display() {
				this.showPassword = !this.showPassword
			},
			//清除清理器
			clear() {
				clearInterval(js)
				js = null
				this.second = 0
			},
			getcode() {
				if (!this.recover.phone) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					});
					return;
				}
				if (this.second > 0) {
					uni.showToast({
						title: "一分钟后可重新发送",
						icon: 'none'
					})
					return;
				}
				_this.second = 60;
				js = setInterval(function() {
					_this.second--;
					if (_this.second == 0) {
						_this.clear()
					}
				}, 1000)
				//请求后端发送验证码
				send({
					phone: this.recover.phone
				}).then(res => {
					if (res.success) {
						uni.hideLoading();
					}
				})
			},
			change() {
				if (!this.recover.content) {
					uni.showToast({
						title: '请输入投诉内容',
						icon: 'none'
					});
					return;
				}
				if (!this.recover.title) {
					uni.showToast({
						title: '请输入标题',
						icon: 'none'
					});
					return;
				}
				uni.showLoading();
				createComplaints(this.recover).then(res => {
					if (res.success) {
							uni.showToast({
								title: '成功！',
								icon: 'none'
							});
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/home/home',
							})
						}, 1000);
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50rpx;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}

	.list-call {
		padding: 12upx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;
	}

	.list-call .img {
		width: 40rpx;
		height: 40rpx;
	}

	.list-call .sl-input {
		margin-top: 10upx;
		flex: 1;
		text-align: left;
		font-size: 32rpx;
		margin-left: 16rpx;
	}

	.button-login {
		color: #FFFFFF;
		font-size: 16px;
		width: 90%;
		background: #515ffb !important;
		line-height: 85rpx;
		border-radius: 6px;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100rpx;
	}

	.yzm {
		color: #FF7D13;
		font-size: 24rpx;
		line-height: 64rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		width: auto;
		height: 64rpx;
		border: 1rpx solid rgba(255, 131, 30, 1);
		border-radius: 50rpx;
	}

	.yzms {
		color: #999999 !important;
		border: 1rpx solid #999999;
	}
</style>
