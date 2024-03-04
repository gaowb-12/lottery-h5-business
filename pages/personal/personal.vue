<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view class="box">
		<nav-bottom :current="3"></nav-bottom>
		<cmd-nav-bar title="管理" font-color="#fff" background-color="#515ffb">
		</cmd-nav-bar>

		<view class="YmContent">
			<view class="my_1">
				<view class="my_3">
					<image style="border-radius: 50%;" :src="user.avatar" mode="scaleToFill" border="0" class="my_4">
					</image>
					<view class="my_5">
						<text decode="true" class="my_7"></text>
						<text id="fen" class="my_7">
							超级管理员
						</text>
					</view>
					</image>
				</view>
				<view class="my_2">
					<view class="my_99" style="height: 100%;">
						<span style="color:#6a6a6a;font-size: 16px;">订单</span>
					</view>
					<view class="my_23" style="display: flex;align-items: center;justify-content: space-between;">
						<view class="my_24">
							<image v-on:click="navClick('/pages/order/lotteryOrder')"
								src="/static/images/personal/personal/orderManger.png" mode="scaleToFill" border="0"
								class="my_25">
							</image>
							<text decode="true" class="my_26">所有</text>
						</view>
						<view class="my_24">
							<image v-on:click="navClick('/pages/order/waitTicket')"
								src="/static/images/personal/personal/ticket.png" mode="scaleToFill" border="0"
								class="my_25">
							</image>
							<text decode="true" class="my_26">待出票</text>
						</view>
						<view class="my_24">
							<image v-on:click="navClick('/pages/order/waitAward')"
								src="/static/images/personal/personal/wait.png" mode="scaleToFill" border="0"
								class="my_25">
							</image>
							<text decode="true" class="my_26">待派奖</text>
						</view>
					</view>

					<view class="my_99" style="height: 100%;">
						<span style="color:#6a6a6a; font-size: 16px;">财务</span>
					</view>
					<view class="my_23" style="display: flex;align-items: center;justify-content: space-between;">
						<view class="my_24">
							<image v-on:click="navClick('/pages/pay/withdrawalRecord')"
								src="/static/images/personal/personal/cash.png" mode="scaleToFill" border="0"
								class="my_25">
							</image>
							<text decode="true" class="my_26">提现申请</text>
						</view>
					</view>
					<view class="my_99" style="height: 100%;">
						<span style="color:#6a6a6a; font-size: 16px;">赛事信息</span>
					</view>
					<view class="my_23" style="display: flex;align-items: center;justify-content: space-between;">
						<view class="my_24">
							<image @click="navClick2(1)" src="/static/images/personal/personal/football.png" border="0"
								class="my_25">
							</image>
							<text decode="true" class="my_26">足球赛事设置</text>
						</view>
						<view class="my_24">
							<image @click="navClick2(2)" src="/static/images/personal/personal/basketball.png"
								border="0" class="my_25">
							</image>
							<text decode="true" class="my_26">篮球赛事设置</text>
						</view>
						<view class="my_24">

						</view>
					</view>


					<view class="my_99" style="height: 100%;">
						<span style="color:#6a6a6a; font-size: 16px;">店铺</span>
					</view>
					<view class="my_23" style="display: flex;align-items: center;justify-content: space-between;">

						<view class="my_24">
							<image v-on:click="navClick('/pages/shop/createShop')"
								src="/static/images/personal/personal/addShop.png" mode="scaleToFill" border="0"
								class="my_25">
							</image>
							<text decode="true" class="my_26">创建店铺</text>
						</view>
						<view class="my_24">
							<image v-on:click="navClick('/pages/shop/shopList')"
								src="/static/images/personal/personal/shopManger.png" mode="scaleToFill" border="0"
								class="my_25">
							</image>
							<text decode="true" class="my_26">店铺设置</text>
						</view>
						<view class="my_24">
							<!-- <image v-on:click="navClick('/pages/shop/shopList')"
								src="/static/images/personal/personal/shopManger.png" mode="scaleToFill" border="0" class="my_25">
							</image>
							<text decode="true" class="my_26">店铺设置</text> -->
						</view>
					</view>

					<view class="my_99" style="height: 100%;">
						<span style="color:#6a6a6a;font-size: 16px;">站点</span>
					</view>
					<view class="my_23" style="display: flex;align-items: center;justify-content: space-between;">
						<view class="my_24">
							<image v-on:click="navClick('/pages/station/index')"
								src="/static/images/personal/personal/setting.png" mode="scaleToFill" border="0"
								class="my_25">
							</image>
							<text decode="true" class="my_26">站点设置</text>
						</view>
					</view>
					<view class="my_49" style="height: 100%;">
						<view class="my_62" @click="logout">
							<image src="/static/images/personal/logout.png" mode="scaleToFill" border="0" class="my_63">
							</image>
							<text decode="true" class="my_64">退出登录</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<u-popup :show="isShow" mode="bottom" @close="isShow = false" closeable>
			<uni-card style="margin-top: 40px;">
				<view style="height: 450px;overflow-y: scroll;font-size: 14px;color: #6a6a6a;line-height: 22px;">
					您当前下单店铺是线下正规实体店出票，机器打票和兑奖都是人工操作，因大型赛事订单激增，店主需要时间处理您的订单和提现等问题，请您不必担心资金安全。 Q:为什么我下单了却没有出票?
					因大型赛事期间订单量暴增，店主会按先后顺序打票。开赛前一小时是打票高峰期，可能会存在订单量过多，来不及出票的情况，机器截止打票后，未出票订单会撤单并自动退回钱款自动至您的AP
					P，有问题可联系店主。另，因来不及出票而导致撤单的订单，店主与平台无任何责任赔付，请您知晓。为保障您的良好体验，热门赛事可提前两小时下单，避开打票高峰期。
					<br>
					<br>
					Q:为什么充值(扣款成功)没有到账?
					因大型赛事期间下单人数过多，支付易造成拥堵甚至触发风控警。告，提示异常等，扣款成功后也可能会存在延迟到账的正常情况。请您不必惊慌，资金安全，无需着急投诉，平台运作正常。未成功生成订单的钱款会在24小时内自动返还至您的app账户，若超过24小时未收到退款，可联系店主反馈。为了保证您的良好体验，您可在赛前两小时先充值，再下单，规避高峰充值期。
					<br>
					<br>
					Q:我中奖了什么时候可以兑奖?
					比赛结束后系统会自动计算结果，店主确认无误后即可派奖，届时您可提现，请您耐心等待。
					<br>
					<br>
					Q:我中奖了，为什么没有收到奖金?
					中奖后，您需申请提现，店主收到请求后，会尽快处理。但因大型赛事期间订单过多，可能会存在无法第一时间处理的正常情况，建议您:1.大额奖金可提前单独联系店主处理;2.小额奖金可累计下单，或避开提现高峰期时申请。店主收到您的提现请求后，若发现问题，如中奖金额不符，已私下转过账等，有权驳回;若您需要提现帮助，可提交证据，申请平台介入处理。另外，店主通过您的提现申请后，因支付宝/银行卡/微信转账需要时间，且有每日转账限额，可能24小
					内无法转账成功，请您无需着急，耐心等待即可。
				</view>
			</uni-card>
		</u-popup>
	</view>
