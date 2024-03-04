<template>
	<view class="box">

		<nav-bar :title="'首页'"></nav-bar>
		<!-- <nav-bottom :current="0"></nav-bottom> -->

		<view class="main-bg">
			<view
				style="border: 2px solid rgb(199, 202, 204); background-color: #FF6266; text-align: center; width: 40%; margin: 1px auto; height: 30px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
				<text style="color: rgb(247, 210, 127); font-weight: bold;">
					<span>线下店铺 实体出票</span>
				</text>
			</view>
			<view style="display: flex; align-items: flex-end; margin: 10px 15px;">
				<view class="dian-name">
					<img :src="shop.logo" alt=""
						style="width: 50px; height: 50px; border: 1px solid white; border-radius: 7px;">
				</view>
				<view>
					<view style="margin-left: 15px;">
						<view style="display: flex; align-items: center;">
							<text style="color: white;">
								<span>{{shop.name}}</span>
							</text>
							<view
								style="background-color: rgb(247, 225, 174); border-radius: 4px; margin-left: 7px; display: flex; align-items: center; justify-content: center; height: 15px; padding: 0px 5px;">
								<view
									style="background-color: rgb(188, 149, 68); width: 11px; height: 11px; border-radius: 11px;">
									<view class="cuIcon-check" style="font-size: 10px; color: white;"></view>
								</view>
								<view style="font-size: 10px; color: rgb(188, 149, 68); margin-left: 5px;">已认证</view>
							</view>
						</view>
						<view style="display: flex; margin-top: 15px;">
							<view
								style="background-color: #FF777A; display: flex; height: 22px; line-height: 22px; border-radius: 45px; align-items: center; padding: 0px 7px;">
								<text style="color: white; font-size: 11px; margin-right: 2px;">
									<span>评分</span>
								</text>
								<u-rate active-color="rgb(246, 203, 86)" :minCount="5" value="5"></u-rate>
								<u-icon name="arrow-right" color="rgb(212, 233, 253)" size="14"></u-icon>
								<span></span>
								</text>
							</view>
							<!-- <view @click="complaint"
								style="background-color: #FF777A; margin-left: 10px; height: 22px; line-height: 22px; border-radius: 45px; padding: 0px 10px;">
								<text style="color: white;">
									<span>投诉</span>
								</text>
							</view> -->
						</view>
					</view>
					<view></view>
				</view>
			</view>
			<view
				style="position: absolute; left: 0px; right: 0px; bottom: 0px; background-color: #FF777A; height: 65px; margin: 0px 7px; border-radius: 10px 10px 0px 0px; display: flex; justify-content: space-around; align-items: center;">
				<!-- <view style="display: flex; flex-direction: column; align-items: center;" @tap="callPhone(0)">
					<view
						style="background-color: white; width: 30px; height: 30px; border-radius: 30px; display: flex; justify-content: center; align-items: center;">
						<img src="@/static/images/home/phone.png" alt="" style="width: 20px; height: 20px;">
					</view>
					<view style="color: white; padding-top: 2px;">联系店主</view>
				</view> -->
				
				<view  v-clipboard:copy="user.shopkeeperWechat"
				    v-clipboard:success="(type) => onCopyResult('success')"
				    v-clipboard:error="(type) => onCopyResult('error')"
				 style="display: flex; flex-direction: column; align-items: center;" >
					<view
						style="background-color: white; width: 30px; height: 30px; border-radius: 30px; display: flex; justify-content: center; align-items: center;">
						<img src="@/static/images/home/wx.png" alt="" style="width: 20px; height: 20px;">
					</view>
					<view style="color: white; padding-top: 2px;">添加微信</view>
				</view>
				
				<view style="display: flex; flex-direction: column; align-items: center;" @click="complaint(2)"  v-if="user.isAgent != '1'" >
					<view
						style="background-color: white; width: 30px; height: 30px; border-radius: 30px; display: flex; justify-content: center; align-items: center;">
						<img src="@/static/images/home/tousu.png" alt="" style="width: 20px; height: 20px;">
					</view>
					<view style="color: white; padding-top: 2px;">投诉</view>
				</view>
				
				<view style="display: flex; flex-direction: column; align-items: center;" @click="complaint(1)" v-else="user.isAgent == '1'">
					<view
						style="background-color: white; width: 30px; height: 30px; border-radius: 30px; display: flex; justify-content: center; align-items: center;">
						<img src="@/static/images/home/tousu.png" alt="" style="width: 20px; height: 20px;">
					</view>
					<view style="color: white; padding-top: 2px;">投诉列表</view>
				</view>
				
				<view style="display: flex; flex-direction: column; align-items: center;" @tap="invitation"  v-if="user.isAgent=='2'">
					<view
						style="background-color: white; width: 30px; height: 30px; border-radius: 30px; display: flex; justify-content: center; align-items: center;">
						<img src="@/static/images/home/invite.png" alt="" style="width: 15px; height: 15px;">
					</view>
					<view style="color: white; padding-top: 2px;">邀请好友</view>
				</view>
			</view>
		</view>
		<uni-notice-bar :speed="30" color="#fff" showIcon background-color="#515ffb" scrollable single
			:text="noticeMsg">
		</uni-notice-bar>
		<view>
			<u-swiper :list="list1" indicator indicatorMode="dot" height="100" duration="800" radius="0"></u-swiper>
		</view>
		<uni-card is-shadow class="card">
			<view style="display: flex;justify-content:space-between;align-items: center;">
				<view style="display: flex;align-items: center;justify-content: center;margin: 5px 10px;">
					<image src="@/static/images/home/ticai.png" style="width: 25px;height: 25px;"></image>
					<view style="color: rgb(51, 51, 51);">体育彩票</view>
				</view>
				<view class="noticeBar">
					<swiper class="list" circular="true" vertical="true" autoplay="true" interval="3000"
						duration="1000">
						<swiper-item v-for="item in noticeList" :key="item.id" @click="handleInfo(item.id)">
							{{ item.msg }}
						</swiper-item>
					</swiper>
				</view>
			</view>
			<u-grid :border="false" col="4">
				<u-grid-item v-for="(item,index)  in ballList" customStyle="padding-top: 5px; padding-bottom: 5px"
					:key="index" @click="ballBtn(item)">
					<image style="width: 50px; height: 50px;" :src="item.url"></image>
					<text style="color: rgb(51, 51, 51);" class="grid-text">{{item.name}}</text>
				</u-grid-item>
			</u-grid>
		</uni-card>
		<!-- <uni-card is-shadow class="card">
			<view>
				<span>赛事情报</span>
			</view>
			<view class="sai">
				<view class="title" @tap="navClick('/pages/score/score')">
					<view class="body">
						<span class="font">足球赛事</span>
						<span style="color: rgb(51, 51, 51);">实时赛事</span>
					</view>
					<view class="img">
						<image style="width: 45px; height: 45px;"
							src="https://img1.baidu.com/it/u=1654964033,3385170305&fm=253&fmt=auto&app=138&f=JPEG?w=551&h=500">
						</image>
					</view>
				</view>
				<view class="title" @tap="navClick('/pages/score/score')">
					<view class="body">
						<span class="font">篮球赛事</span>
						<span style="color: rgb(51, 51, 51);">实时赛事</span>
					</view>
					<view class="img">
						<image style="width: 80px; height: 60px;"
							src="https://img0.baidu.com/it/u=280934613,2242225982&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=424">
						</image>
					</view>
				</view>
			</view>
		</uni-card> -->
		
		<uni-card is-shadow class="card">
			<view>
				<span>昨日红榜</span>
			</view>
			<view class="top-three">
				
				<view class="user-box second">
					<image class="user-crown" src="@/static/images/home/yin.png" mode="aspectFill"></image>
					<view class="user-img-box">
						<image class="user-img" :src = topTwo.avatar mode="aspectFill"></image>
					</view>
					<view class="user-name">{{topTwo.userNickName}}</view>
					<view class="user-name">{{topTwo.totalWinningPrice}}</view>
				</view>
				<view class="user-box first">
					<image class="user-crown" src="@/static/images/home//jin.png" mode="aspectFill"></image>
					<view class="user-img-box">
						<image class="user-img" :src = topOne.avatar mode="aspectFill"></image>
					</view>
					<view class="user-name">{{topOne.userNickName}}</view>
					<view class="user-name">{{topOne.totalWinningPrice}}</view>
				</view>
				<view class="user-box third">
					<image class="user-crown" src="@/static/images/home/tong.png" mode="aspectFill"></image>
					<view class="user-img-box">
						<image class="user-img" :src = topThree.avatar mode="aspectFill"></image>
					</view>
					<view class="user-name">{{topThree.userNickName}}</view>
					<view class="user-name">{{topThree.totalWinningPrice}}</view>
				</view>
			</view>
			<view class="rank-list">
				<!-- <view class="rank-item head">
					<view class="num"></view>
					<view class="user">
						<view class="username">名字</view>
						<view></view>
					</view>
					<view class="lv">等级</view>
					<view class="score">分数</view>
				</view>
				<view class="rank-item" v-for="(item,index) in 5">
					<view class="num">{{index+1}}</view>
					<view class="user">
						<image class="user-img" src="/static/user.png" mode="aspectFill"></image>
						<view class="username">名字</view>
					</view>
					<view class="lv">{{index+1}}</view>
					<view class="score">100</view>
				</view> -->
				<!-- <view class="rank-item">
					<view class="num">11221</view>
					<view class="user">
						<image class="user-img" src="/static/user.png" mode="aspectFill"></image>
						<view class="username">名字111111111</view>
					</view>
					<view class="lv">332233322311</view>
					<view class="score">1001133223</view>
				</view> -->
			</view>
			
		</uni-card>
		
		
		
		<image style="width: 100%; height: 90px;margin-top: 30px;" src="../../static/images/home/8.png" ></image>
		
		<!-- <u-popup :show="show" round bgColor="transparent" @close="show=false" mode="center">
			<image src="@/static/images/home/lianxi.png"></image>
		</u-popup> -->
	</view>
