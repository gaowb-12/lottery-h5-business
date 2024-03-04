<template>
	<view class="box">
		
			<nav-bar :title="'投诉列表'" :back="true"></nav-bar>
			
			<view class="list-cell b-b m-t" v-for="(item,index) in complaints" :key="index"  @click="navTo(item)" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">{{item.title}}</text>
				<text class="cell-tit">{{item.userName}}</text>
				<text class="cell-tit">{{item.addTime|formatDate(that)}}</text>
				<image src="/static/images/personal/my_40_40.jpg" mode="scaleToFill" border="0" class="my_65"></image>
			</view>
			
		
	</view>
</template>

<script>
	import {
		getComplaints
	} from '@/api/user.js'
	export default {
		data() {
			return {
				that: this,
				complaints:[],
				//查询条件
				queryParam: {
					userId: 1,
					state: "",
					startTime: "",
					endTime: "",
					pageNo: 1,
					pageSize: 20
				},
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
			init(){
				getComplaints(this.queryParam).then(res => {
					if(res.success){
						this.complaints = res.voList
					}
				})
			},
			//跳转
			navTo(item) {
				uni.navigateTo({
					url: '/pages/complaint/details?id='+item.id,
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
		width: 14px;
		height: 15px;
		padding: 0px;
		margin-top: 9px;
		margin-left: 54px;
		float: left;
		border-radius: 0px;
		font-size: 14px;
		line-height: 15px;
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
			margin-right: 10upx;
		}

	}
</style>
