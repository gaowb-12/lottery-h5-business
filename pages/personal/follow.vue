<template>
	<view class="box">
		<nav-bar :title="title" :back="true"></nav-bar>
		<view v-if="userData.length<=0">
			<u-empty icon="http://cdn.uviewui.com/uview/empty/data.png" :show="userData.length<=0" mode="data"
				text="没有数据"></u-empty>
		</view>
		<view v-else v-for="(user,index) in userData" :key="index" style="width: 90%; margin: 10px auto;" @tap="queryInfo(user.id)">
			<view style="display: flex;align-items: center;justify-content: flex-start">
				<u-avatar size="50" :src="user.avatar"></u-avatar>
				<text style="font-size: 14px; padding-left: 10px;">{{user.nickname}}</text>
			</view>
			<u-line style="margin-top: 5px;"></u-line>
		</view>
	</view>
</template>

<script>
	import {
		followList
	} from '@/api/follow.js'
	export default {
		data() {
			return {
				title: "",
				userData: []
			}
		},
		onLoad(option) {
			let obj = JSON.parse(decodeURIComponent(option.obj));
			this.init(obj)
		},
		methods: {
			queryInfo(id) {
				uni.navigateTo({
					url: "/pages/documentary/homePage?uid=" + id
				})
			},
			init(obj) {
				uni.showLoading();
				followList(obj.type).then(res => {
					this.userData = res.voList
					this.title = obj.title + "（" + this.userData.length + "）"
					setTimeout(function() {
						uni.hideLoading();
					}, 200);
				})
			},
		}
	}
</script>

<style scoped lang="less">
	page {
		font-size: 15px;
		color: #333;
		font-family: Helvetica Neue, Helvetica, sans-serif;
	}

	/deep/.u-empty {
		margin-top: 50% !important;
	}
</style>
