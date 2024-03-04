<template>
	<!-- 购彩订单列表 -->
	<view class="box">

		<nav-bar :title="'提现'" :back="true"></nav-bar>
		<!-- <nav-bottom :current="9"></nav-bottom> -->

		<u-sticky bgColor="#fff" style="margin-bottom: 30px;">
			<u-tabs :list="lassificationcList" lineColor="#515ffb" :scrollable="false"
				:activeStyle="{color: '#515ffb',fontWeight: 'bold',transform: 'scale(1.05)'}" @click="changeSelectBall">
			</u-tabs>
		</u-sticky>
		<view style="margin-top: 30upx;" class="invitation">
			<uni-datetime-picker type="daterange" @change="change" />
		</view>
		<view class="handler_btn" style="padding: 11px;">
			<span style="width:200upx;display: block;">
				<u-button :custom-style="{background:'#515ffb',color:'#fff'}"
					:disabled='lotteryOrderList.length === 0?true:false' v-if="stating == '0'" text="导出已勾选"
					@click="handlerExcel"></u-button>
			</span>
			<span style="width:200upx;display: block;">
				<u-button :custom-style="{background:'#e10000', color:'#fff'}"
					:disabled='lotteryOrderList.length === 0?true:false' v-if="stating == '0'" text="多选驳回"
					@click="handlerKsdkAndBh(2)"></u-button>
			</span>

			<span style="width:200upx;display: block;    " v-if="stating == '0'">
				<u-button :custom-style="{background:'#00d600', color:'#fff'}"
					:disabled='lotteryOrderList.length === 0?true:false' text="多选打款"
					@click="handlerKsdkAndBh(1)"></u-button>
			</span>


		</view>
		<view class="handler_btn2" v-if="stating == '0'">
			<u-button :disabled='lotteryOrderList.length === 0?true:false'
				:custom-style="{width:'40%',background:'rgb(0, 128, 255)',color:'#fff'}"
				@click="allpick(1)">点我进行全选</u-button>
			<!-- <u-button
				:disabled='lotteryOrderList.every(item => item.check === true) && lotteryOrderList.length !== 0?false:true'
				:custom-style="{width:'40%',background:'orange',color:'#fff'}" @click="allpick(2)">点我取消全选</u-button> -->
			<u-button :disabled='lotteryOrderList.length !== 0?false:true'
				:custom-style="{width:'40%',background:'orange',color:'#fff'}" @click="allpick(2)">点我取消全选</u-button>
		</view>
		<view>
			<u-empty icon="http://cdn.uviewui.com/uview/empty/order.png" :show="lotteryOrderList.length<=0" mode="order"
				text="没有订单记录"></u-empty>



			<checkbox-group @change="changeBoxCheckbox" style="display: block;">
				<view v-for="(item, index) in lotteryOrderList" :key="index" class="txList">
					<checkbox :value="item.id.toString()" :checked="item.check" style="display: inline-block;"
						v-if="stating == '0'" />

					<text v-if="stating == '0'" style="display: inline-block;">
						选择提现
					</text>
					<view>申请日期：<span class="uni-body">{{item.createTime|formatDate(that)}} </span></view>
					<view>
						用户名：<span class="uni-body">{{item.nickname}} </span>&nbsp;&nbsp;
						<span class="uni-body-moni"> {{item.name}}</span>
					</view>
					<view>
						提现金额：<span>{{item.amount}}元</span>
						<view class="delOrder chupiao" @click="sureOrder(item)" v-if="item.state == 0 "
							style="font-size: 11px;border-radius: 3px;line-height: 20px;"><text
								style="display: inline-block;transform: translateY(-1px);">确认打款</text></view>
						<view class="delOrder " @click="failOrder(item)" v-if="item.state == 0 "
							style="font-size: 11px;border-radius: 3px;line-height: 20px;"><text
								style="display: inline-block;transform: translateY(-1px);">驳回</text>
						</view>
					</view>
				</view>
			</checkbox-group>


			<u-popup :show="isShow" mode="center" @close="close" closeable>
				<view class="pop_content">
					<view class="pop_title">
						提示
					</view>
					<view class="pop_text">
						<view style="padding:0 10px">
							<text style="color: #000;font-size: 20px;font-weight: bold;">您确定使用多选{{ czState }}吗？</text>
						</view>

					</view>
					<view class="pop_Btns">
						<u-button :custom-style="{background:'#515ffb',color: '#fff'}" @click="close">取消</u-button>
						<u-button :custom-style="{background:'#515ffb',color: '#fff'}"
							@click="queding(czState)">确定</u-button>
					</view>
				</view>
			</u-popup>



			<!-- 	<uni-card v-for="(item,index) in lotteryOrderList" :key="index" :border="false" title="提现申请"
				:style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]"
				:sub-title="item.createTime|formatDate(that)" :extra="''+item.amount+'元'" :thumbnail="item.ballUrl"
				>
				<view>用户：<span class="uni-body">{{item.nickname}} </span>&nbsp;&nbsp;
					<span class="uni-body-moni" > {{item.name}}</span>
				</view>
				<view style="display:flex;align-items: center;">支付宝：<span class="uni-body">{{item.zfbNumber}}</span>&nbsp;&nbsp;
				<u-button style="width: 40px;" size="mini" type="success" @click="copy(item.zfbNumber)">复制</u-button>
				</view>
				<view>银联：<span class="uni-body">{{item.bankName}} </span>&nbsp;&nbsp;
					<span class="uni-body-moni" > {{item.bankNumber}}</span>
				</view>
				
				<view >订单状态：<span class="uni-body"
						:style="item.state=='3'||item.state=='4'?'color: #515ffb':''">{{item.state|formatState}}</span>
				</view>
				<view class="delOrder chupiao"   @click="sureOrder(item)" v-if="item.state == 0 " style="font-size: 11px;">确认打款</view>
				<view class="delOrder "   @click="failOrder(item)" v-if="item.state == 0 " style="font-size: 11px;">驳回</view>
			</uni-card> -->
		</view>

	</view>
