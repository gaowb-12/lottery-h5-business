<template>
	<view class="box">
		<nav-bar :title="'他的主页'" :back="true"></nav-bar>
		<view style="margin-top: 30px;">
			<view class="zaiui-bar-title-box" style="opacity: 0;">
				<view class="cu-bar fixed no-shadow bg-white">
					<view class="action">
						<text class="cuIcon-back"><span></span></text>
						<text><span></span></text>
					</view>
					<!---->
					<view class="content">他的主页</view>
					<view class="action"></view>
				</view>
				<view class="zaiui-seat-height"></view>
			</view>
			<view
				style="background: url(../static/images/documentary/homePage_bg.png) 0px 0px / 100% no-repeat, rgb(249, 249, 249); position: absolute; left: 0px; top: 45px; right: 0px; height: 144px; width: 100%;">
			</view>
			<view>
				<view
					style="background: white; width: 94%; height: 85px; position: relative; margin-left: 3%; border-radius: 10px; margin-top: 35px;">
					<view style="display: flex; align-items: center; position: absolute; top: -30px; left: 20px;">
						<view style="margin-right: 10px;">
							<u-avatar size="55" :src="userData.avatar"></u-avatar>
						</view>
						<view style="z-index: 99999; font-size: 15px;">
							<view style="display: flex; align-items: center; margin-bottom: 10px;">
								<text style="color: white;"><span>{{userData.nickname}}</span></text>
								<view v-if="!userData.isFollow" @tap="followBtn('0',userData.id)"
									style="background: white; color: rgb(49, 146, 255); height: 20px; line-height: 20px; text-align: center; padding: 0px 15px; margin-left: 10px; border-radius: 10px;">
									关注</view>
								<view v-else @tap="followBtn('1',userData.id)"
									style="background: white; color: rgb(49, 146, 255); height: 20px; line-height: 20px; text-align: center; padding: 0px 15px; margin-left: 10px; border-radius: 10px;">
									取消关注</view>
							</view>
							<view style="display: flex; align-items: center;">
								<view>粉丝{{userData.fans}}</view>
								<view
									style="height: 10px; width: 1px; border-left: 1px solid rgb(0, 0, 0); margin: 0px 15px;">
								</view>
								<view>发单{{userData.issueCount}}</view>
							</view>
						</view>
					</view>
					<view style="position: absolute; bottom: 10px; left: 10px; font-size: 13px;">
						Ta没有留下任何介绍</view>
				</view>
				<view
					style="width: 94%; margin-left: 3%; background: white; display: flex; align-items: center; justify-content: space-around; margin-top: 10px; padding: 12px 0px; border-radius: 10px;">
					<view style="display: flex; flex-direction: column; align-items: center;">
						<view style="color: rgb(245, 54, 41); font-weight: bold;">{{userData.bonus}}</view>
						<view style="margin-top: 5px;">累计奖金</view>
					</view>
					<view style="display: flex; flex-direction: column; align-items: center;">
						<view style="color: rgb(245, 54, 41); font-weight: bold;">{{userData.profit}}%</view>
						<view style="margin-top: 5px;">7日盈利</view>
					</view>
					<view style="display: flex; flex-direction: column; align-items: center;">
						<view style="color: rgb(245, 54, 41); font-weight: bold;">{{userData.hit}}</view>
						<view style="margin-top: 5px;">7日命中</view>
					</view>
				</view>
				<view style="width: 94%; margin: 20px auto; background: white; border-radius: 10px">
					<view style="display: flex; align-items: center; justify-content: space-between;">
						<view style="display: flex; align-items: center;">
							<view style="height: 15px; border-right: 4px solid rgb(49, 146, 255);"></view>
							<view>近5场战绩</view>
						</view>
						<view v-if="userData.recordList!=undefined&&userData.recordList.length<=0">暂无数据</view>
						<view v-else style="display: flex; align-items: center;">
							<view style="display: flex; align-items: center;"
								v-for="(record,index) in userData.recordList" :key="index">
								<view v-if="record"
									style="background: rgb(255, 83, 89); color: white; height: 20px; width: 20px; line-height: 20px; text-align: center; border-radius: 20px; font-size: 10px;">
									红</view>
								<view v-else
									style="background: rgb(151, 151, 151); color: white; height: 20px; width: 20px; line-height: 20px; text-align: center; border-radius: 20px; font-size: 10px;">
									黑</view>
								<view v-if="userData.recordList.length-1>index"
									style="width: 15px; border-top: 1px solid rgb(151, 151, 151);"></view>
							</view>
						</view>
					</view>
					<view style="text-align: center; min-height: 10vh; margin-top: 20px;"
						v-if="userData.documentaryInfoList!=undefined&&userData.documentaryInfoList.length<=0">暂无数据
					</view>
					<view style="margin-top: 10px;">
						<view v-for="(item,index) in userData.documentaryInfoList" :key="index" @tap="documentaryInfoBtn(item.documentaryId,userData.id)"
							style="border-bottom: 1px solid rgb(238, 238, 238); margin: 15px 0px; padding: 10px 0px;">
							<view style="display: flex; align-items: center; justify-content: space-between;">
								<view style="display: flex;">
									<view>
										<view>
											<image style="width: 20px; height: 20px;" :src="item.url">
											</image>
										</view>
									</view>
									<view style="margin-left: 5px;">{{item.name}}</view>
								</view>
								<view>{{item.createTime|formatDate(that)}}</view>
							</view>
							<view
								style="display: flex; align-items: center; justify-content: space-between; margin-top: 7px;">
								<view v-if="item.type=='3'"
									style="color: white; background-color: rgb(255, 83, 89); padding: 4px 15px; font-size: 11px; border-radius: 5px;">
									中奖{{item.winPrice}}</view>
								<view v-if="item.type=='2'"
									style="color: rgb(151, 151, 151); background-color: rgb(243, 243, 243); padding: 4px 15px; font-size: 11px; border-radius: 5px;">
									未中奖
								</view>
								<view v-if="item.type=='1'"
									style="color: rgb(151, 151, 151); background-color: rgb(243, 243, 243); padding: 4px 15px; font-size: 11px; border-radius: 5px;">
									待开奖
								</view>
								<view v-if="item.type=='0'"
									style="color: white; background-color: rgb(49, 146, 255); padding: 4px 15px; font-size: 11px; border-radius: 5px;">
									立即跟单</view>
								<view>
									<text><span>自购:<span
												style="color: rgb(255, 83, 89);">{{item.price}}</span></span></text>元
									<text style="margin-left: 10px;"><span>跟单:<span
												style="color: rgb(255, 83, 89);">{{item.quantity}}</span>人</span>
									</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		documentaryDetails
	} from '@/api/documentary.js'
	import {
		addRelationship
	} from '@/api/follow.js'
	export default {
		data() {
			return {
				userData: {},
				that: this,
			}
		},
		filters: {
			formatDate(data, that) {
				if (null == data) {
					return null;
				}
				return that.globalUtil.dateTimeFormat(data)
			},
		},
		onLoad(option) {
			this.init(option.uid)
		},
		methods: {
			documentaryInfoBtn(documentaryId, userId) {
				uni.navigateTo({
					url: "/pages/documentary/documentaryInfo?id=" + documentaryId + "&uid=" + userId
				})
			},
			followBtn(type, id) {
				uni.showLoading();
				addRelationship(type, id).then(res => {
					if (res.success) {
						this.init(id);
						setTimeout(() => {
							uni.hideLoading();
						}, 500)
					}
				})
			},
			init(id) {
				uni.showLoading();
				documentaryDetails(id).then(res => {
					this.userData = res;
					setTimeout(() => {
						uni.hideLoading();
					}, 500)
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.box {
		font-size: 15px;
		color: #333;
		font-family: Helvetica Neue, Helvetica, sans-serif;
	}
</style>