</template>

<script>
	
	import {
		ballList
	} from '@/api/ballgame.js'
	import {
		noticeList
	} from '@/api/notice.js'
	import {
		centre
	} from '@/api/lotteryOrder.js'
	import {
		getUser,
		yesterdayWinningList
	} from "@/api/user.js"
	
	import {
		getUserInfo,
		setUserInfo
	} from "@/util/auth.js"
	export default {
		data() {
			return {
				shop: {},
				show: false,
				noticeList: [],
				topOne:{},
				topTwo:{},
				topThree:{},
				list1: [
					require('@/static/images/home/banner8.png'),
					require('@/static/images/home/banner1.png'),
					'https://img0.baidu.com/it/u=956770624,438600488&fm=253&fmt=auto&app=138&f=JPG?w=558&h=369',
					require('@/static/images/home/banner2.png'),
					require('@/static/images/home/banner3.png'),
					require('@/static/images/home/banner4.png'),
					require('@/static/images/home/banner6.png'),
				],
				ballList: [],
				noticeMsg: "",
				user:{}
			}
		},
		//下完单后返回到该页面数据进行重置
		onShow() {
			let isPay = uni.getStorageSync('isPay');
			if (isPay) {
				//删除标识
				uni.removeStorageSync('isPay');
			}
			this.inits()
			this.yesterday()
		},
		methods: {
			yesterday(){
				yesterdayWinningList().then(res => {
					let list = res.voList
					let tha = this
					list.forEach((item,index)=>{
						if(index == 0){tha.topOne = item}
						if(index == 1){tha.topTwo = item}
						if(index == 2){tha.topThree = item}
					})
					console.log(tha.topOne);
				})
			},
			inits() {
				getUser().then(res => {
					if(res.status=="1"){
						this.logout();
					}
					setUserInfo(res);
					this.user = res
				})
			},
			onCopyResult(type) {
			    if (type==='success') {
			       uni.showToast({
						title: '复制成功！',
						icon: 'none'
					});
			    } else {
			         uni.showToast({
						title: '复制失败！',
						icon: 'none'
					});
			    }
			},
			
			callPhone(phone) {
				window.location.href = 'tel://13604426050' // + phone
			},
			complaint(index) {
				if(index==1){
					uni.navigateTo({
						url: '/pages/complaint/list',
						animationType: 'pop-in',
						animationDuration: 200
					})
				}
				if(index==2){
					uni.navigateTo({
						url: '/pages/complaint/index',
						animationType: 'pop-in',
						animationDuration: 200
					})
				}
				
			},
			invitation() {
				uni.navigateTo({
					url: '/pages/personal/share',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			navClick(url) {
				uni.navigateTo({
					url: url,
					animationType: 'pop-in',
					animationDuration: 200
				})

			},
			init() {
				uni.showLoading();
				ballList().then(res => {
					this.ballList = res.voList
				})
				noticeList().then(res => {
					this.noticeMsg = res.voList[0].msg
				})
				centre().then(res => {
					this.noticeList = res.voList;
				})
				setTimeout(function() {
					uni.hideLoading();
				}, 500);
			},
			ballBtn(item) {
				if (item.name == "竞彩足球") {
					uni.navigateTo({
						url: "/pages/football/football"
					});
				} else if (item.name == "竞彩篮球") {
					uni.navigateTo({
						url: "/pages/basketball/basketball"
					});
				} else if (item.name == "北京单场") {
					uni.navigateTo({
						url: "/pages/beidan/beidan"
					});
				} else if (item.name == "排列3") {
					uni.navigateTo({
						url: "/pages/pailie/pailie3"
					});

				} else if (item.name == "排列5") {
					uni.navigateTo({
						url: "/pages/pailie5/pailie5"
					});
				} else if (item.name == "七星彩") {
					uni.navigateTo({
						url: "/pages/qxc/qxc"
					});
				} else if (item.name == "足球14场") {
					uni.navigateTo({
						url: "/pages/winburden/winburden"
					});
				} else if (item.name == "任选九") {
					uni.navigateTo({
						url: "/pages/victorydefeat/victorydefeat"
					});
				} else if (item.name == "大乐透") {
					uni.navigateTo({
						url: "/pages/dlt/dlt"
					});
				} else {
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					});
				}
			}
		},
		onLoad() {
			this.init();
			//如果登录过的直接显示从缓存中取出店铺信息的logo
			this.shop = uni.getStorageSync("shop");
		}

	}
</script>

<style scoped lang="scss">
	// .box {
	// 	padding-bottom: 55px;
	// }

	/deep/.uni-card .uni-card__content {
		padding: 0px;
	}

	/deep/.uni-swiper-slide-frame {
		text-align: right;
	}

	.noticeBar {
		width: 55%;
		height: 50rpx;
		line-height: 50rpx;
		color: #999;
		font-size: 24rpx;

		.list {
			width: 100%;
			height: 100%;
		}
	}

	/deep/.uni-card {
		padding: 0px !important;
	}

	.main-bg {
		height: 175px;
		background-color: #515ffb;
		position: relative;
		margin-top: 0;
	}

	.uni-noticebar {
		margin-bottom: 0px;
	}

	/deep/image>img {
		// 提高图片清晰度
		image-rendering: -moz-crisp-edges;
		/* Firefox */
		image-rendering: -o-crisp-edges;
		/* Opera */
		image-rendering: -webkit-optimize-contrast;
		/* Webkit (non-standard naming) */
		image-rendering: crisp-edges;
		-ms-interpolation-mode: nearest-neighbor;
		/* IE (non-standard property) */
	}

	.card {
		margin: 0px !important;
	}

	.noticebar {
		margin-bottom: 0px !important;
	}

	.sai {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.title {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.body {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.card {
		margin-top: 30rpx !important;
	}

	.img {
		margin-left: 20rpx;
	}

	/deep/.font {
		color: #515ffb !important;
	}
</style>

<style scoped lang="scss">
	/* 	#cdcdcd 
	#ebe03d
	#b09478 */

	.top-three {
		display: flex;
		justify-content: center;
		margin: 60rpx auto;
		.user-box {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			&.first{
				position: relative;
				top: -30px;
				z-index: 99;
			}
			&.second{
				position: relative;
				right: -20rpx;
			}
			&.third{
				position: relative;
				left: -20rpx;
			}
			.user-crown {
				width: 60rpx;
				height: 60rpx;
			}
			
			.user-name{
				max-width: 200rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-top: 10px;
			}
			.user-img-box {
				position: relative;
				width: 80px;
				height: 80px;
				margin: 7px 19px;
				.user-img {
					width: 150rpx;
					height: 150rpx;
					box-sizing: border-box;
					border: 4rpx solid #cc0439;
					border-radius: 50%;
					background: #ccc;
					
				}

				.ranking-number {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					box-sizing: border-box;
					position: absolute;
					top: 0rpx;
					right: 0rpx;
					z-index: 33;
					// background: #fff;
					font-size: 26rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					&.first{
						background: #ebe03d;
					}
					&.second{
						background: #cdcdcd;
						position: absolute;
						left: 10px;
						background: #cdcdcd;
					}
					&.third{
						background: #b09478;
					}
				}
			}

		}
	}
	
	.rank-list{
		width: 90%;
		.rank-item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10rpx; 
			&:nth-child(2n){
				background: #ffe5eb;
			}
			
			&.head{
				font-weight: bold;
			}
			.num{
				padding: 0 10rpx;
				// display: flex;
				// align-items: center;
				width: 100rpx;
				// flex-wrap: wrap;
				box-sizing: border-box;
				word-break: break-all;
				
			}
			.user{
				display: flex;
				align-items: center;
				width: 500rpx;
				padding:0 10rpx;
				
				.username{
					max-width: 200rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				
				.user-img{
					width: 120rpx;
					height: 120rpx;
					box-sizing: border-box;
					border-radius: 50%;
					border: 2rpx solid #cc0439;
					margin-right: 20rpx;
				}
			}
			.lv{
				padding:0 10rpx;
				text-align: left;
				width: 100rpx;
				word-break: break-all;
			}
			.score{				
				width: 100rpx;
				word-break: break-all;
				padding:0 10rpx;
				text-align: right;
			}
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

</style>