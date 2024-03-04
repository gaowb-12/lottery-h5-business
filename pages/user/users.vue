<template>
	<view class="box">
		<nav-bar :title="'店主'" :right-text="'全部用户'" @rightText="rightText" :back="true"></nav-bar>
			<nav-bottom :current="1"></nav-bottom>
			<view class="list-cell b-b m-t" v-for="(item,index) in complaints" :key="index"   hover-class="cell-hover" :hover-stay-time="50" @click="detail(item)">
				<image :src="item.avatar" mode="scaleToFill" border="0" class="my_65"></image>
				<text class="cell-tit">{{item.shopName}}  -  店主:{{item.nickname}}</text>
				<view class="cell_right">
					<!-- <span style="font-size: 26upx;">{{item.shopBalance}}元</span> -->
				</view>
			</view>
			
		<!-- 	<u-modal title="修改用户余额" :show="updateShow" :zoom="false" confirmText="提交" showCancelButton
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
			</u-modal> -->
	</view>
</template>

<script> 
	import {
		getShopers
	} from '@/api/user.js'
	export default {
		data() {
			return {
				radio: '',
				form:"",
				updateShow:false,
				rechargeId:0,
				rechargeMoney:0,
				that: this,
				complaints:[
				],
				//查询条件
				queryParam: {
					pageNo: 1,
					pageSize: 20,
					nickname:""
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
		onLoad() {
			this.init()
		},
		methods: {
			rightText(){
				uni.navigateTo({
				    url:'pages/user/person'
				});
			},
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
			init(){
				getShopers(this.queryParam).then(res => {
					if(res.success){
						this.complaints = res.voList
					}
				})
			},
			
			detail(item){
				console.log(item);
				uni.navigateTo({
					url: "/pages/user/info?uid=" + item.id
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
		background: #f8f8f8;
	}

	.my_65 {
		    white-space: normal;
		    width: 40px;
		    height: 40px;
		    position: absolute;
		    left: 4px;
			border-radius: 6px;
	}

	.list-cell {
		display: flex;
		align-items: baseline;
		padding: 20upx 30upx;
		line-height: 60upx;
		position: relative;
		background: #fff;
		justify-content: center;

		&.log-out-btn {
			margin: 0 auto;
			margin-top: 40upx;
			border-radius: 6px;
			width: 85%;
			line-height: 22px;
			background: #515ffb !important;

			.cell-tit {
				font-size: 16px !important;
				color: #fff !important;
				text-align: center;
				margin-right: 0;
			}
		}

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		&.m-t {
			margin-top: 16upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 28upx + 2upx;
			color: #303133;
			margin-left: 33px;
		}

	}
</style>
