<template>
	<view class="box">
		<nav-bar :title="'用户'" :back="true"></nav-bar>
		<view class="search">
			<view class="info">昵称</view>
			<view><u-input v-model="queryParam.nickname" clearable /> </view>
			<view class="info">号码</view>
			<view><u-input type="number" v-model="queryParam.phone" clearable /> </view>
			<view><u-button size="mini" type="primary" @click="init">搜索</u-button></view>
		</view>
		<view class="list-cell b-b m-t" v-for="(vo,customersindex) in complaints" :key="customersindex"
			hover-class="cell-hover" :hover-stay-time="50" @click="detail(vo)">
			<image :src="vo.avatar" mode="scaleToFill" border="0" class="my_65"></image>
			<text class="cell-tit">
				{{vo.nickname}}
				<span v-if="vo.moni == 1" style="color:red;margin-left: 10px;">模拟</span>
			</text>
			<view class="cell_right">
				<span style="font-size: 26upx;">{{vo.price}}元</span>
			</view>
		</view>

		<u-modal title="修改用户余额" :show="updateShow" :zoom="false" confirmText="提交" showCancelButton
			confirmColor="#515ffb" @confirm="shopRecharge()" @cancel="cancle()">
			<u-form :model="form" ref="uForm">
				<u-form-item label="输入金额"><u-input type="number" v-model="rechargeMoney" /></u-form-item>
				<u-form-item label="类型">
					<u-radio-group v-model="radio">
						<u-radio v-for="(va, index) in radioList" :key="index" :name="va.value">
							{{ va.name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
			</u-form>
		</u-modal>
	</view>
</template>

<script>
	import {
		getUserList
	} from '@/api/user.js'
	export default {
		data() {
			return {
				radio: '',
				form: "",
				updateShow: false,
				rechargeId: 0,
				rechargeMoney: 0,
				that: this,
				complaints: [],
				//查询条件
				queryParam: {
					nickname: "",
					phone:undefined,
					userId: 0,
					pageNo: 1,
					pageSize: 20
				},
				radioList: [{
						value: '0',
						name: '加款'
					},
					{
						value: '1',
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
			this.init()
		},
		methods: {
			detail(item) {
				uni.navigateTo({
					url: "/pages/user/info?uid=" + item.id
				});
			},
			init() {
				getUserList(this.queryParam).then(res => {
					if (res.success) {
						this.complaints = res.voList
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
    .search {
		width: 100%;
		margin-top: 6px;
		/* padding-right: 4px; */
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		.u-input {
			background: #fff;
			width: 80%;
			height: 30rpx;
		}
	}
	.my_65 {
		/* white-space: normal;
		width: 14px;
		height: 15px;
		padding: 0px;
		margin-top: 9px;
		float: left;
		border-radius: 0px;
		font-size: 14px;
		line-height: 15px; */
		white-space: normal;
		width: 40px;
		height: 40px;
		position: absolute;
		left: 0px;
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

	.info {
		padding: 2px 4px;
		width: 70rpx;
		color: #4f66ff;
	}
	/deep/ .uni-input-input {
		font-size: 12px;
	}
</style>