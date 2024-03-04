<template>
	<!-- 购彩订单列表 -->
	<view class="box">
		
		<nav-bar :title="'账户明细'" :back="true"></nav-bar>
		
		<u-sticky bgColor="#fff" style="margin-bottom: 30px;">
			<u-tabs :list="lassificationcList" lineColor="#515ffb" :scrollable="false"
				:activeStyle="{color: '#515ffb',fontWeight: 'bold',transform: 'scale(1.05)'}" @click="changeSelectBall">
			</u-tabs>
		</u-sticky>
		<view >
			<uni-datetime-picker type="daterange" @change="change" />
		</view>
		<view style="padding: 10upx;color:blue;">统计：{{sum}} 元</view>
		<view>
			<u-empty icon="http://cdn.uviewui.com/uview/empty/order.png" :show="lotteryOrderList.length<=0" mode="order"
				text="没有订单记录"></u-empty>
				
			<uni-card v-for="(item,index) in lotteryOrderList" :key="index" :border="false" :title="item.ballName"
				:style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]"
				:sub-title="item.createTime|formatDate(that)" 
				>
				
				<view v-if="stating == '1'">
					<view class="left" >
						<span>投注 | 购彩</span>
						<br>
						<span>{{item.createTime|formatDate(that)}}</span>
					</view>
					<view class="right">
						￥{{item.price}}
					</view>
				</view>
				<view v-if="stating == '2'">
					<view class="left" >
						<span>充值 | 充值</span>
						<br>
						<span>{{item.createTime|formatDate(that)}}</span>
					</view>
					<view class="right">
						￥{{item.price}}
					</view>
				</view>
				<view v-if="stating == '3'">
					<view class="left" >
						<span>系统 | 系统</span>
						<br>
						<span>{{item.createTime|formatDate(that)}}</span>
					</view>
					<view class="right">
						￥{{item.price}}
					</view>
				</view>
				<view v-if="stating == '4'">
					<view class="left" >
						<span>奖金 | 奖金</span>
						<br>
						<span>{{item.createTime|formatDate(that)}}</span>
					</view>
					<view class="right">
						￥{{item.price}}
					</view>
				</view>
				<view v-if="stating == '5'">
					<view class="left" >
						<span>佣金 | 佣金</span>
						<br>
						<span>{{item.createTime|formatDate(that)}}</span>
					</view>
					<view class="right">
						￥{{item.price}}
					</view>
				</view>
				<view v-if="stating == '6'">
					<view class="left" >
						<span>提现 | 提现</span>
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

	</view>
</template>

<script>
	import {
		getLotteryOrderPage,
		getMingXiOrders
	} from '@/api/lotteryOrder.js'
	import {
		deleteOrder,
		getUser
	} from "@/api/user.js"
	export default {
		data() {
			return {
				sum:0,
				user:{},
				that: this,
				lassificationcList: [
					{
					name: '投注',
					state: "1"
				}, {
					name: '充值',
					state: "2"
				}, {
					name: '系统',
					state: "3"
				}, {
					name: '奖金',
					state: "4"
				}, {
					name: '佣金',
					state: "5"
				}, {
					name: '提现',
					state: "6"
				}],
				stating:1,
				//查询条件
				queryParam: {
					userId: "",
					type: "1",
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
			delOrder(id){
				uni.showModal({
				    title: '删除',
				    content: '确认删除订单 : '+id+' ? ',
				    success: function (res) {
				        if (res.confirm) {
				            deleteOrder({'orderId':id}).then(res => {
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
				this.lotteryOrderList = []
				this.init()
			},
			// tab切换事件
			changeSelectBall(item) {
				this.queryParam.pageNo = 1;
				this.lotteryOrderList = []
				this.queryParam.type = item.state
				this.stating = item.state
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
				getMingXiOrders(this.queryParam).then(res => {
					this.total = res.total;
					this.lotteryOrderList = [...this.lotteryOrderList, ...res.voList]
					this.sum = res.sumPrice;
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

	/deep/.u-empty {
		margin-top: 50% !important;
	}

	/deep/.uni-datetime-picker--btn,
	/deep/.uni-calendar-item--after-checked,
	/deep/.uni-calendar-item--before-checked {
		background: #515ffb !important;
	}
	
	
	.left{float: left;}
	.right{float: right;padding: 15upx;}
</style>