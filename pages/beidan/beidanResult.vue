<template>
	<view class="box">
		<cmd-nav-bar title="北单开奖" :back="true" font-color="#fff" background-color="#515ffb">
		</cmd-nav-bar>
		<web-view src="https://m.okooo.com/kaijiang/sport.php?LotteryType=WDL"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
		},
	}
</script>

<style lang="scss">
</style>
