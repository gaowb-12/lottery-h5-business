<template>
	<view class="box">
		<nav-bottom :current="2"></nav-bottom>
		<cmd-nav-bar title="统计" :back="true" font-color="#fff" background-color="#515ffb" @rightText="rightText"
			right-text="刷新">
		</cmd-nav-bar>
		<view  style="margin-top: 30upx;">
			<!-- type = 'datetimerange' 加上时分秒 -->
			<uni-datetime-picker type="datetimerange" @change="change"  @type="top"/>
		</view>
		<view class="zhjx">
			<view class="zhjx_item">
				<text>{{totalOutTicketPrice}}</text>
				<text>出票总金额</text>
			</view>
			<view class="line"></view>
			<view class="zhjx_item">
				<text>{{totalWinningPrice}}</text>
				<text>中奖总金额(已派奖)</text>
			</view>
		</view>
		<view class="dz_class">
			<text class="title">对账汇总</text>
			<view class="cz_class">
				<view class="cz_item" @click="navClick('/pages/counts/statisList')"> 
					<view class="cz_item_s">
						<image class="cz_item_s_image1" src="../../static/images/statics/icon_xj.png"></image>
						<text class="cz_tyetx1">充值总金额</text>
					</view>
					<view class="cz_item_s">
						<text class="cz_tyetx2">{{totalRechargePrice}}</text>
						<image class="cz_item_s_image2" src="../../static/images/statics/xiayibu.png"></image>
					</view>
				</view>
				<view class="cz_item" style="margin-top: 30rpx;" @click="navClick('/pages/counts/statisList')">
					<view class="cz_item_s">
						<image class="cz_item_s_image1" src="../../static/images/statics/icon_xj.png"></image>
						<text class="cz_tyetx1">提现总金额</text>
					</view>
					<view class="cz_item_s">
						<text class="cz_tyetx3">{{totalWithdrawalPrice}}</text>
						<image class="cz_item_s_image2" src="../../static/images/statics/xiayibu.png"></image>
					</view>
				</view>
			</view>
		</view>

		<view class="dz_class" style="margin-top: 30rpx;">
			<text class="title">加扣款统计</text>
			<view class="cz_class1">
				<view class="zhjx_item1"  @click="navClick('/pages/counts/statisList')">
					<text>加款金额</text>
					<text class="cz_tyetx2">+{{totalAddFundsPrice}}</text>
				</view>
				<view class="zhjx_item2"  @click="navClick('/pages/counts/statisList')">
					<text>扣款金额</text>
					<text class="cz_tyetx3">{{totalDeductionPrice}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUser,
		getShopCount,
	} from "@/api/user.js"
	export default {
		computed: {
		},
		data() {
			return {
				user:{},
				defaultData: {},
				indexT: 0,
				//查询条件
				queryParam: {
					startTime: "",
					endTime: "",
					tenantId:0
				},
				totalDeductionPrice:0,	//扣款总金额
				totalOutTicketPrice:0,	//出票总金额
				totalRechargePrice:0,	//充值总金额
				totalWinningPrice:0,	//中奖总金额
				totalAddFundsPrice:0, 	//加款总金额
				totalWithdrawalPrice:0,	//提现总金额
			}
		},
		onLoad(e) {
			console.log(e);
			if(e){
				this.queryParam.tenantId = e.tenantId 
			}
			this.init();
		},
		methods: {
			rightText(){
				this.init();
			},
			
			change(option) {
				this.queryParam.startTime = option[0];
				this.queryParam.endTime = option[1];
				this.datas = {};
				this.init()
			},
			navClick(url) {
				let item = JSON.stringify(this.queryParam)
				uni.setStorageSync('queryParam',item)
				uni.navigateTo({
					url: "/pages/counts/statisList?tenantId=" + this.queryParam.tenantId
				});
			},
			//初始化事件
			init() {
				uni.showLoading();
				getShopCount(this.queryParam).then(res => {
					this.totalDeductionPrice = res.totalDeductionPrice
					this.totalOutTicketPrice= res.totalOutTicketPrice
					this.totalRechargePrice= res.totalRechargePrice
					this.totalWinningPrice= res.totalWinningPrice
					this.totalAddFundsPrice= res.totalAddFundsPrice
					this.totalWithdrawalPrice= res.totalWithdrawalPrice
					setTimeout(function() {
						uni.hideLoading();
					}, 500);
				})
			}
			
		}
	}
