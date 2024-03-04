<template>
	<view class="box">
		<cmd-nav-bar @iconOne="iconOneBtn" iconOne="search" title="跟单大厅" font-color="#fff" background-color="#515ffb">
		</cmd-nav-bar>
		<nav-bottom :current="2"></nav-bottom>
		<view class="content">
			<scroll-view>
				<view style="white-space: nowrap;">
					<uni-card is-shadow class="desc">
						<view class="topic">
							<image class="img" src="@/static/images/documentary/tuijian.png"></image>
							<span class="title">推荐专家</span>
						</view>
						<view class="topic" v-for="item in rankingData.expertUserList" :key="item.id"
							@tap="queryInfo(item.id)">
							<view style="display: flex; flex-direction: column; align-items: center;">
								<view>
									<u-avatar size="31" :src="item.avatar"></u-avatar>
								</view>
								<span style="font-size: 13px; white-space: nowrap;">
									{{item.nickname}}</span>
							</view>
						</view>
					</uni-card>
					<uni-card is-shadow class="desc">
						<view class="topic">
							<image class="img" src="@/static/images/documentary/lianhong.png"></image>
							<span class="title">连红榜</span>
						</view>
						<view class="topic" v-for="item in rankingData.lianHongUserList" :key="item.id"
							@tap="queryInfo(item.id)">
							<view style="display: flex; flex-direction: column; align-items: center;">
								<view>
									<u-avatar size="31" :src="item.avatar"></u-avatar>
								</view>
								<span style="font-size: 13px; white-space: nowrap;">{{item.nickname}}</span>
							</view>
						</view>
					</uni-card>
					<uni-card is-shadow class="desc">
						<view class="topic">
							<image class="img" src="@/static/images/documentary/shenglv.png"></image>
							<span class="title">胜率榜</span>
						</view>
						<view class="topic" v-for="item in rankingData.winUserList" :key="item.id"
							@tap="queryInfo(item.id)">
							<view style="display: flex; flex-direction: column; align-items: center;">
								<view>
									<u-avatar size="31" :src="item.avatar"></u-avatar>
								</view>
								<span style="font-size: 13px; white-space: nowrap;">{{item.nickname}}</span>
							</view>
						</view>
					</uni-card>
					<uni-card is-shadow class="desc">
						<view class="topic">
							<image class="img" src="@/static/images/documentary/yingli.png"></image>
							<span class="title">盈利榜</span>
						</view>
						<view class="topic" v-for="item in rankingData.profitUserList" :key="item.id"
							@tap="queryInfo(item.id)">
							<view style="display: flex; flex-direction: column; align-items: center;">
								<view>
									<u-avatar size="31" :src="item.avatar"></u-avatar>
								</view>
								<span style="font-size: 13px; white-space: nowrap;">{{item.nickname}}</span>
							</view>
						</view>
					</uni-card>
				</view>
				<view style="background: #fff;height: 50px;">
					<u-tabs :list="tabsList" lineColor="#515ffb" :scrollable="false" lineWidth="50"
						:activeStyle="{color: '#515ffb',fontWeight: 'bold',transform: 'scale(1.05)'}" @click="tabsBtn">
					</u-tabs>
				</view>
				<scroll-view>
					<u-empty :show="documentaryData.length<=0" icon="http://cdn.uviewui.com/uview/empty/data.png"
						mode="data" text="没有跟单数据"></u-empty>
					<view class="item-title" v-for="(item,index) in documentaryData" :key="index">
						<view>
							<view style="display: flex; justify-content: space-between; align-items: center;">
								<view style="display: flex; align-items: center;">
									<view @tap="queryInfo(item.id)">
										<image class="img" :src="item.avatar"></image>
									</view>
									<view style="display: flex; flex-direction: column; margin-left: 5px;"
										@tap="documentaryInfoBtn(item.documentaryId,item.id)">
										<view>
											{{item.nickname}}
										</view>
										<view style="color: grey;">
											预计回报{{item.remuneration}}倍</view>
									</view>
								</view>
								<view style="display: flex; flex-direction: column; align-items: center;"
									@tap="documentaryInfoBtn(item.documentaryId,item.id)">
									<view style="color: grey;">
										截止时间</view>
									<u-count-down :time="item.endTime" format="HH:mm:ss"></u-count-down>
								</view>
							</view>
							<view style="margin: 10px 0px;" @tap="documentaryInfoBtn(item.documentaryId,item.id)">
								{{item.describe}}
							</view>
							<view style="display: flex; align-items: center;"
								@tap="documentaryInfoBtn(item.documentaryId,item.id)">
								<view
									style="display: flex; align-items: center; background-color: rgb(249, 249, 249); padding: 10px; border-radius: 10px; width: 80%; justify-content: space-around;">
									<view
										style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
										<view>
											<image style="width: 15px;height: 15px;" :src="item.url">
											</image>
										</view>
										<view>{{item.name}}</view>
									</view>
									<view style="border-right: 1px solid rgb(214, 214, 214); height: 26px; width: 1px;">
									</view>
									<view style="display: flex; flex-direction: column; align-items: center;">
										<view>
											自购</view>
										<view style="color: #515ffb;">{{item.price}}</view>
									</view>
									<view style="border-right: 1px solid rgb(214, 214, 214); height: 26px; width: 1px;">
									</view>
									<view style="display: flex; flex-direction: column; align-items: center;">
										<view>
											人气</view>
										<view style="color: #515ffb;">{{item.quantity}}</view>
									</view>
								</view>
								<view
									style="width: 20%; text-align: center; background-image: linear-gradient(to top, #f77062 0%, #fe5196 100%); padding: 7px 15px; margin: 0px 10px; color: white; border-radius: 10px;">
									<text>
										<span>跟单</span>
									</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		ranking,
		queryDocumentaryByType
	} from '@/api/documentary.js'
	export default {
		data() {
			return {
				tabsList: [{
					name: '人气跟单',
				}, {
					name: '跟单总额',
				}, {
					name: '我的关注',
				}],
				rankingData: {},
				documentaryData: [],
				type: 0
			}
		},
		methods: {
			documentaryInfoBtn(documentaryId, userId) {
				uni.navigateTo({
					url: "/pages/documentary/documentaryInfo?id=" + documentaryId + "&uid=" + userId
				})
			},
			iconOneBtn() {
				uni.navigateTo({
					url: "/pages/documentary/search"
				})
			},
			init() {
				uni.showLoading();
				ranking().then(res => {
					this.rankingData = res;
				})
				queryDocumentaryByType(this.type).then(res => {
					this.documentaryData = res.voList;
					uni.hideLoading();
				})
			},
			tabsBtn(item) {
				this.type = item.index;
				this.init();
			},
			queryInfo(id) {
				uni.navigateTo({
					url: "/pages/documentary/homePage?uid=" + id
				})
			}
		},
		onLoad() {
			this.init();
		},
		onPullDownRefresh() {
			this.init();
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 500);
		},
	}
</script>

<style scoped lang="less">
	/deep/.u-count-down__text {
		color: #515ffb;
	}

	.img {
		width: 31px;
		height: 31px;
	}

	page {
		background: #FAFAFA;
		font-size: 15px;
		color: #333;
		font-family: Helvetica Neue, Helvetica, sans-serif;
	}

	.title {
		color: rgb(255, 83, 89);
		font-size: 11px;
	}

	/deep/.desc .uni-card__content {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 10px 0px !important;
	}

	.topic {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-around;
		width: 20%;
	}

	/deep/.desc {
		border-radius: 10px;
		justify-content: space-around;
		margin: 5px 5px !important;
		padding: 0px !important;
	}

	.item-title {
		padding: 10px;
		background-color: white;
		margin-bottom: 10px;
	}
</style>