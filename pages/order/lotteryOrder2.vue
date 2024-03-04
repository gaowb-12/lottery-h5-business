<template>
	<!-- 购彩订单列表 -->
	<view class="box">

		<nav-bar :title="'订单记录'" :back="true"></nav-bar>
		<u-sticky bgColor="#fff" style="margin-bottom: 30px;" v-if="queryParam.userId==''">
			<u-tabs :list="lassificationcList" lineColor="rgb(255,47,12)" :scrollable="false"
				:activeStyle="{color: 'rgb(255,47,12)',fontWeight: 'bold', transform: 'scale(1.05)'}" @click="changeSelectBall">
			</u-tabs>
		</u-sticky>
		<view v-if="queryParam.userId!=''">
			<uni-datetime-picker type="daterange" @change="change" />
		</view>
		<view>
			<u-empty icon="http://cdn.uviewui.com/uview/empty/order.png" :show="lotteryOrderList.length<=0" mode="order"
				text="没有订单记录"></u-empty>
			<uni-card v-for="(item,index) in lotteryOrderList" :key="index" :border="false" :title="item.ballName"
				:style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]"
				:sub-title="item.createTime|formatDate(that)" :extra="'订单'+item.price+'元'" :thumbnail="item.ballUrl"
				@click="details(item.id)">
				<view>订单编号：<span class="uni-body">{{item.orderId}}</span></view>
				<view>订单状态：<span class="uni-body"
						:style="item.state=='3'||item.state=='4'?'color: #Cd2626':''">{{item.state|formatState}}</span>
				</view>
				<view v-if="item.winPrice!=undefined">中奖金额：<span class="uni-body"
						style="color: #Cd2626;font-size: 18px;"
						v-if="item.state=='3'||item.state=='4'">{{item.winPrice}}</span></view>
			</uni-card>
		</view>

	</view>
</template>

<script>
	import {
		getLotteryOrderPage2,
	} from '@/api/lotteryOrder.js'
	export default {
		data() {
			return {
				that: this,
				lassificationcList: [{
					name: '全部',
					state: ""

				}, {
					name: '待出票',
					state: "0"
				}, {
					name: '待开奖',
					state: "1"
				}, {
					name: '未中奖',
					state: "2"
				}, {
					name: '待派奖',
					state: "3"
				}, {
					name: '已派奖',
					state: "4"
				}],
				//查询条件
				queryParam: {
					userId: "",
					state: "",
					startTime: "",
					endTime: "",
					pageNo: 1,
					pageSize: 10
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
			//格式化状态
			formatState(data) {
				if (data == 0) {
					return "待出票";
				} else if (data == 1) {
					return "待开奖";
				} else if (data == 2) {
					return "未中奖";
				} else if (data == 3) {
					return "待派奖";
				} else if (data == 4) {
					return "已派奖";
				} else if (data == 5) {
					return "已拒绝";
				} else if (data == 6) {
					return "已退票";
				}
			}
		},
		onLoad(option) {
			if (option.uid != undefined) {
				this.queryParam.userId = option.uid;
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
				this.init()
			},
			// tab切换事件
			changeSelectBall(item) {
				this.queryParam.pageNo = 1;
				this.lotteryOrderList = []
				this.queryParam.state = item.state
				this.init();
			},
			//点击卡片查询详情
			details(id) {
				uni.navigateTo({
					url: "/pages/order/lotteryOrderDetails?id=" + id,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			//初始化事件
			init() {
				uni.showLoading();
				getLotteryOrderPage2(this.queryParam).then(res => {
					this.total = res.total;
					this.lotteryOrderList = [...this.lotteryOrderList, ...res.voList]
					setTimeout(function() {
						uni.hideLoading();
					}, 500);
				})
			}
		}
	}
</script>

<style scoped lang="scss">

	.uni-body {
		color: #909399;
	}

	/deep/.u-empty {
		margin-top: 50% !important;
	}

	/deep/.uni-datetime-picker--btn,
	/deep/.uni-calendar-item--after-checked,
	/deep/.uni-calendar-item--before-checked {
		background: #Cd2626 !important;
	}
</style>