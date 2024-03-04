<template>
	<!-- 购彩订单列表 -->
	<view class="box">

		<nav-bar :title="'流水统计'" :back="true"></nav-bar>
		<u-sticky bgColor="#fff" style="margin-bottom: 30px;"> 
			<u-tabs :list="lassificationcList" lineColor="#515ffb" :scrollable="false" 
				:activeStyle="{color: '#515ffb',fontWeight: 'bold',transform: 'scale(1.05)'}" @click="changeSelectBall">
			</u-tabs>
		</u-sticky>
		<!-- <view  style="margin-top: 30upx;">
			<uni-datetime-picker type="daterange" @change="change" />
		</view> -->
		<view style="padding: 10upx;color:blue;">统计 ：￥{{total}} </view>
		<view>
			<u-empty icon="http://cdn.uviewui.com/uview/empty/order.png" :show="lotteryOrderList.length<=0" mode="order"
				text="没有订单记录"></u-empty>
			
			<uni-card v-for="(item,index) in lotteryOrderList" :key="index" :border="false" :title="item.ballName"
				:style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]"
				:sub-title="item.createTime|formatDate(that)" 
				>
				
				<view v-if="stating == '0'">
					<view class="left" >
						<span>加款 | </span>
						<span>{{item.nickname}}</span>
						<span> | {{item.phone}}</span>
						<br>
						<span>{{item.createTime|formatDate(that)}}</span>
					</view>
					<view class="right">
						￥{{item.price}}
					</view>
				</view>
				<view v-if="stating == '5'">
					<view class="left" >
						<span>扣款 | </span>
						<span>{{item.nickname}}</span>
						<span> | {{item.phone}}</span>
						<br>
						<span>{{item.createTime|formatDate(that)}}</span>
					</view>
					<view class="right">
						￥{{item.price}}
					</view>
				</view>
				<view v-if="stating == '99'">
					<view class="left" >
						<span>充值 | </span>
						<span>{{item.nickname}}</span>
						<span> | {{item.phone}}</span>
						<br>
						<span>{{item.createTime|formatDate(that)}}</span>
					</view>
					<view class="right">
						￥{{item.price}}
					</view>
				</view>
				<view v-if="stating == '98'">
					<view class="left" >
						<span>提现 | </span>
						<span>{{item.nickname}}</span>
						<span> | {{item.phone}}</span>
						<br>
						<span>{{item.createTime|formatDate(that)}}</span>
					</view>
					<view class="right">
						￥{{item.price}}
					</view>
				</view>
				
				
			</uni-card>
		</view>

	</view>
</template>

<script>
	import {
		getPayOrderList,
	} from '@/api/lotteryOrder.js'
	import {
		getUser
	} from "@/api/user.js"
	export default {
		data() {
			return {
				user:{},
				that: this,
				stating:"0",
				lassificationcList: [{
					name: '加款',
					type: "0"
				}, {
					name: '扣款',
					type: "5"
				}, {
					name: '充值',
					type: "99"
				}, {
					name: '提现',
					type: "98"
				}],
				//查询条件
				queryParam: {
					type: "0",
					payType: "2",
					startTime: "",
					endTime: "",
					pageNo: 1,
					pageSize: 100,
					state:"1",
					tenantId:""
				},
				total: 0,
				//订单记录列表
				lotteryOrderList: []
			}
		},
		onPullDownRefresh() {
			this.lotteryOrderList = []
			this.init();
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 500);
		},
		filters: {
			//格式化日期
			formatDate(data, that) {
				return that.globalUtil.dateTimeFormat(data)
			},
		},
		onLoad(option) {
			    var data = uni.getStorageSync('queryParam')//取出缓存数据
				var res = JSON.parse(data)
				console.log(res, 'res123');
				if(res.startTime) {
					this.queryParam.startTime = res.startTime;
					this.queryParam.endTime = res.endTime;
				}
			if(option.tenantId != "undefined"){
				this.queryParam.tenantId = option.tenantId
			}
			this.init();
		},
		//滚动到底部进行分页事件
		onReachBottom() {
			if (this.lotteryOrderList.length < this.queryParam.pageNo * 10) {
				return;
			}
			this.queryParam.pageNo++;
			this.init();
		},
		methods: {
			
			change(option) {
				this.queryParam.startTime = option[0];
				this.queryParam.endTime = option[1];
				this.lotteryOrderList = []
				this.total = 0 
				this.init()
			},
			// tab切换事件
			changeSelectBall(item) {
				console.log(item);
				this.queryParam.pageNo = 1;
				this.lotteryOrderList = []
				this.stating = item.type
				this.queryParam.type = item.type
				if(item.type == '0')
				{
					this.queryParam.state = '1';
					this.queryParam.payType = '2';
				}
				if(item.type == '5'){
					this.queryParam.state = '2';
					this.queryParam.payType = '2';
				}
				if(item.type == '98'){
					this.queryParam.state = '2';
					this.queryParam.payType = '2';
				}
				if(item.type == '99'){
					this.queryParam.state = '1';
					this.queryParam.payType = '0';
				}
				console.log(this.queryParam);
				this.total = 0 
				this.init();
			},
			//初始化事件
			init() {
				uni.showLoading();
				let tha = this;
				getPayOrderList(tha.queryParam).then(res => {
					tha.lotteryOrderList = [...tha.lotteryOrderList, ...res.voList]
					tha.total = 0;
					tha.lotteryOrderList.map(item => {
						tha.total += item.price
					})
					setTimeout(function() {
						uni.hideLoading();
					}, 500);
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	/deep/.uni-card__header-extra-text {
		font-size: 14px !important;
		color: #515ffb !important;
	}

	.uni-body {
		color: #909399;
	}
	
	.uni-body-moni {
		margin-left: 20upx;
		color: #ff0000;
	}

	/deep/.u-empty {
		margin-top: 50% !important;
	}

	/deep/.uni-datetime-picker--btn,
	/deep/.uni-calendar-item--after-checked,
	/deep/.uni-calendar-item--before-checked {
		background: #515ffb !important;
	}
	
	.yj_chupiao{
		background-color: #00d600;
		color: #fff;
		padding: 4px 15px;
		border-radius: 4px;
		margin-left: 10px;
		width: 80px;
		margin-top: 10px;
	}
	.yj_paijiang{
		background-color: #5555ff;
		color: #fff;
		padding: 4px 15px;
		border-radius: 4px;
		margin-left: 10px;
		width: 80px;
		margin-top: 10px;
	}
	.left{
		float: left;
	}
	.right{
		float: right;
	}
	.delOrder{
		color:#fff;float: right;padding: 4upx 8upx;background-color: #e10000;margin-bottom: 15upx;margin-right: 15upx;
	}
	.chupiao{background-color: #00d600;}
	.paijiang{background-color: #5555ff;}
</style>