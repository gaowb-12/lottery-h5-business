<template>
	<!-- 购彩订单列表 -->
	<view class="box">
		
		<nav-bar :title="'待开奖'" :back="true"></nav-bar>
		
		<view  style="margin-top: 30upx;">
			<uni-datetime-picker type="daterange" @change="change" />
		</view>
		<view>
			<u-empty icon="http://cdn.uviewui.com/uview/empty/order.png" :show="lotteryOrderList.length<=0" mode="order"
				text="没有订单记录"></u-empty>
			
			<!-- <view class="yj_paijiang" v-if="stating =='3' && lotteryOrderList.length>0 " @click="paijiang(0)">一键派奖</view> -->
			<uni-card v-for="(item,index) in lotteryOrderList" :key="index" :border="false" :title="item.ballName"
				:style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]"
				:sub-title="item.createTime|formatDate(that)" :extra="'订单'+item.price+'元'" :thumbnail="item.ballUrl"
				>
				<view @click="details(item.id)">订单编号：<span class="uni-body">{{item.orderId}}</span></view>
				<view @click="details(item.id)">用户：<span class="uni-body">{{item.nickname}} </span>&nbsp;&nbsp;
					<span class="uni-body-moni" v-if="  item.moni == '1'"> 模拟</span>
				</view>
				
				<view @click="details(item.id)" v-if=" item.fd == '1'"><span class="uni-body">发单</span>&nbsp;&nbsp;
					<span class="uni-body-moni" > {{item.fdh}}</span>
				</view>
				
				<view @click="details(item.id)" v-if=" item.gd == '1'"><span class="uni-body">跟单 </span>&nbsp;&nbsp;
					<span class="uni-body-moni" > {{item.gdh}}</span>
				</view>
				
				<view @click="details(item.id)">订单状态：<span class="uni-body"
						:style="item.state=='3'||item.state=='4'?'color: #515ffb':''">{{item.state|formatState}}</span>
				</view @click="details(item.id)">
				<view v-if="item.winPrice!=undefined">中奖金额：<span class="uni-body"
						style="color: #515ffb;font-size: 18px;"
						v-if="item.state=='3'||item.state=='4'">{{item.winPrice}}</span></view> 
				<view class="delOrder chupiao"  v-if=" item.state== '0' " @click="chupiao(item.id)">出票</view>	
				<view class="delOrder paijiang"  v-if=" item.state== '3' " @click="paijiang(item.id)">派奖</view>	
				<!-- <view class="delOrder"   @click="delOrder(item.orderId)">删除订单</view>		 -->
			</uni-card>
		</view>

	</view>
</template>

<script>
	import {
		chupiaoOrderX,
		getLotteryOrderPageX,
	} from '@/api/lotteryOrder.js'
	import {
		deleteOrder,
		paijiangOrder,
		getUser
	} from "@/api/user.js"
	export default {
		data() {
			return {
				user:{},
				that: this,
				stating:1,
				lassificationcList: [{
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
					sysId:'',
					userId: "",
					state: "1",
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
			this.queryParam.sysId=uni.getStorageSync("sysId")
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
			
			paijiang(id){
				var str = '确认一键派奖?';
				if(id != 0){
					str = '确认派奖该订单: '+id+'?'
				}else{
					id = "";
				}
				uni.showModal({
				    title: '派奖',
				   editable:true,
				   placeholderText:"请输入实际派奖金额",
				    success: function (res) {
				        if (res.confirm) {
				            paijiangOrder({'id':id, inWinPrice: Number(res.content)}).then(res => {
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
			
			
			chupiao(id){
				var str = '确认一键出票?';
				var state = "1";
				if(id != 0){
					str = '确认出票该订单: '+id+'?'
				}else{
					id = "";
					state = "";
				}
				uni.showModal({
				    title: '出票',
				    content: str,
				    success: function (res) {
				        if (res.confirm) {
				            chupiaoOrderX({'id':id,'sysId': that.sysId,'state':state}).then(res => {
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
				this.queryParam.state = item.state
				this.stating = item.state
				this.init();
			},
			//点击卡片查询详情
			details(id) {
				uni.navigateTo({
					url: "/pages/order/lotteryOrderDetails?id=" + id + "&state=1",
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			//初始化事件
			init() {
				uni.showLoading();
				// getUser().then(res => {
				// 	if(res.status=="1"){
				// 		this.logout();
				// 	}
				// 	this.user = res
				// })
				getLotteryOrderPageX(this.queryParam).then(res => {
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
	.delOrder{
		color:#fff;float: right;padding: 4upx 8upx;background-color: #e10000;margin-bottom: 15upx;margin-right: 15upx;
	}
	.chupiao{background-color: #5555ff;}
	.paijiang{background-color: #5555ff;}
</style>