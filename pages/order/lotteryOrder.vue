<template>
	<!-- 购彩订单列表 -->
	<view class="box">
		
		<nav-bar :title="'订单记录'" :back="true"></nav-bar>
		<nav-bottom :current="0"></nav-bottom>		
		<u-sticky bgColor="#fff" style="margin-bottom: 4px;"  > 
			<u-tabs :list="lassificationcList" lineColor="#515fff" :current="currentIndex" :scrollable="false" 
				:activeStyle="currentIndex === 3 ? activeStyle : activeStyle" @click="changeSelectBall">
			</u-tabs>
		</u-sticky>
		<view  style="margin-top: 10upx;">
			<uni-datetime-picker type="daterange" @change="change" />
		</view>
		<view  style="margin-top: 10upx;display: flex;padding: 10rpx;align-items: center;">
		<span style="font-size: 12px;margin-right: 4px;">订单编号:</span>	<view style="width: 70%;"><u-input v-model="queryParam.orderId" type="number"clearable /></view>
			<u-button size="mini" type="primary" @click="search" style="width: 60rpx;" color="#5555ff">搜索</u-button>
		</view>
		<view>
			<u-empty icon="http://cdn.uviewui.com/uview/empty/order.png" :show="lotteryOrderList.length<=0" mode="order"
				text="没有订单记录"></u-empty>
			
			<!-- <view class="yj_chupiao" v-if=" stating =='0' && lotteryOrderList.length>0 " @click="chupiao(0)">一键出票</view> -->
			<!-- <view class="yj_paijiang" v-if="stating =='3' && lotteryOrderList.length>0 " @click="paijiang(0)">一键派奖</view> -->
			<uni-card v-for="(item,index) in lotteryOrderList" :key="index" :border="false" :title="item.ballName"
				:style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]"
				:sub-title="item.createTime|formatDate(that)" :extra="'订单'+item.price+'元'" :thumbnail="item.ballUrl"
				>
				<view @click="stating!=8&&details(item.id, stating)">订单编号：<span class="uni-body">{{item.orderId}}</span></view>
				<view @click="stating!=8&&details(item.id, stating)">用户：<span class="uni-body">{{item.nickname}} </span>&nbsp;&nbsp;
					<span class="uni-body-moni" v-if="  item.moni == '1'"> 模拟</span>
				</view>
				
				<view @click="stating!=8&&details(item.id, stating)" v-if=" item.fd == '1'"><span class="uni-body">发单</span>&nbsp;&nbsp;
					<span class="uni-body-moni" > {{item.fdh}}</span>
				</view>
				
				<view @click="stating!=8&&details(item.id, stating)" v-if=" item.gd == '1'"><span class="uni-body">跟单 </span>&nbsp;&nbsp;
					<span class="uni-body-moni" > {{item.gdh}}</span>
				</view>
				
				<view @click="stating!=8&&details(item.id, stating)">订单状态：<span v-if="stating!=8" class="uni-body"
						:style="item.state=='3'||item.state=='4'?'color: #515ffb':''">{{item.state|formatState}}</span>
						<span v-else class="uni-body"
								:style="item.state=='3'||item.state=='4'?'color: #515ffb':''">{{stating|formatState}}</span>
						<u-button v-if="stating==8" style="width: 20%;float: right;height: 100%;padding: 10rpx;" @click.native.stop="robOrder(item.id)" color="#5555ff" text="抢单"></u-button>
						<u-button v-if="stating==0&&sysId==1" style="width: 20%;float: right;height: 100%;padding: 10rpx;" @click.native.stop="revokeOrder(item.id)" color="#5555ff" text="撤单"></u-button>
				</view >
				<!-- <view v-if="item.winPrice!=undefined">中奖金额：<span class="uni-body"
						style="color: #515ffb;font-size: 18px;"
						v-if="item.state=='3'||item.state=='4'">{{item.winPrice}}</span></view> -->
				<!-- <view class="delOrder chupiao"  v-if=" item.state== '0' " @click="chupiao(item.id)">出票</view>	 -->
				<view class="delOrder paijiang"  v-if=" item.state== '3' " @click="paijiang(item.id)">派奖</view>	
				<!-- <view class="delOrder"   @click="delOrder(item.orderId)">删除订单</view>		 -->
			</uni-card>
		</view>

	</view>