</template>

<script>
	import {
		logout,
		getUser,
		getTenantId
	} from "@/api/user.js"
	import {
		getUserInfo,
		setUserInfo,
		removeAuthtoken,
		removeUserInfo,
		removeExternalLogintoken
	} from "@/util/auth.js"
	export default {
		data() {
			return {
				user: {},
				isShow: false,
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			rightText() {
				this.isShow = true;
			},
			init() {
				getUser().then(res => {
					if (res.status == "1") {
						this.logout();
					}
					setUserInfo(res);
					this.user = res
					console.log(this.user)
				})
			},
			navClick(url) {
				uni.navigateTo({
					url: url,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			navClick2(num) {
				if (num === 1) {
					uni.navigateTo({
						url: '/pages/personal/setfootballsaiguo?userId=' + this.user.id + '&tenantId=' + this.user
							.tenantId,
						animationType: 'pop-in',
						animationDuration: 200
					})
				} else {
					uni.navigateTo({
						url: '/pages/personal/setbasketballsaiguo?userId=' + this.user.id + '&tenantId=' + this.user
							.tenantId,
						animationType: 'pop-in',
						animationDuration: 200
					})
				}
			},
			navTap(url, type) {
				var obj = {};
				if (type == "0") {
					obj.title = "我的关注"
				} else {
					obj.title = "我的粉丝"
				}
				obj.type = type;
				uni.navigateTo({
					url: url + "?obj=" + encodeURIComponent(JSON.stringify(obj)),
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			logout() {
				uni.showLoading();
				logout().then(res => {
					if (res.success) {
						removeAuthtoken();
						removeExternalLogintoken();
						removeUserInfo();
						setTimeout(() => {
							uni.redirectTo({
								url: "/pages/user/login"
							});
							this.btnDisabled = false;
							uni.hideLoading();
						}, 500)
					}
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	/deep/.cmd-nav-bar-right-text {
		font-size: 16px !important;
	}

	@import '@/style/personal/personal.scss';

	.kefu {
		padding: 30px;
		border-radius: 30px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		border: none;
		background: linear-gradient(90deg, rgba(131, 58, 180, 0.5830707282913166) 0%, rgba(255, 63, 67, 0.9500175070028011) 50%, rgba(252, 176, 69, 0.835171568627451) 100%);
	}

	#fen {
		font-size: 12px;
		letter-spacing: 0.2rem;
		background-image: -webkit-linear-gradient(left, #fff, #6665f6 25%, #fff 50%, #6665f6 75%, #fff);
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		-webkit-background-size: 200% 100%;
		-webkit-animation: maskedAnimation 4s infinite linear;

		@keyframes maskedAnimation {
			0% {
				background-position: 0 0;
			}

			100% {
				background-position: -100% 0;
			}
		}
	}

	.my_26 {
		// width: 5px;
	}
</style>