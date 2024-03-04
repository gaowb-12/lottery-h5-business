<template>
	<!-- 头部导航栏 -->
	<view>
		<!-- 支付宝会出现二个导航栏所以这里直接去掉 -->
		<!-- #ifndef MP-ALIPAY-->
		<cmd-nav-bar :left-text="leftText" @leftText="leftTextClick" @rightText="rightTextClick" :right-text="rightText" :back="back" :title="title" font-color="#fff"
			background-color="#515ffb">
		</cmd-nav-bar>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			title: String,
			back: {
				type: Boolean,
				default: false
			},
			leftText: {
				type: String,
				default: ""
			},
			rightText: {
				type: String,
				default: ""
			}
		},
		methods: {
			leftTextClick() {
				uni.navigateBack();
			},
			rightTextClick() {
				this.$emit('rightText')
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