</template>

<script>
	import {
		revokeOrder,
		robOrderX,
		getLotteryOrderPageX,
		paijiangOrderX,
	} from '@/api/lotteryOrder.js'
	import {
		deleteOrder,
		chupiaoOrder,
		paijiangOrder,
		getUser
	} from "@/api/user.js"
	export default {
		data() {
			return {
				sysId:'',
				user:{},
				that: this,
				stating:8,
				currentIndex: 0,
				lassificationcList: [
				{
					name: '待抢单',
					state: "8"
				},{
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
				}
				],
				//查询条件
				queryParam: {
					sysId:'',
					userId: "",
					state: "8",
					startTime: "",
					endTime: "",
					orderId: undefined,
					phone:"",
					pageNo: 1,
					pageSize: 10
				},
				total: 0,
				//订单记录列表
				lotteryOrderList: [],
				activeStyle: {color: '#515ffb',fontWeight: 'bold',transform: 'scale(1.05)'}
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
				}else if (data == 8) {
					return "待抢单";
				}
			}
		},
		onLoad(option) {
			if (option.uid != undefined) {
				this.queryParam.userId = option.uid;
				this.queryParam.phone = option.phone;
			}
			this.queryParam.sysId=uni.getStorageSync("sysId")
			this.sysId=uni.getStorageSync("sysId")
			console.log(this.queryParam.sysId)
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
			revokeOrder(id){
				let th=this
				th.queryParam.orderId = id;
				console.log(this.queryParam)
				uni.showModal({
				    title: '撤单',
				    content: '确认撤销该订单吗?',
				    success: function (res) {
				        if (res.confirm) {
							console.log("1111"+th.queryParam)
				            revokeOrder(th.queryParam).then(res => {
								if(res.success){
									uni.showToast({
										title: '操作成功！',
										icon: 'none'
									});
									setTimeout(function() {
										location.reload()
										// th.init();
										}, 1000);
										
								}
							})
				        } else if (res.cancel) {
							th.queryParam.orderId = "";
				            console.log('用户点击取消');
				        }
				    }
				})
			},
			robOrder(id){
				let th=this
				th.queryParam.orderId = id;
				console.log(this.queryParam)
				debugger
				uni.showModal({
				    title: '抢单',
				    content: '确认抢该订单吗?',
				    success: function (res) {
				        if (res.confirm) {
							console.log("1111"+th.queryParam)
				            robOrderX(th.queryParam).then(res => {
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
							th.queryParam.orderId = "";
				            console.log('用户点击取消');
				        }
				    }
				})
				
			},
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
				let that = this;
				var str = '确认一键派奖?';
				if(id != 0){
					str = '确认派奖该订单?'
				}else{
					id = "";
				}
				uni.showModal({
				    title: '派奖',
					content: str,
					// editable:true,
					// placeholderText:"请输入实际派奖金额",
				    success: function (res) {
				        if (res.confirm) {
				            paijiangOrderX({'id':id,'sysId': that.sysId, inWinPrice: Number(res.content)}).then(res => {
								if(res.success){
									console.log(res);
									uni.showToast({
										title: '操作成功！',
										icon: 'none'
									});
									setTimeout(function(){
										that.init();
										// location.reload()
									}, 1000)
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
			details(id, state) {
				
				uni.navigateTo({
					url: "/pages/order/lotteryOrderDetails?id=" + id + "&state=" + state,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			search() {
				uni.showLoading();
				getLotteryOrderPageX(this.queryParam).then(res => {
					this.total = res.total;
					this.lotteryOrderList = res.voList
					setTimeout(function() {
						uni.hideLoading();
					}, 500);
				})
			},
			//初始化事件
			init() {
				console.log(this.sy)
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
		margin-bottom: 96rpx !important;
	}
	/deep/ .u-input {
		background: #fff;
		height: 24rpx;
	}
	/deep/ .uni-input-input {
		font-size: 12px !important;
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
	.chupiao{background-color: #00d600;}
	.paijiang{background-color: #5555ff;}
</style>