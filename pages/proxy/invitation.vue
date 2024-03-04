<template>
	<view class="box">

		<nav-bar :title="'销售管理'" :back="true"></nav-bar>
		<view>
			<u-search @search="init" shape="square" margin="16px" height="40" animation :showAction="false"
				@clear="init" placeholder="请输入用户昵称或者手机号" v-model="queryParam.param"></u-search>
		</view>
		<view class="invitation">
			<uni-datetime-picker type="datetimerange" @change="change" />
		</view>
		<view
			style="margin: 15px;display: flex;align-items: center;justify-content: space-between;margin-bottom: 20px;">
				<!-- <p style="font-size: 14px;">销售<br><span class="font">{{dataList.length}}</span>个</p> -->
				<p style="font-size: 14px;">总投注<br><span class="font">{{totalBetting | decimalFormat}}</span>元</p>
				<p style="font-size: 14px;">总充值<br><span class="font">{{totalRecharge | decimalFormat}}</span>元</p>
				<p style="font-size: 14px;">总提现<br><span class="font">{{totalWithdrawal | decimalFormat}}</span>元</p>
				<p style="font-size: 14px;">总派奖<br><span class="font">{{totalAward | decimalFormat}}</span>元</p>
		</view>
		<view class="table">
			<u-empty icon="http://cdn.uviewui.com/uview/empty/data.png" :show="dataList.length<=0" mode="data"
				text="暂无销售"></u-empty>
			<uni-card v-for="(item,index) in dataList" :key="index" :border="true" :title="item.nickname"
				:style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]"
				:sub-title="item.createTime|formatDate(that)"
				:extra="'总金额：'+parseFloat(item.gold+item.price).toFixed(2)+'元'" :thumbnail="item.avatar"
				>
				<view class="font">手机号：<span class="uni-body">{{item.phone}}</span></view>
				<!-- <view>彩金余额：<span class="uni-body">{{item.gold}} 元</span></view> -->
				<!-- <view>奖金余额：<span class="uni-body">{{item.price}} 元</span></view> -->
				<view class="pb">今日投注：<span class="uni-body">{{item.todayBetting}} 元</span></view>
				<view class="pb">总投注：<span class="uni-body">{{item.totalBetting}} 元</span></view>
				
				<view class="pb">今日充值：<span class="uni-body">{{item.todayRecharge}} 元</span></view>
				<view class="pb">总充值：<span class="uni-body">{{item.totalRecharge}} 元</span></view>
				
				<view class="pb">今日提现：<span class="uni-body">{{item.todayWithdrawal}} 元</span></view>
				<view class="pb">总提现：<span class="uni-body">{{item.totalWithdrawal}} 元</span></view>
				
				<view class="pb">今日出票：<span class="uni-body">{{item.todayOutTicket}} 元</span></view>
				<view class="pb">总出票：<span class="uni-body">{{item.totalOutTicket}} 元</span></view>
				
				<view class="pb">今日派奖：<span class="uni-body">{{item.todayAward}} 元</span></view>
				<view class="pb">总派奖：<span class="uni-body">{{item.totalAward}} 元</span></view>
				
				<view class="pb" style="color: red;" @click="goInvitations(item)">他的客户：<span class="uni-body">{{item.countPersons}} 人</span></view>
				<view class="pb" style="color: red;" @click="del(item)">删除销售<span class="uni-body"></span></view>
			</uni-card>
		</view>
	</view>
</template>


<script>
	import {
		agent,
		agentSalesperson,
		delSalePerson
	} from '@/api/user.js'
	export default {
		data() {
			return {
				that: this,
				queryParam: {
					param: "",
					startTime: "",
					endTime: "",
					shoperId:""
				},
				dataList: [],
				
				totalBetting: 0,
				totalRecharge: 0,
				totalWithdrawal: 0,
				totalAward: 0,
			}
		},
		onPullDownRefresh() {
			this.init();
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 500);
		},
		filters: {
			formatDate(data, that) {
				if (null == data) {
					return null;
				}
				return that.globalUtil.dateTimeFormat(data)
			},
			decimalFormat(value) {
			 return value.toFixed(2);
			}
		},
		methods: {
			del(item){
				uni.showModal({
				    title: '删除',
				    content: '确认删除销售 : '+item.nickname+' ? ',
				    success: function (res) {
				        if (res.confirm) {
				            delSalePerson({'nickname':item.nickname}).then(res => {
								if(res.success){
									uni.showToast({
										title: '操作成功！',
										icon: 'none'
									});
									
									setTimeout(function() {
										location.reload()
										}, 1000);
								}
								
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				})
			},
			change(option) {
				this.queryParam.startTime = option[0];
				this.queryParam.endTime = option[1];
				this.init()
			},
			init() {
				uni.showLoading();
				this.dataList = [];
				this.totalBetting=0;
				this.totalRecharge=0;
				this.totalWithdrawal=0;
				this.totalAward=0;
				agentSalesperson(this.queryParam).then(res => {
				// agent(this.queryParam).then(res => {
					this.dataList = res.voList
					this.dataList.map(item => {
						this.totalBetting += item.totalBetting
						this.totalRecharge += item.totalRecharge
						this.totalWithdrawal += item.totalWithdrawal
						this.totalAward += item.totalAward
					})
					uni.hideLoading();
				})
			},
			details(item) {
				uni.navigateTo({
					url: "/pages/order/lotteryOrder?uid=" + item.id
				});
			},
			goInvitations(item) {
				uni.navigateTo({
					url: "/pages/proxy/saleInvitation?uid=" + item.id
				});
			},
		},
		onLoad(e) {
			this.queryParam.shoperId = e.uid;
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.uni-card__header-extra-text {
		font-size: 14px !important;
		color: #515ffb !important;
	}

	.box {
		padding-bottom: 0px;
	}

	.invitation {
		margin: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 30px;
	}

	.font {
		color: #515ffb;
	}

	/deep/.uni-date-editor--x .uni-date__icon-clear {
		position: absolute !important;
		right: 0px !important;
	}

	/deep/.uni-datetime-picker--btn,
	/deep/.uni-calendar-item--after-checked,
	/deep/.uni-calendar-item--before-checked {
		background: #515ffb !important;
	}
	
	
	.pb{
		float: left;
		min-width: 50%;
		margin: 6upx 0;
	}
	/deep/ .uni-date__x-input {
		font-size: 24rpx;
	}
</style>
