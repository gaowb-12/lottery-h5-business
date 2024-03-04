<template>
	<view class="box">
		<nav-bar :title="'足彩赛事设置'" :back="true" @rightText="rightText" right-text="修改规范"></nav-bar>
		<u-popup :show="isShow" mode="bottom" @close="isShow = false" closeable>
			<uni-card style="margin-top: 40px;">
				<view>
					<text>修改规范：</text><br />
					<text>1. 开奖结果格式：让球结果（如：“胜”或“负”）,不让球结果（如：“胜”或“负”）,进球数总和（如：5或7+）,半场比赛结果（如：“胜”或“负”）-全场比赛结果（如：“胜”或“负”）,全场比分（如：3:2）——整体演示：胜,胜,5,胜-胜,3:2</text> <br />
					<text>2. (半/全)赛果格式：(半场比赛结果),全场比赛结果  ——整体演示：(3:2),3:2</text> <br />
					<text>3. 其中，开奖结果中，进球总和大于等于7表示7+ </text> <br />
					<text>4. 以上格式所需要的标点符号必须以英文标点符号为标准，且必须按照规范书写，不可丢失或错误书写</text> <br />
					<text style="color: red;font-weight: bold;">注意. 修改足彩开奖结果或(半/全)赛果时务必按照以上的格式进行修改</text>
				</view>
			</uni-card>
		</u-popup>
		
		<uni-table stripe emptyText="暂无更多数据">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th width="90px" align="center">开赛日期</uni-th>
				<uni-th width="100px" align="center">比赛名称</uni-th>
				<uni-th width="70px" align="center">场次</uni-th>
				<uni-th width="100px" align="center">主队/客队</uni-th>
				<uni-th width="100px" align="center">开奖结果</uni-th>
				<uni-th width="100px" align="center">(半/全)赛果</uni-th>
				<uni-th width="100px" align="center">操作</uni-th>
			</uni-tr>
			<!-- 表格数据行 -->
			<uni-tr v-for="(record,index) in saiguoList" :key="index">
				<uni-td align="center">{{record.openTime}}</uni-td>
				<uni-td align="center">{{record.match}}</uni-td>
				<uni-td align="center">{{record.number}}</uni-td>
				<uni-td align="center">{{record.homeTeam}}
					<span class="rangqiu"
						:class="{rangqiuBlue:record.letBall < 0}">({{record.letBall}})</span>
					<br> VS <br>{{record.visitingTeam}}
				</uni-td>
				<uni-td align="center">
					
					<textarea style="width: 100px;height: 50px;" placeholder-class="placeStyle" placeholder="请仔细阅读修改规范再填写" v-model="record.award"></textarea>
				</uni-td>
				<uni-td align="center">
					<textarea style="width: 100px;height: 50px;" placeholder-class="placeStyle" placeholder="请仔细阅读修改规范再填写" v-model="record.halfFullCourt"></textarea>
				</uni-td>
				<uni-td align="center">
					<u-button :disabled="!record.award && !record.halfFullCourt" :custom-style="{background:'#515ffb',color:'#fff'}" text="修改" @click="handlerSetAward(record)"></u-button>
				</uni-td>
				
			</uni-tr>
		</uni-table>
						
	</view>
</template>

<script>
import { getSaiguoList, setSaiguo } from "@/api/shop.js"
export default {
	data(){
		return {
			isShow:false,
			queryParam: {
				pageNo:1,
				pageSize:10,
				userId:"",
				tenantId:"",
				type:"足彩"
			},
			saiguoList:[],
			userId: "",
			tenantId: ""
		}
	},
	
	onLoad(option) {
		if(option != undefined){
			this.userId = option.userId;
			this.tenantId = option.tenantId
			this.init(this.userId, this.tenantId);
		}
	},


	methods: {
		async init(userId, tenantId){
			this.queryParam.userId = userId;
			this.queryParam.tenantId = tenantId;
			let res = await getSaiguoList(this.queryParam);
			this.saiguoList = res.voList;
			
		},
		rightText() {
			this.isShow = true;
		},
		async handlerSetAward({award, halfFullCourt, id}){
			let awardFlag = award.includes(",") && award.includes(":") && award.includes("-");
			let halfFlag = halfFullCourt.includes(",") && halfFullCourt.includes("(") && halfFullCourt.includes(")") && halfFullCourt.includes(":");
			if(awardFlag === true && halfFlag === true) {
				console.log(award,halfFullCourt,id)
				setSaiguo({
					id,
					award,
					halfFullCourt,
					type: '足彩',
					pageSize:10,
					pageNo:1
				}).then(res => {
					console.log(res);
					uni.showToast({
						title: '修改成功！'
					});
					location.reload()
					return;
				})
				
			} else {
				uni.showToast({
					title: '您输入的内容标点符号错误',
					icon: 'none'
				});
				return;
			}
			
			
		}
	
	}
}
</script>

<style lang="scss" scoped>
	
.placeStyle{
	color: rgba(255, 24, 97,.5);
	font-style: italic;
	font-weight: bold;
	font-size: 14px;
}
	.rangqiuBlue {
		color: #2d8cf0 !important;
	}

</style>