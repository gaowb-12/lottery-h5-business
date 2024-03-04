<template>
	<view class="box">
		
			<nav-bar :title="'充值'" :back="true"></nav-bar>
			<nav-bottom :current="3"></nav-bottom>
			<view class="block">
				
				<view class="content">
					<view class="amount">
						<view class="list">
							<u-row gutter="16">
								<u-col text-align="center" class="col-sty" v-for="(amount,index) in amountList"
									:key="index" @click="select(amount.price)"
									:class="{'on':amount.price == payParam.price}">
									<view>{{amount.text}}</view>
								</u-col>
							</u-row>
						</view>
					</view>
				</view>
				<u-input border="bottom" prefixIcon="rmb-circle" placeholder="请输入充值金额" type="number" v-model="price" 	clearable style="margin-top: 10px;"></u-input>
			</view>
			<view class="block" >
				<view class="title">
					选择支付方式
				</view>
				<view class="content">
					<view class="pay-list">
						<view class="row" @click="payParam.payType=0">
							<view class="left">
								<image src="@/static/images/user/alipay.png"></image>
							</view>
							<view class="center">
								支付宝支付
							</view>
							<view class="right">
								<radio :checked="payParam.payType==0" color="#515ffb" />
							</view>
						</view>
						<view class="row" @click="payParam.payType=1">
							<view class="left">
								<image src="@/static/images/user/wxpay.png"></image>
							</view>
							<view class="center">
								微信支付
							</view>
							<view class="right">
								<radio :checked="payParam.payType==1" color="#515ffb" />
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="pay" style="margin-top: 20px;">
				<view class="btn" :disabled="disabled" @click="doDeposit">立即充值</view>
				<view class="tis" style="margin-top: 20px;">
					点击立即充值，即代表您同意<view class="terms">
						《条款协议》
					</view>
				</view>
			</view>
			<view class="main">
				<view class="txt-xh1">
					<view class="tit">
						<view class="h3">
							友情提示：
						</view>
						<view class="info">
							<text>1.为防止恶意套现和洗钱，您在本平台的充值金额只能用于消费</text>
						</view>
						<view class="info">
							<text>2.本平台为店主的数字化管理工具，提现需要店主手动打款，用户资金是由店主托管和监管，如出现资金问题请及时联系店主处理与平台无关</text>
						</view>
						<view class="info">
							<text>3.如有联系不上店主需要帮助的，请在首页右上角点击投诉并描述具体情况和诉求，平台客服会协助您处理</text>
						</view>
					</view>
				</view>
			</view>
			
		
	</view>
</template>

<script>
	import {
		createOrder
	} from '@/api/payOrder.js'
	export default {
		data() {
			return {
				disabled: false,
				price: "",
				amountList: [{
					text: "50￥",
					price: 50
				}, 
				{
					text: "500￥",
					price: 500
				}, 
				{
					text: "5000￥",
					price: 5000
				},
				{
					text: "100￥",
					price: 100
				}, {
					text: "1000￥",
					price: 1000
				},  {
					text: "10000￥",
					price: 10000
				}],
				payParam: {
					price: "",
					type: "0",
					payType: "0",
				},
				userInfo: {},
			};
		},
		methods: {
			select(amount) {
				this.payParam.price = amount;
				this.price = this.payParam.price;
			},
			doDeposit() {
				if (this.payParam.payType == 1) {
					uni.showToast({
						title: '微信支付暂未开放',
						icon: 'none'
					});
					return;
				}
				if (this.payParam.price == "") {
					if (this.price == "") {
						uni.showToast({
							title: '金额不能为空',
							icon: 'none'
						});
						return;
					}
				}
				if (this.price != "") {
					this.payParam.price = this.price
				}
				if (this.payParam.price <= 0) {
					uni.showToast({
						title: '充值的金额不能低于0元',
						icon: 'none'
					});
					return;
				}
				uni.showLoading({
					title: '支付中......'
				})
				createOrder(this.payParam).then(res => {
					if (res.success) {
						location.href = res.url
						uni.hideLoading();
					}
				})
			},
		},
		onLoad() {
			let info = uni.getStorageSync("info")
			this.userInfo = info;
		},
	}
</script>

<style lang="scss" scoped>
	.box {
		background: #fff;

		.u-row {
			display: block;
			margin-left: 0px !important;
		}

		.block {
			padding: 20upx 3%;

			.title {
				width: 100%;
				font-size: 34upx;
			}

			.content {
				.my {
					width: 100%;
					height: 100upx;
					display: flex;
					align-items: center;
					font-size: 30upx;
					border-bottom: solid 1upx #eee;
				}

				.amount {
					width: 100%;

					.list {
						justify-content: space-between;
						padding: 20upx 0;

						.col-sty {
							width: 25%;
							height: 80upx;
							display: inline-flex;
							justify-content: center !important;
							align-items: center !important;
							border-radius: 10upx;
							box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.05);
							font-size: 32upx;
							background-color: #6161610d;
							margin: 0px 30rpx 30rpx 0px;
							color: 333;

							&.on {
								width: 25%;
								height: 80upx;
								border-radius: 10upx;
								box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.05);
								font-size: 32upx;
								background-color: #f1f1f1;
								color: 333;
								background: #515ffb;
								color: #fff;
							}
						}
					}
				}

				.pay-list {
					width: 100%;
					border-bottom: solid 1upx #eee;

					.row {
						width: 100%;
						height: 120upx;
						display: flex;
						align-items: center;

						.left {
							width: 100upx;
							flex-shrink: 0;
							display: flex;
							align-items: center;

							image {
								width: 80upx;
								height: 80upx;
							}
						}

						.center {
							width: 100%;
							font-size: 30upx;
						}

						.right {
							width: 100upx;
							flex-shrink: 0;
							display: flex;
							justify-content: flex-end;
						}
					}
				}
			}
		}

		.pay {
			margin: 20upx 0rpx 80rpx 0rpx;
			width: 100%;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;

			.btn {
				width: 70%;
				height: 80upx;
				border-radius: 80upx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				background: #515ffb;
				box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.2);
			}

			.tis {
				margin-top: 10upx;
				width: 100%;
				font-size: 24upx;
				display: flex;
				justify-content: center;
				align-items: baseline;
				color: #999;

				.terms {
					color: #5a9ef7;
				}
			}
		}
	}
	
	.txt-xh1 {
		padding: 0 60rpx;
	}
	
	.txt-xh1 .h3 {
		display: block;
		font-size: 24rpx;
		margin-bottom: 20rpx;
	}
	
	.txt-xh1 .info {
		display: inline-block;
		font-size: 24rpx;
		letter-spacing: 1rpx;
		margin-bottom: 15rpx;
	}
	
	.txt-xh1 .info text {
		color: #000;
	}
	
	.txt-xh1 .info {
		color: #666666;
	
	}
	
	.txt-xh1 .desc {
		font-size: 28rpx;
		color: #515ffb;
		margin-bottom: 20rpx;
		margin-top: 5rpx;
	
	}
	
	.txt-xh1 .desc text {
		margin-right: 85rpx;
	
	}
</style>