</script>

<style>
	page {
		background-color: #f6f5f4;
	}
	
	/deep/.uni-calendar__content {
		margin-bottom: 50px;
	}
		
	.time {
		width: 30rpx;
		height: 30rpx;
	}

	.clrea {
		width: 30rpx;
		height: 30rpx;
	}

	.top {
		display: flex;
		flex-direction: row;
		font-size: 28rpx;
		color: black;
		border: 1rpx solid #999999;
	}

	.sdate {
		display: flex;
		flex-direction: row;
		padding: 20rpx;
		flex: 1;
	}

	.textcel {
		width: 45%;
		text-align: center;
		color: #555555;
		font-size: 28rpx;
	}

	.zhjx {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		border-radius: 30px;
		background: linear-gradient(91deg, #8D68FF 5.05%, #2E58FF 104.36%);
		margin: 30rpx;
		padding: 40rpx 20rpx;
		border-start-start-radius: 20rpx;
		border-start-end-radius: 20rpx;
		color: white;
	}

	.zhjx_item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 45%;
	}

	.zhjx_item text:nth-child(odd) {
		font-size: 38rpx;
		font-weight: 800;
		margin-top: 20rpx;
		margin-bottom: 10rpx;
	}

	.zhjx_item text:nth-child(even) {
		font-size: 28rpx;
		margin-bottom: 10rpx;
	}

	.line {
		width: 4rpx;
		height: 60rpx;
		background-color: white;
	}

	.dz_class {
		display: flex;
		flex-direction: column;
		margin: 0rpx 30rpx;
	}

	.title {
		font-size: 30rpx;
		color: #555555;

	}

	.cz_class {
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 30rpx 20rpx;
		margin-top: 20rpx;
		border-radius: 20rpx;
		/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
		box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.4);
	}

	.cz_item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.cz_item_s {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

	}

	.cz_item_s_image1 {
		width: 35rpx;
		height: 35rpx;
		margin-right: 10rpx;
	}

	.cz_item_s_image2 {
		width: 35rpx;
		height: 35rpx;
		margin-left: 10rpx;
	}

	.cz_tyetx1 {
		font-size: 28rpx;
		color: black;
	}

	.cz_tyetx2 {
		font-size: 38rpx;
		color: red;
		font-weight: 800;
	}

	.cz_tyetx3 {
		font-size: 38rpx;
		color: #08adff;
		font-weight: 800;
	}
	.cz_class1 {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		background-color: white;
		padding: 30rpx 20rpx;
		margin-top: 20rpx;
		border-radius: 20rpx;
		/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
		box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.4);
	}
	.zhjx_item1 {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 45%;
	}
	
	.zhjx_item1 text:nth-child(odd) {
		font-size: 32rpx; 
		margin-top: 20rpx;
		margin-bottom: 10rpx;
		color: red;
	}
	 .zhjx_item2 {
	 	display: flex;
	 	flex-direction: column;
	 	justify-content: center;
	 	align-items: center;
	 	width: 45%;
	 }
	 
	 .zhjx_item2 text:nth-child(odd) {
	 	font-size: 32rpx; 
	 	margin-top: 20rpx;
	 	margin-bottom: 10rpx;
	 	color: #08adff;
	 }
	 
	 .uni-calendar__content-mobile{
		 margin-bottom: 50px;
	 }
	/deep/ .uni-date__x-input {
		 font-size: 24rpx !important;
	 }
</style>