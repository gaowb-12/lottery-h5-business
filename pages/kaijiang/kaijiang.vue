<template>
	<view class="box">
		<nav-bar :title="'开奖'" :back="true"></nav-bar>
		<nav-bottom :current="1"></nav-bottom>
			<web-view src="https://m.310win.com/Trade/DrawInfo/DrawInfoMain.aspx"></web-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {

		},
	}
</script>

<style lang="scss">
	
	uni-web-view.uni-webview--fullscreen {
		margin-top: 3rpx;
		margin-bottom: 146rpx;
	}
</style>
