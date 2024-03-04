<template>
	<view class="box" style="">
		<nav-bar :title="'用户详情'" :back="true"></nav-bar>
		<nav-bottom :current="9"></nav-bottom>
		<view class="user_info">
			<image :src="user.avatar" style="" class="user_info_img"></image>
			<view style="margin-left: 70px;">
				<span >{{user.nickname}}</span>
				- <span >{{user.shop_name}}</span>
				<br>
				<span style="font-size:9px;">联系方式：{{user.phone}}</span>
				<br>
				<span style="font-size:9px;">绑定时间：{{user.createTime|formatDate(that)}}</span>
			</view>
		</view>
		
		<view class="zhmx" @click="goZhmx(user)"  v-if="user.isAgent != 1">
			<span style="font-size: 20px;">账户明细</span>
		</view>	
		
		<view class="tzjl" @click="goTzjl(user)"  v-if="user.isAgent == 0">
			<span style="font-size: 20px;">投注记录</span>
		</view>	
		
		<view class="tzjl" @click="goXstj(user)"  v-if="user.isAgent == 1">
			<span style="font-size: 20px;">销售统计</span>
		</view>	
		
		<view class="tzjl" @click="goDpyj(user)"  v-if="user.isAgent == 1">
			<span style="font-size: 20px;">店铺业绩</span>
		</view>	
		
		<view class="tzjl" @click="goKhtj(user)"  v-if="user.isAgent == 2">
			<span style="font-size: 20px;">客户统计</span>
		</view>	
		
		<view class="tongji" >
			<view>
				<span>最近战况 : </span>
				<span v-if="user.recentlyLotteryStateList.length > 0" v-for="(item,index) in user.recentlyLotteryStateList" :key="index">
					<span v-if="item == 2" style="color: black;">黑</span>
					<span v-else style="color: red;">红</span>
				</span>
			</view>
			<view class="tongji_mix">
				<view class="mx_info">
					<span class="mx_title">总充值</span>
					<br>
					<span class="mx_content">{{user.totalRecharge}}</span>
				</view >
				<view class="mx_info">
					<span class="mx_title">总提现</span>
					<br>
					<span class="mx_content">{{user.totalWithdrawal}}</span>
				</view>
				<view class="mx_info">
					<span class="mx_title">余额</span>
					<br>
					<span class="mx_content">{{user.balance}}</span>
				</view>
			</view>
			<view class="tongji_mix">
				<view class="mx_info">
					<span class="mx_title">今日充值</span>
					<br>
					<span class="mx_content">{{user.todayRecharge}}</span>
				</view>
				<view class="mx_info">
					<span class="mx_title">今日提现</span>
					<br>
					<span class="mx_content">{{user.todayWithdrawal}}</span>
				</view>
				<view class="mx_info">
					<span class="mx_title">总订单数量</span>
					<br>
					<span class="mx_content">{{user.sumOrders}}</span>
				</view>
			</view>
			<view class="tongji_mix">
				<view class="mx_info">
					<span class="mx_title">总投注金额</span>
					<br>
					<span class="mx_content">{{user.totalBetting}}</span>
				</view>
				<view class="mx_info" >
					<span class="mx_title" v-if="user.isAgent != 0" @click="goCustomer(user)">他的客户</span>
					<br>
					<span class="mx_content">{{user.sumCustomer}}</span>
				</view>
				<view class="mx_info" v-if="user.isAgent == 1" >
					<span class="mx_title"  @click="goSalePerson(user)">他的员工</span>
					<br>
					<span class="mx_content">{{user.sumSalePersons}}</span>
				</view>
				<view class="mx_info" v-if="user.isAgent == 0" @click="update()">
					<span class="xgye">修改余额</span>
				</view>
			</view>
		</view>
			
			<u-form :model="fo" ref="uForm" style="margin-top: 10px;background-color: #fff;" label-width="100rpx;">
					<u-form-item label="用户发单分佣比例 (n*%)" v-if="user.isAgent == 0" label-width="200"><u-input v-model="user.commissionRate" @blur="updateCommissionRate()"/></u-form-item>
					<u-form-item label="销售分佣比例(0.000)" v-if="user.isAgent == 2" label-width="200"><u-input v-model="user.saleRate" @blur="updateSaleRate()"/></u-form-item>
					<!-- <u-form-item label="设为销售" v-if="user.isAgent == 0" label-width="200"><u-switch slot="right" v-model="switchSalePersonVal"></u-switch></u-form-item>
					<u-form-item label="设为模拟" v-if="user.isAgent == 0" label-width="200"><u-switch slot="right" v-model="switchMoniVal"></u-switch></u-form-item> -->
			</u-form>
			
			<view class="scyh_class" v-if="user.isAgent !=1">
				<span class="scyh" v-if="user.isAgent == 0 && user.moni == 0" @click="delUser">删除用户</span>
			</view>
			
			<u-modal title="修改用户余额" :show="updateShow" :zoom="false" confirmText="提交" showCancelButton
				confirmColor="#515ffb" @confirm="userRecharge()" @cancel = "cancle()">
				<u-form :model="forms" ref="uForm">
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
		getUserDetail,
		delMoniUser,
		shopkeeperRecharge,
		setSalespersonSaleRate,
		setUserCommissionRate,
		adminUserRecharge
	} from '@/api/user.js'
	export default {
		data() {
			return {
				fo: {
					name: '',
					intro: '',
					sex: ''
				},
				that:this,
				forms:"",
				switchVal: false,
				switchSalePersonVal:false,
				switchMoniVal:false,
				user:{
					"nickname":"店主1",					
					"phone":"13461346131",
					"create_time":"2023-03-08 14:05",
					"sum_recharge":"8000.00",			//总充值
					"sum_withdraw":"3000.00",			//总提现	
					"balance":"6000.50",				//余额
					"id":1,
					"count_orders":100,					//总订单数量
					"recently":"红-黑-红-红-黑",			//最近五单情况
					"sum_salePersons":20,				//他的销售人数
					"sum_invite":30,					//他的邀请人数
					"sum_customer":30,					//总客户数量
					"saleRate":0.07,					//销售分佣比例
					"commissionRate":6					,//中奖分佣比例
					"shop_rate":0.07					,//店铺扣款比例
					"pnickname":"上级",
					"pid":"上级id",
					"isAgent":1,
					"avatar":"http://app.tianyingty.xyz/logo.png",
					"tenanit_id":1,
					"shop_name":"天盈",
					"recentlyLotteryStateList":[],
					"moni":0,
					"isAgent":0,
				},
				radio: '',
				form:"",
				updateShow:false,
				rechargeId:0,
				rechargeMoney:0,
				that: this,
				//查询条件
				queryParam: {
					pageNo: 1,
					pageSize: 20
				},
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
			};
		},
		filters: {
			//格式化日期
			formatDate(data, that) {
				return that.globalUtil.dateTimeFormat(data)
			},
		},
		onLoad(e) {
			if(!e.uid){
				uni.showToast({
					title:"请选择用户",
					icon:'none'
				})
				return false;
			}
			this.init(e.uid)
		},
		methods: {
			delUser(){
				uni.showModal({
				    title: '删除用户',
				    content: "确认操作么",
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading();
				            adminUserRecharge({'price':_price,'type':_type,"id":_rechargeId,"tenantId":_tenantId}).then(res => {
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
			updateCommissionRate(){
				uni.showLoading();
				setUserCommissionRate({"commissionRate":this.user.commissionRate,"userId":this.user.id}).then(res=>{
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
			},
			updateSaleRate(){
				uni.showLoading();
				setSalespersonSaleRate({"saleRate":this.user.saleRate,"userId":this.user.id}).then(res=>{
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
			},
			update(){
				this.rechargeId = this.user.userId
				this.updateShow = true
			},
			userRecharge(){
				let _rechargeId = this.rechargeId;
				let _type = this.radio;
				let _price = this.rechargeMoney;
				let _tenantId = this.user.tenantId;
				this.updateShow = false
				uni.showModal({
				    title: '余额',
				    content: "确认操作么",
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading();
				            adminUserRecharge({'price':_price,'type':_type,"id":_rechargeId,"tenantId":_tenantId}).then(res => {
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
			init(uid){
				getUserDetail({"userId":uid}).then(res => {
					if(res){
						this.user = res
					}
				})
			},
			
			goZhmx(item){
				uni.navigateTo({
					// url: `getDetails?id=${id}&item=${item}`
					url: "/pages/order/counts?uid=" + item.id
				});
			},
			goCustomer(item){
				uni.navigateTo({
					url: "/pages/user/customer?uid=" + item.id
				});
			},
			goSalePerson(item){
				uni.navigateTo({
					url: "/pages/user/salePerson?uid=" + item.id
				});
			},
			goTzjl(item){
				uni.navigateTo({
					url: "/pages/order/lotteryOrder?uid=" + item.id+"&phone="+item.phone
				});
			},
			goXstj(item){
				uni.navigateTo({
					url: "/pages/proxy/invitation?uid=" + item.id
				});
			},
			goDpyj(item){
				uni.navigateTo({
					url: "/pages/counts/statisticsMain?tenantId=" + item.tenantId
				});
			},
			goKhtj(item){
				uni.navigateTo({
					url: "/pages/personal/invitation?uid=" + item.id
				});
			},
			
			del(item) {
				uni.showModal({
				    title: '删除模拟用户',
				    content: "确认删除么",
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading();
				            delMoniUser({"userId":item.userId}).then(res => {
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
		}
	}
</script>

<style scoped lang='scss'>
	page {
		background: #e1e1e1;
	}
	
	.user_info{
		padding: 3px 5px;
		background-color: #fff;
	}
	.user_info_img{
		width: 60px;height: 60px;border-radius: 8px;float: left;
	}
	
	.zhmx{text-align: center;background-color: #fff;margin: 5px 0;padding: 5px;}
	
	.tzjl{text-align: center;background-color: #fff;margin: 5px 0;padding: 5px;}
	
	.tongji{background-color: #fff;padding: 5px;}
	
	.tongji_mix{margin-top: 10px;display: flex;}
	
	.mx_info{width: 40%;}
	
	.mx_title{font-size: 11px;color:#737373}
	.mx_content{color: #d40000;}
	.xgye{padding: 3px 7px;background-color: #fff;color:#0055ff;border-radius: 3px;font-size: 13px;border: #0055ff 1px solid;}

	.u-form-item__body__left{width: 30%!important;}
	
	.scyh_class{
		margin-top: 50px;
		background-color: #fff;
		text-align: center;
		margin-top: 5px;
		padding: 30px;
	}
	
	.scyh{padding: 4px 8px;background-color: #d40000;color:#fff}
</style>