</template>

<script>

	import {
		widthdrawalList
	} from "@/api/lotteryOrder.js"
	import {
		examine,
	} from "@/api/user.js"
	export default {
		data() {
			return {
				czState: "",
				isShow: false,
				user: {},
				that: this,
				stating: 0,
				lassificationcList: [{
					name: '待审核',
					state: "0"
				}, {
					name: '已打款',
					state: "1"
				}, {
					name: '已拒绝',
					state: "2"
				}],
				//查询条件
				queryParam: {
					userId: "",
					state: "0",
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
		computed: {
			handlerDisable() {
				if (this.lotteryOrderList.every(opt => opt.check === true)) {
					return false;
				} else {
					return true;
				}
			}
		},
		onPullDownRefresh() {
			this.lotteryOrderList = []
			this.queryParam.pageNo = 1
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
				if (data == "0") {
					return "待审核";
				} else if (data == "1") {
					return "已打款";
				} else if (data == "2") {
					return "已拒绝";
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
			queding(state) {
				this.isShow = false;
				if (state === "驳回") {
					uni.showLoading();
					this.lotteryOrderList.map(item => {
						if (item.check === true) {
							examine({
								'id': item.id,
								"state": 2
							}).then(res => {
								if (res.success) {
									setTimeout(function() {
										uni.hideLoading();
										uni.showToast({
											title: '操作成功！',
											icon: 'none'
										});
										location.reload()
									}, 2000);
								}
							})
						}
					})
				} else {
					uni.showLoading();
					this.lotteryOrderList.map(item => {
						if (item.check === true) {
							examine({
								'id': item.id,
								"state": 1
							}).then(res => {
								if (res.success) {
									setTimeout(function() {
										uni.hideLoading();
										uni.showToast({
											title: '操作成功！',
											icon: 'none'
										});
										location.reload()
									}, 2000);
								}
							})
						}
					})
				}
			},
			close() {
				this.isShow = false;
			},
			handlerFilterData(list) {

				let newList = list.filter(item => item.check === true);
				return newList.map(item => {
					let obj = {}
					obj['name'] = item.name
					obj['bankNumber'] = item.bankNumber
					obj['amount'] = item.amount
					obj['phone'] = item.phone
					obj['id'] = item.id

					return obj;
				})

			},
			handlerExcel() {
				if (this.lotteryOrderList.every(item => item.check !== true)) {
					uni.showToast({
						title: '您还没有勾选提现订单',
						icon: 'none',
					});
					return;
				}
				let jsonData = this.handlerFilterData(this.lotteryOrderList);
				uni.navigateTo({
					url: "/pages/pay/checkhzlist?list=" + JSON.stringify(jsonData),
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			// 快速打款事件
			handlerKsdkAndBh(num) {
				if (num === 1) {
					if (this.lotteryOrderList.every(item => item.check !== true)) {
						uni.showToast({
							title: '您还没有勾选提现订单',
							icon: 'none',
						});
						return;
					}
					this.isShow = true;
					this.czState = "打款";

				} else {
					if (this.lotteryOrderList.every(item => item.check !== true)) {
						uni.showToast({
							title: '您还没有勾选提现订单',
							icon: 'none',
						});
						return;
					}
					this.isShow = true;
					this.czState = "驳回";

				}
			},

			// 全选按钮控制多个选项的勾选状态
			allpick(num) {
				if (num === 1) {
					this.lotteryOrderList.forEach(item => {
						item.check = true;
					})
					console.log(this.lotteryOrderList)

				} else {
					if (this.lotteryOrderList.every(item => item.check !== true)) {
						uni.showToast({
							title: '您还没有勾选提现订单',
							icon: 'none',
						});
						return;
					}
					this.lotteryOrderList.forEach(item => {
						item.check = false;
					})
					console.log(this.lotteryOrderList)
				}
			},
			changeBoxCheckbox(event) {
				// 选中选项的集合
				let ids = event.detail.value;
				this.lotteryOrderList.forEach(item => {
					if (ids.findIndex(ops => ops.toString() == item.id) != -1) {
						item.check = true;
					} else {
						item.check = false;
					}

				})
				console.log(this.lotteryOrderList)

				if (this.lotteryOrderList.every(item => item.check === true)) {
					this.allpick(1);
				}


			},

			copy(phone) {
				console.log(phone, 'copy');
				uni.setClipboardData({
					data: phone,
					success() {
						uni.showToast({
							title: '复制成功',
							icon: 'success',
						});
					}
				});
			},
			sureOrder(item) {
				uni.showModal({
					title: '打款',
					content: '确认已打款 : ' + item.amount + '元 ? ',
					success: function(res) {
						if (res.confirm) {
							examine({
								'id': item.id,
								"state": 1
							}).then(res => {
								if (res.success) {
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
			failOrder(item) {
				uni.showModal({
					title: '驳回',
					content: '确认驳回 : ' + item.amount + ' 元? ',
					success: function(res) {
						if (res.confirm) {
							examine({
								'id': item.id,
								"state": 2
							}).then(res => {
								if (res.success) {
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
			paijiang(id) {
				var str = '确认一键派奖?';
				if (id != 0) {
					str = '确认派奖该订单: ' + id + '?'
				} else {
					id = "";
				}
				uni.showModal({
					title: '派奖',
					content: str,
					success: function(res) {
						if (res.confirm) {
							paijiangOrder({
								'id': id
							}).then(res => {
								if (res.success) {
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


			chupiao(id) {
				var str = '确认一键出票?';
				var state = "1";
				if (id != 0) {
					str = '确认出票该订单: ' + id + '?'
				} else {
					id = "";
					state = "";
				}
				uni.showModal({
					title: '出票',
					content: str,
					success: function(res) {
						if (res.confirm) {
							chupiaoOrder({
								'id': id,
								'state': state
							}).then(res => {
								if (res.success) {
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
					url: "/pages/order/lotteryOrderDetails?id=" + id,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			//初始化事件
			init() {
				uni.showLoading();
				widthdrawalList(this.queryParam).then(res => {
					this.total = res.total;
					// this.lotteryOrderList = [...this.lotteryOrderList, ...res.
					const newList = res.voList.map(item => {
						this.$set(item, 'check', false);
						return item;
					});
					this.lotteryOrderList = newList;
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

	.pop_content {
		// background: #fff !important;
		width: 600rpx;
		height: 400rpx;
	}

	.pop_title {
		height: 40px;
		width: 95%;
		background: #fff;
		line-height: 60px;
		font-size: 20px;
		font-weight: bold;
		padding-left: 5%;
		color: #909399;
	}

	.pop_text {
		width: 100%;
		height: 200upx;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.pop_Btns {
		height: 70px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.u-button {
			width: 120px;
			font-size: 20px;
		}
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

	.invitation {
		margin: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 30px;
	}

	/deep/.uni-datetime-picker--btn,
	/deep/.uni-calendar-item--after-checked,
	/deep/.uni-calendar-item--before-checked {
		background: #515ffb !important;
	}

	.yj_chupiao {
		background-color: #00d600;
		color: #fff;
		padding: 4px 15px;
		border-radius: 4px;
		margin-left: 10px;
		width: 80px;
		margin-top: 10px;
	}

	.yj_paijiang {
		background-color: #5555ff;
		color: #fff;
		padding: 4px 15px;
		border-radius: 4px;
		margin-left: 10px;
		width: 80px;
		margin-top: 10px;
	}

	.txList {
		display: block;
		position: relative;
		margin: 10px 10px;
		padding-left: 10px;
		padding-top: 8px;
		padding-bottom: 10px;
		border: 2px outset #515ffb;
		border-radius: 10px;
		width: 92%;
	}

	.delOrder {
		color: #fff;
		float: right;
		padding: 4upx 8upx;
		background-color: #e10000;
		margin-bottom: 15upx;
		margin-right: 15upx;
	}

	.chupiao {
		background-color: #00d600;
	}

	.paijiang {
		background-color: #5555ff;
	}

	.handler_btn {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: row;
	}

	.handler_btn2 {
		width: 100%;
		display: flex;
		justify-content: start !important;
		// background: orange;
	}
</style>