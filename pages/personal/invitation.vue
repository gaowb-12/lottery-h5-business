<template>
	<view class="box">
		
		<nav-bar :title="'我的客户'" :back="true"></nav-bar>
		<view>
			<u-search @search="init" shape="square" margin="16px" height="40" animation :showAction="false" @clear="init"
				placeholder="请输入用户昵称或者手机号" v-model="queryParam.param"></u-search>
		</view>
		<view class="invitation">
			<p v-if="userShow" style="font-size: 14px;">共邀请：<span class="font">{{registerUserList.length}}</span>个客户</p>
			<p v-else style="font-size: 14px;">总投注金额：<span class="font">{{total}}</span>元</p>
			<uni-datetime-picker type="daterange" @change="change" />
		</view>
		<view>
			<u-tabs activeStyle="color:#515ffb;" :scrollable="false" lineWidth="45" lineColor="#515ffb" :list="tabList"
				@click="selectBtn">
			</u-tabs>
		</view>
		<view class="table" v-if="userShow">
			<uni-table stripe emptyText="暂无更多数据">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">昵称|手机号</uni-th>
					<uni-th align="center">注册时间</uni-th>
					<uni-th align="center" width="100" v-if="user.isAgent=='1'" >账户余额</uni-th>
					
					<uni-th align="center" width="60" v-if="user.isAgent=='1'" >流水</uni-th>
					<uni-th align="center" width="60" >订单</uni-th>
					<uni-th align="center" width="60"   v-if="user.isAgent=='1'">操作</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="item in registerUserList" :key="item.id">
					<uni-td align="center">{{item.nickname}}<br>{{item.phone}}</uni-td>
					<uni-td align="center">{{item.createTime|formatDate(that)}}</uni-td>
					<uni-td align="center" v-if="user.isAgent=='1'" >{{(item.sumAmount).toFixed(2)}}</uni-td>
					
					<uni-td align="center"  v-if="user.isAgent=='1'"  ><span style="color: #515ffb;" @click="mingxi(item)">明细</span></uni-td>
					<uni-td align="center" ><span style="color: #515ffb;" @click="info(item)">详情</span></uni-td>
					<uni-td align="center" v-if="user.isAgent=='1'"  >
						<span style="color: #515ffb;" @click="update(item)">修改</span>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>

		<view class="table" v-if="orderShow">
			<uni-table stripe emptyText="暂无更多数据">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">昵称|手机号</uni-th>
					<uni-th align="center">投注金额</uni-th>
					<uni-th align="center" width="100">详情</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="item in bettingUserList" :key="item.id">
					<uni-td align="center">{{item.nickname}}<br>{{item.phone}}</uni-td>
					<uni-td align="center">￥{{item.price}}</uni-td>
					<uni-td align="center">
						<span style="color: #515ffb;" @click="detail(item)">详情</span>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
		
		 
		<u-modal title="修改用户余额" :show="updateShow" :zoom="false" confirmText="提交" showCancelButton
			confirmColor="#515ffb" @confirm="shopRecharge()" @cancel = "cancle()">
			<u-form :model="form" ref="uForm">
					<u-form-item label="输入金额"><u-input type="number" v-model="rechargeMoney" /></u-form-item>
					<u-form-item label="类型">
						<u-radio-group v-model="radio">
							<u-radio v-for="(item, index) in radioList" :key="index" :name="item.value" >
								{{ item.name }}
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</u-form>
		</u-modal>
		
	</view>
</template>


<script>
	import {
		agentUsers,
		agentBettingList,
		getUser,
		shopkeeperRecharge
	} from '@/api/user.js'
	import {
		getUserInfo,
		setUserInfo,
		removeAuthtoken,
		removeUserInfo,
		removeExternalLogintoken
	} from "@/util/auth.js"
	export default {
		data() {
			return {
				radio: '',
				form:"",
				updateShow:false,
				rechargeId:0,
				rechargeMoney:0,
				user:{},
				total: 0,
				that: this,
				queryParam: {
					param: "",
					startTime: "",
					endTime: "",
					salespersonId:""
				},
				userShow: true,
				orderShow: false,
				registerUserList: [],
				bettingUserList: [],
				tabList: [{
					name: '注册数据',
				}, {
					name: '投注数据',
				}],
				radioList: [
					{
						value:'0',
						name: '加款'
					},
					{
						value:'1',
						name: '扣款'
					}
				],
			}
		},
		filters: {
			formatDate(data, that) {
				if (null == data) {
					return null;
				}
				return that.globalUtil.dateTimeFormat(data)
			},
		},
		methods: {
			update(item){
				this.rechargeId = item.userId
				this.updateShow = true
			},
			shopRecharge(){
				let _rechargeId = this.rechargeId;
				let _type = this.radio;
				let _price = this.rechargeMoney;
				this.updateShow = false
				uni.showModal({
				    title: '余额',
				    content: "确认操作么",
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading();
				            shopkeeperRecharge(_rechargeId ,{'price':_price,'type':_type}).then(res => {
								if(res.success){
									uni.hideLoading();
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
			cancle(){
				this.updateShow = false
			},
			inits() {
				getUser().then(res => {
					if(res.status=="1"){
						this.logout();
					}
					setUserInfo(res);
					this.user = res
				})
			},
			selectBtn(item) {
				if (item.index == 0) {
					this.userShow = true;
					this.orderShow = false;
				} else if (item.index == 1) {
					this.orderShow = true;
					this.userShow = false;
				}
			},
			change(option) {
				this.queryParam.startTime = option[0];
				this.queryParam.endTime = option[1];
				this.init()
			},
			init() {
				uni.showLoading();
				this.registerUserList = [];
				this.bettingUserList = [];
				this.total = 0;
				agentUsers(this.queryParam).then(res => {
					this.registerUserList = [...this.registerUserList, ...res.voList]
				})
				agentBettingList(this.queryParam).then(res => {
					this.bettingUserList = [...this.bettingUserList, ...res.voList]
					this.bettingUserList.map(item => {
						this.total += item.price
					})
				})
				setTimeout(function() {
					uni.hideLoading();
				}, 500);
			},
			info(item) {
				uni.navigateTo({
					url: "/pages/order/lotteryOrder?uid=" + item.userId
				});
			},
			mingxi(item) {
				uni.navigateTo({
					url: "/pages/order/counts?uid=" + item.userId
				});
			},
			detail(item) {
				uni.navigateTo({
					url: "/pages/order/lotteryOrderDetails?id=" + item.id
				});
			},
		},
		onLoad(e) {
			this.queryParam.salespersonId = e.uid
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		padding-bottom: 0px;
	}

	/deep/.u-tabs__wrapper__nav__item__text {
		font-size: 16px !important;
	}

	.table {
		width: 98%;
		margin: auto;
		margin-top: 30px;
	}

	.invitation {
		margin: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 30px;

		.font {
			color: #515ffb;
		}
	}

	/deep/.uni-date-editor--x {
		width: 88% !important;
		float: right;
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
	
	.caozuo{
		background-color: #948784;
		width: 100%;
		height: 300upx;
		padding: 20upx;
	}
	.caozuo_title{
		text-align: center;
	}
</style>

