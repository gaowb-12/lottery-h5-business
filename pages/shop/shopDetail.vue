<template>
	<view class="box" style="">
		<nav-bar :title="'店铺设置'" :back="true"></nav-bar>
		<nav-bottom :current="11"></nav-bottom>
		<view class="user_info">
			<image :src="shop.logo" style="" class="user_info_img"></image>
			<view style="margin-left: 70px;">
				<span >{{shop.name}}</span>
				<br>
				<span  v-if="shop.line == 0" style="color:rgb(18 171 0);">营业中</span>
				<span  v-else="shop.line == 1" style="color:darkgray">停业</span>
				<br>
				<span style="font-size:9px;">绑定时间：{{shop.createTime|formatDate(that)}}</span>
			</view>
		</view>
		
		<view class="scyh_class">
			<span class="kq" v-if="shop.line == 1" @click="updateShop(0)">开启</span>
			<span class="tz" v-if="shop.line == 0" @click="updateShop(1)">关店</span>
			<span class="kq" @click="addChannel()">添加通道</span>
		</view>
			
		<u-form :model="fone" ref="uForm" style="margin-top: 10px;background-color: #fff;" >
				<u-form-item label="设定店铺扣款比例"  label-width="200">
					<u-input  v-model="shop.shopRate" @blur="updateShopRate()"/>
				</u-form-item>
		</u-form>
		
		<u-form  :model="ftwo" ref="uForm" style="margin-top: 10px;background-color: #fff;" >
				<view v-for="(item,index) in shop.channels" :key="index">
					<span v-if="index%3==0 && index<3" style="padding: 1px 3px;background-color: #8d8d8d;color: #fff;">通道{{index+1}}</span>
					<span v-if="index%3==0 && index>=3" style="padding: 1px 3px;background-color: #8d8d8d;color: #fff;">通道{{index/3+1}}</span>
					<span v-if="(index%3==0 && index<3) || (index%3==0 && index>=3)" style="margin-left: 10px;padding: 1px 3px;background-color: brown;color: #fff;" @click="delChannel(item)">删除</span>
					<u-form-item  :label="item.dictDesc"  label-width="200">
						<u-input  v-model="shop.channels[index].value" @blur="updateShopRate()"/>
					</u-form-item>
				</view>
		</u-form>
		
		<u-form :model="fthree" ref="uForm" style="margin-top: 10px;background-color: #fff;" >
				<u-form-item v-for="(item,index) in shop.ballGames" :key="index"  :label="item.name"  label-width="200">
					<u-switch slot="right" v-model="item.line" @change="updateGame(item)"></u-switch>
				</u-form-item>
		</u-form>
			
			<u-modal title="添加支付通道" :show="addPayChannel" :zoom="false" confirmText="提交" showCancelButton
				confirmColor="#515ffb" @confirm="addShopChannel()" @cancel = "cancle()">
				<u-form :model="forms" ref="uForm">
						<u-form-item label="appId"><u-input type="number" v-model="alipay_appid_kay" /></u-form-item>
						<u-form-item label="支付宝公钥"><u-input type="text" v-model="alipay_public_kay" /></u-form-item>
						<u-form-item label="应用私钥"><u-input type="text" v-model="alipay_private_kay" /></u-form-item>
					</u-form>
			</u-modal>
	</view>
</template>

<script> 
	import {
		shopDetail,
		updateShopLine,
		editShopRate,
		updateLine,
		addAliPayKey,
		deleteAliPayKey
	} from '@/api/shop.js'
	export default {
		data() {
			return {
				fone: {},
				ftwo:{},
				fthree:{},
				that:this,
				forms:"",
				shop:{},
				radio: '',
				form:"",
				addPayChannel:false,
				alipay_appid_kay:"",
				alipay_public_kay:"",
				alipay_private_kay:"",
				rechargeMoney:0,
				that: this,
				//查询条件
				queryParam: {
					id:0
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
			if(e){
				this.queryParam.id = e.shopId
				this.init()
			}else{
				uni.showToast({
					title:"请选择店铺",
					icon:'none'
				})
				return false;
			}
			
		},
		methods: {
			delChannel(item){
				uni.showModal({
				    title: '店铺',
				    content: "删除支付通道",
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading();
				            deleteAliPayKey({"channelId":item.channelId,"tenantId":item.tenantId}).then(res=>{
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
			addShopChannel(){
				this.addPayChannel = false
				uni.showLoading()
				addAliPayKey({"aliPayAppId":this.alipay_appid_kay,"alipayPrivateKey":this.alipay_private_kay,
				"alipayPublicKey":this.alipay_public_kay,"tenantId":this.shop.id}).then(res=>{
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
			
			updateGame(item) {
				uni.showLoading();
				let line = 0;
				if(item.line == false){line = 1}	
				updateLine({"id":item.id,"line":line,"tenantId":item.tenantId}).then(res=>{
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
			updateShopRate(){
				let th = this
				uni.showModal({
				    title: '店铺',
				    content: "修改店铺扣款比例",
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading();
				            editShopRate({"id":th.shop.id,"shopRate":th.shop.shopRate}).then(res => {
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
			updateShop(line){
				let th = this
				uni.showModal({
				    title: '店铺',
				    content: "确认操作么",
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading();
				            updateShopLine({"id":th.shop.id,"line":line}).then(res => {
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
			
			addChannel(){
				this.addPayChannel = true
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
				this.addPayChannel = false
			},
			init(){
				shopDetail(this.queryParam).then(res => {
					if(res.success){
						this.shop = res
						let arr = res.ballGames
						this.shop.ballGames.forEach((item,index)=>{
							if(item.line == "0"){
								item.line = true
								return false
							}
							if(item.line == "1"){
								item.line = false
								return false
							}
						})
						
					}
				})
			},
			
			goZhmx(item){
				uni.navigateTo({
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
					url: "/pages/order/lotteryOrder?uid=" + item.id
				});
			},
			goXstj(item){
				uni.navigateTo({
					url: "/pages/proxy/invitation?uid=" + item.id
				});
			},
			goDpyj(item){
				uni.navigateTo({
					url: "/pages/counts/statisticsMain?uid=" + item.id
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
	
	.scyh_class{background-color: #fff;
    text-align: center;
    margin-top: 14px;
    padding: 15px;}
	
	.scyh{padding: 4px 8px;background-color: #d40000;color:#fff}
	
	.kq{padding: 4px 8px;background-color: #00aa00;color:#fff;margin-left: 5px;font-size: 11px;border-radius: 6px;}
	.tz{padding: 4px 8px;background-color: #a2a2a2;color:#fff;margin-left: 5px;font-size: 11px;border-radius: 6px;}
</style>
