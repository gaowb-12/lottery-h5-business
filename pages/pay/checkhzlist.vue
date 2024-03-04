<template>
	<view class="box">
		<nav-bar :title="'提现订单列表'" :back="true"></nav-bar>

		<view class="">
			<u-button
				:custom-style="{background:'#515ffb',color:'#fff',width:'300upx',display: 'block',lineHeight:'75upx',margin: ' 20px'}"
				@click="handlerFz">点我复制列表数据</u-button>
		</view>

		<uni-table border stripe emptyText="暂无更多数据" class="table">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center">姓名</uni-th>
				<uni-th align="center">银行卡号</uni-th>
				<uni-th align="center">提现金额</uni-th>
				<uni-th align="center">手机号</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->

			<uni-tr class="myTr" v-for="item in hzList" :key="item.id">
				<uni-td align="center"><text>{{ item.name }}</text></uni-td>
				<uni-td align="center"><text>{{ item.bankNumber }}</text></uni-td>
				<uni-td align="center"><text>{{ item.amount }}</text></uni-td>
				<uni-td align="center"><text>{{ item.phone }}</text></uni-td>
			</uni-tr>


		</uni-table>
	</view>
</template>

<script>
	import navBar from "@/components/nav-bar/nav-bar.vue"
	export default {
		components: {
			navBar
		},
		data() {
			return {
				hzList: []
			}
		},
		onLoad(option) {
			if (option.query) {
				this.hzList = JSON.parse(JSON.parse(option.query).list);
				console.log(this.hzList)
			}
		},
		methods: {
			handlerFz() {
				let newlist = this.hzList.map((item, index) => {
					let keys = {
						name: "姓名",
						bankNumber: "银行卡号",
						amount: "提现金额",
						phone: "联系方式"
					}
					let obj = {};
					let titleKeys = Object.values(keys);
					obj[titleKeys[0]] = item.name;
					obj[titleKeys[1]] = item.bankNumber;
					obj[titleKeys[2]] = item.amount;
					obj[titleKeys[3]] = item.phone;
					return obj;
				})
				uni.setClipboardData({
					data: JSON.stringify(newlist),
					success: function() {
						console.log('success');
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.box {
		width: 100%;

	}

	.table {
		width: 100%;
		user-select: all;
		-moz-user-select: all;
		-webkit-user-select: all;
		-ms-user-select: all;
		-ms-user-select: all;
	}

</style>


