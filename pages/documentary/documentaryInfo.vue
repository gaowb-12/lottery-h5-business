<template>
	<view class="box">
		<nav-bar :title="'跟单详情'" :back="true"></nav-bar>
		<view style="padding:20px 5px;">
			<view style="display: flex; justify-content: space-between; align-items: center;">
				<view style="display: flex; align-items: center;">
					<u-avatar size="45" :src="documentaryData.avatar" @click="queryInfo(documentaryData.id)"></u-avatar>
					<view style="display: flex; flex-direction: column; margin-left: 10px;">
						<view style="margin-bottom: 5px;">{{documentaryData.nickname}}</view>
						<view style="display: flex; align-items: center; font-size: 11px;">
							<view
								style="color: #515ffb; border: 1px solid red; border-radius: 7px 0px 0px 7px; height: 20px; line-height: 20px; text-align: center; padding: 0px 10px;">
								{{documentaryData.hit}}
							</view>
							<view
								style="height: 22px; line-height: 20px; padding: 0px 10px; background-color: #515ffb; text-align: center; border-radius: 0px 7px 7px 0px; color: white;">
								盈利率{{documentaryData.profit}}%</view>
						</view>
					</view>
				</view>
				<view v-if="!documentaryData.isFollow" @tap="followBtn('0',documentaryData.id)"
					style="border: 1px solid #515ffb; border-radius: 15px; height: 25px; line-height: 25px; padding: 0px 15px; text-align: center; color: #515ffb;margin-right: 15px;">
					关注</view>
				<view @tap="followBtn('1',documentaryData.id)" v-else
					style="border: 1px solid grey; border-radius: 15px; height: 25px; line-height: 25px; padding: 0px 15px; text-align: center; color: grey;margin-right: 15px;">
					取消关注</view>
			</view>
			<view style="background-color: white; padding: 10px; border-radius: 10px; margin-top: 30px;">
				<view
					style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgb(238, 238, 238); padding-bottom: 5px;">
					<view style="display: flex; align-items: center;">
						<view>
							<view>
								<image style="width: 25px; height: 25px;"
									src="https://ppm-pics-resource.s3.us-east-1.amazonaws.com/cms/jczq.png">
								</image>
							</view>
						</view>
						<view style="margin-left: 5px;">{{documentaryData.name}}</view>
						
						<view style="margin-left: 10px;" v-if="user.isAgent==1" @click="moni()" >
							<span style="padding: 4upx 8upx;background-color: #515ffb;color: #fff;">模拟跟单</span>
						</view>
					</view>
					<view>
						<text style="color: grey;"><span>佣金</span></text>
						<text style="color: red;"><span>{{documentaryData.commission}}%</span></text>
					</view>
				</view>
				<view>
					<view style="margin: 10px 0px;">{{documentaryData.describe}}</view>
					<view style="display: flex; align-items: center;">
						<view v-if="documentaryData.endTime>0 && "
							style="display: flex; flex-direction: column; margin-right: 10px;width: 70px;">
							<view>截止时间</view>
							<u-count-down :time="documentaryData.endTime" format="HH:mm:ss"></u-count-down>
						</view>
						<view v-else style="font-size: 15px;margin-right: 10px;">
							{{documentaryData.orderState=="1"?'待开奖':documentaryData.orderState=="2"?'未中奖':documentaryData.orderState=="3"||documentaryData.orderState=="4"?'已中奖':''}}
						</view>
						<view
							style="display: flex; align-items: center; background-color: rgb(249, 249, 249); padding: 10px; border-radius: 10px; width: 80%; justify-content: space-around;">
							<view style="display: flex; flex-direction: column; align-items: center;">
								<view>自购金额</view>
								<view style="color: red;">{{documentaryData.price}}</view>
							</view>
							<view style="border-right: 1px solid rgb(214, 214, 214); height: 25px; width: 1px;">
							</view>
							<view style="display: flex; flex-direction: column; align-items: center;">
								<view>跟单金额</view>
								<view style="color: red;">{{documentaryData.totalDocumentaryPrice}}</view>
							</view>
							<view style="border-right: 1px solid rgb(214, 214, 214); height: 25px; width: 1px;">
							</view>
							<view style="display: flex; flex-direction: column; align-items: center;">
								<view>起投金额</view>
								<view style="color: red;">{{documentaryData.riseThrowPrice}}</view>
							</view>
						</view>
					</view>
					<u-tabs lineHeight="2" :list="tabsList" lineColor="#515ffb" :scrollable="false" lineWidth="60"
						:activeStyle="{color: '#515ffb',transform: 'scale(1.05)'}" @click="tabsBtn">
					</u-tabs>
					<scroll-view>
						<view v-if="programmeFlag">
							<view v-if="documentaryData.state=='1'&&documentaryData.endTime>0"
								style="display: flex;flex-direction: column;justify-content: center;align-items: center;color: grey;font-size: 20px;">
								<u-icon name="lock" size="50" color="grey"></u-icon>
								<text>开赛后可见</text>
								<text>截止时间 {{documentaryData.deadline|formatDate(that)}}</text>
							</view>
							<view v-else>
								<!-- 下注内容 -->
								<uni-card is-shadow v-if="documentaryData.name=='竞彩足球'">
									<view>
										<span class="title">{{documentaryData.name}}</span>
										<p style="display: flex;justify-content: flex-end;align-items: center;">
											<uni-row>
												<uni-col :span="documentaryData.pssTypeList.length<=2?12:24">
													<u-tag :text="documentaryData.notes+'注'" type="error"></u-tag>
													<u-tag :text="documentaryData.times +'倍'"
														style="margin-left: 10px;">
													</u-tag>
												</uni-col>
												<uni-col :span="6" :key="index"
													v-for="(item,index) in documentaryData.pssTypeList">
													<u-tag v-if="item==1" :borderColor="index|mapTagColor"
														:bgColor="index|mapTagColor" text="单关"
														:style="documentaryData.pssTypeList.length==1?'margin-left: 35px;':'margin-left: 10px;'">
													</u-tag>
													<u-tag v-else :borderColor="index|mapTagColor"
														:bgColor="index|mapTagColor" :text="item+'串一'"
														:style="documentaryData.pssTypeList.length==1?'margin-left: 35px;':'margin-left: 10px;'">
													</u-tag>
												</uni-col>
											</uni-row>
										</p>
									</view>
									<uni-table stripe emptyText="暂无更多数据">
										<!-- 表头行 -->
										<uni-tr>
											<uni-th width="50" align="center">场次</uni-th>
											<uni-th width="70" align="center">主队/客队</uni-th>
											<uni-th width="50" align="center">投注内容</uni-th>
											<uni-th width="60" align="center">赛果(全/半)</uni-th>
										</uni-tr>
										<!-- 表格数据行 -->
										<uni-tr v-for="(record,index) in documentaryData.ballInfoList" :key="index">
											<uni-td width="50" align="center">{{record.number}}</uni-td>
											<uni-td width="70" align="center">{{record.homeTeam}}
												<span class="rangqiu"
													:class="{rangqiuBlue:record.letBall < 0}">({{record.letBall}})</span>
												<br> VS <br>{{record.visitingTeam}}
											</uni-td>
											<uni-td width="50" align="center">
												<!-- notLet.describe==record.award[0] 如果选择的和中奖的结果一样标记为红色 -->
												<span :style="notLet.describe==record.award[0]?'color:#515ffb':''"
													v-for="(notLet,index) in record.content.notLetOddsList"
													v-if="notLet.active">
													{{notLet.describe}}({{notLet.odds}})<span
														v-if="record.content.notLetOddsList.length-index>1">,</span>
												</span>
												<span v-if="record.content.notLetOddsList.length>0">|</span>
												<br>

												<span :style="record.halfFullCourt!=undefined&&lets.describe==(Number(record.halfFullCourt.split(',')[1].split(':')[0])+Number(record.letBall)>Number(record.halfFullCourt.split(',')[1].split(':')[1])?'胜'
													:Number(record.halfFullCourt.split(',')[1].split(':')[0])+Number(record.letBall)<Number(record.halfFullCourt.split(',')[1].split(':')[1])?'负'
													:'平')?'color:#515ffb':''" v-for="(lets,index) in record.content.letOddsList" v-if="lets.active">
													让{{lets.describe}}({{lets.odds}})<span
														v-if="record.content.letOddsList.length-index>1">,</span>
												</span>
												<span v-if="record.content.letOddsList.length>0">|</span>
												<br>
												<span :style="goal.describe==record.award[2]?'color:#515ffb':''"
													v-for="(goal,index) in record.content.goalOddsList"
													v-if="goal.active">
													{{goal.describe}}({{goal.odds}})<span
														v-if="record.content.goalOddsList.length-index>1">,</span>
												</span>
												<span v-if="record.content.goalOddsList.length>0">|</span>
												<br>
												<span :style="half.describe==record.award[3]?'color:#515ffb':''"
													v-for="(half,index) in record.content.halfWholeOddsList"
													v-if="half.active">
													{{half.describe}}({{half.odds}})<span
														v-if="record.content.halfWholeOddsList.length-index>1">,</span>
												</span>
												<span v-if="record.content.halfWholeOddsList.length>0">|</span>
												<br>
												<span :style="score.describe==record.award[4]?'color:#515ffb':''"
													v-for="(score,index) in record.content.scoreOddsList"
													v-if="score.active">
													{{score.describe}}({{score.odds}})<span
														v-if="record.content.scoreOddsList.length-index>1">,</span>
													<br>
												</span>
												<span v-if="record.content.scoreOddsList.length>0">|</span>
												<br>
											</uni-td>
											<uni-td width="50" align="center">
												<span v-if="record.halfFullCourt!=undefined">
													{{record.halfFullCourt.split(',')[1]}}<br>半{{record.halfFullCourt.split(',')[0]}}
												</span>
											</uni-td>
										</uni-tr>
									</uni-table>
								</uni-card>

								<uni-card is-shadow v-if="documentaryData.name=='竞彩篮球'">
									<view>
										<span class="title">{{documentaryData.name}}</span>
										<p style="display: flex;justify-content: flex-end;align-items: center;">
											<uni-row>
												<uni-col :span="documentaryData.pssTypeList.length<=2?12:24">
													<u-tag :text="documentaryData.notes+'注'" type="error"></u-tag>
													<u-tag :text="documentaryData.times +'倍'"
														style="margin-left: 10px;"></u-tag>
												</uni-col>
												<uni-col :span="6" :key="index"
													v-for="(item,index) in documentaryData.pssTypeList">
													<u-tag v-if="item==1" :borderColor="index|mapTagColor"
														:bgColor="index|mapTagColor" text="单关"
														:style="documentaryData.pssTypeList.length==1?'margin-left: 35px;':'margin-left: 10px;'">
													</u-tag>
													<u-tag v-else :borderColor="index|mapTagColor"
														:bgColor="index|mapTagColor" :text="item+'串一'"
														:style="documentaryData.pssTypeList.length==1?'margin-left: 35px;':'margin-left: 10px;'">
													</u-tag>
												</uni-col>
											</uni-row>
										</p>
									</view>
									<uni-table stripe emptyText="暂无更多数据">
										<!-- 表头行 -->
										<uni-tr>
											<uni-th width="50" align="center">场次</uni-th>
											<uni-th width="70" align="center">客队/主队</uni-th>
											<uni-th width="50" align="center">投注内容</uni-th>
											<uni-th width="60" align="center">赛果</uni-th>
										</uni-tr>
										<!-- 表格数据行 -->
										<uni-tr v-for="(record,index) in documentaryData.ballInfoList" :key="index">
											<uni-td width="50" align="center">{{record.number}}</uni-td>
											<uni-td width="70" align="center">{{record.visitingTeam}}
												<span class="rangqiu"
													:class="{rangqiuBlue:record.letBall < 0}">({{record.letBall}})</span>
												<br> VS <br>{{record.homeTeam}}
											</uni-td>
											<uni-td width="50" align="center">
												<span :style="winNegative.describe==record.award[0]?'color:#515ffb':''"
													v-for="(winNegative,index) in record.content.winNegativeOddsList"
													v-if="winNegative.active">
													{{winNegative.describe}}({{winNegative.odds}})<span
														v-if="record.content.winNegativeOddsList.length-index>1">,</span>
												</span>
												<span v-if="record.content.winNegativeOddsList.length>0">|</span>
												<br>
												<span :style="record.halfFullCourt!=undefined&&cedePoints.describe==(Number(record.halfFullCourt.split(':')[1])+Number(record.letBall)>Number(record.halfFullCourt.split(':')[0])?'主胜'
													:'主负')?'color:#515ffb':''" v-for="(cedePoints,index) in record.content.cedePointsOddsList"
													v-if="cedePoints.active">
													让{{cedePoints.describe}}({{cedePoints.odds}})<span
														v-if="record.content.cedePointsOddsList.length-index>1">,</span>
												</span>
												<span v-if="record.content.cedePointsOddsList.length>0">|</span>
												<br>
												<span :style="record.halfFullCourt!=undefined&&size.describe==(Number(record.halfFullCourt.split(':')[1])+Number(record.halfFullCourt.split(':')[0])>Number(size.score)?'大'
													:'小')?'color:#515ffb':''" v-for="(size,index) in record.content.sizeOddsList" v-if="size.active">
													{{size.describe}}<span
														style="color: #1afa29;">[{{size.score}}]</span>({{size.odds}})<span
														v-if="record.content.sizeOddsList.length-index>1">,</span>
												</span>
												<span v-if="record.content.sizeOddsList.length>0">|</span>
												<br>
												<span :style="difference.describe==record.award[2]?'color:#515ffb':''"
													v-for="(difference,index) in record.content.differenceOddsList"
													v-if="difference.active">
													{{difference.describe}}({{difference.odds}})<span
														v-if="record.content.differenceOddsList.length-index>1">,</span>
												</span>
												<span v-if="record.content.differenceOddsList.length>0">|</span>
												<br>
											</uni-td>
											<uni-td width="50" align="center">
												<span v-if="record.halfFullCourt!=undefined">
													{{record.halfFullCourt}}
												</span>
											</uni-td>
										</uni-tr>
									</uni-table>
								</uni-card>

							</view>
						</view>
						<view v-if="frequencyFlag">
							<view
								style="background-color: rgb(255, 151, 106); text-align: center; color: white; margin: 10px 0px; height: 25px; line-height: 25px; border-radius: 5px;">
								默认展示前10位跟单用户</view>
							<u-empty icon="http://cdn.uviewui.com/uview/empty/data.png"
								v-show="documentaryData.documentaryUserList.length<=0" mode="data" text="沒有跟单用户~">
							</u-empty>
							<view v-if="documentaryData.documentaryUserList.length>0"
								v-for="(item,index) in documentaryData.documentaryUserList" :key="index"
								style="display: flex;justify-content: space-between; align-items: center; width: 92%;margin: auto;margin-bottom: 15px;">
								<view style="display: flex;align-items: center;">
									<u-avatar size="40" :src="item.avatar"></u-avatar>
									<text style="padding-left: 10px;">{{item.nickname}}</text>
								</view>
								<view>
									<text style="color: #515ffb;font-weight: bold;">￥{{item.price}}</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view v-if="documentaryData.endTime>0" style="position: fixed; left: 0px; right: 0px; bottom: 0px; background-color: white; padding: 10px;">
			<view style="display: flex; align-items: center;justify-content: flex-end;margin-right: 10px;">
				投<u-number-box @change="valChange"></u-number-box>倍
			</view>
			<view style="display: flex; align-items: center; justify-content: space-between;">
				<view style="display: flex; align-items: center; margin-left: 10px;">
					<text>{{multiple}}倍</text>
					<view style="margin-left: 10px;">合计<text style="color: #515ffb;"><span>{{price}}</span></text>元
					</view>
				</view>
				<view style="margin-right: 10px;">
					<u-button @tap="confirmIsShow=true"
						style="background-color: #515ffb; color: #ffffff;border-radius: 10px;padding: 0px 45px;margin-top: 10px;"
						text="立即跟单"></u-button>
				</view>
			</view>
		</view>
		<u-modal title="支付给店主" :show="confirmIsShow" :zoom="false" confirmText="立即支付" showCancelButton
			confirmColor="#515ffb" @confirm="betting" @cancel="() => confirmIsShow = false">
			<view class="tip">
				<p style="text-align: center;">{{documentaryData.name}}</p>
				<p style="margin-top: 15px;">共{{this.documentaryData.notes}}注{{multiple}}倍，您需要支付{{price}}元</p>
			</view>
		</u-modal>
		
		
		<u-modal title="选择模拟用户跟单" :show="moniShow" :zoom="false" confirmText="确认跟单" showCancelButton
			confirmColor="#515ffb" @confirm="moniSuer" @cancel = "cancle()">
			<view class="box_a" >
				<uni-data-checkbox selectedColor="#0050f1" selectedTextColor="#ffffff" mode="tag" multiple v-model="checkbox3" :localdata="complaints" @change="change"></uni-data-checkbox>
				<u-form-item label="跟单倍数"><u-input v-model="moniMultiple" /></u-form-item>
			</view>
		</u-modal>
		
	</view>
</template>

<script>
	import {
		getImitates,
		shopkeeperMoniAdd
	} from '@/api/user.js'
	import {
		queryDocumentaryById,
		createDocumentaryUser
	} from '@/api/documentary.js'
	import {
		addRelationship
	} from '@/api/follow.js'
	
	import {
		getUserInfo
	} from '@/util/auth.js'
	
	export default {
		data() {
			return {
				moniMultiple:0,
				//模拟用户查询条件
				queryParam: {
					pageNo: 1,
					pageSize: 30
				},
				checkbox3: [0],
				moniShow:false,
				user:{},
				documentaryId: "",
				confirmIsShow: false,
				that: this,
				obj: {},
				multiple: 1,
				price: 0,
				programmeFlag: true,
				frequencyFlag: false,
				documentaryData: {},
				tabsList: [{
					name: '方案详情',
				}, {
					name: '跟单次数',
					badge: {
						value: 0,
					}
				}],
				complaints:[],
				tempList:"",
				orderId:0
			}
		},
		onLoad(option) {
			this.obj = option;
			this.init(option.id, option.uid)
			getUserInfo().then(res =>{
				this.user = res
			})
		},
		filters: {
			mapTagColor(index) {
				switch (index % 20) {
					case 0:
						return '#D52BB3'
					case 1:
						return '#3CC48D'
					case 2:
						return '#d81e06'
					case 3:
						return '#1296db'
					case 4:
						return '#13227a'
					case 5:
						return '#3cc2a8'
					case 6:
						return '#1cedf2'
					case 7:
						return '#6b1cf2'
					case 8:
						return '#e71cf2'
					case 9:
						return '#f28a1c'
					case 10:
						return '#f4ea2a'
					default:
						return '#19be6b'
				}
			},
			formatDate(data, that) {
				if (null == data) {
					return null;
				}
				return that.globalUtil.dateTimeFormat(data)
			},
		},
		methods: {
			cancle(){
				this.moniShow = false
				this.complaints = []
				this.tempList = ""
			},
			change(e){
				let tha = this;
				tha.tempList = e.detail.value
			},
			queryInfo(id) {
				uni.navigateTo({
					url: "/pages/documentary/homePage?uid=" + id
				})
			},
			betting() {
				createDocumentaryUser({
					'multiple': this.multiple,
					'orderId': this.documentaryData.orderId,
					'documentaryId': this.documentaryId
				}).then(res => {
					if (res.success) {
						//标识为已经下单了
						uni.setStorageSync('isPay', true);
						uni.navigateTo({
							url: "/pages/order/lotteryOrderDetails?id=" + res.id,
							animationType: 'pop-in',
							animationDuration: 200
						})
					}
				})
			},
			valChange(item) {
				//点击倍数按钮时重新计算金额
				this.price = this.documentaryData.notes * item.value * 2
				this.multiple = item.value
			},
			tabsBtn(item) {
				if (item.index == 0) {
					this.programmeFlag = true;
					this.frequencyFlag = false;
				} else if (item.index == 1) {
					this.programmeFlag = false;
					this.frequencyFlag = true;
				}
			},
			followBtn(type, id) {
				addRelationship(type, id).then(res => {
					if (res.success) {
						this.init(this.obj.id, this.obj.uid);
					}
				})
			},
			init(id, uid) {
				uni.showLoading();
				this.documentaryId = id;
				this.complaints = [];
				queryDocumentaryById(id, uid).then(res => {
					this.documentaryData = res;
					this.price = this.documentaryData.riseThrowPrice
					if (this.documentaryData.documentaryUserList.length <= 0) {
						this.tabsList[1].name = "跟单次数（0）"
					}
					//设置跟单人数
					this.tabsList[1].badge.value = this.documentaryData.documentaryUserList.length
					//将字符串转对象
					this.documentaryData.ballInfoList.map((item, idx) => {
						this.$set(this.documentaryData.ballInfoList[idx], "content", JSON.parse(item
							.content))
						//將比賽结果转换成数组，并返回
						if (item.award != null) {
							this.$set(this.documentaryData.ballInfoList[idx], "award", item.award.split(
								','))
						} else {
							//考虑比赛结果还没有出的话设置一个默认值，防止报错
							var moren = [0, 0, 0, 0, 0]
							this.$set(this.documentaryData.ballInfoList[idx], "award", moren)
						}
						if (item.bonusOdds != null) {
							this.$set(this.documentaryData.ballInfoList[idx], "bonusOdds", item.bonusOdds
								.split(','))
						} else {
							//考虑比赛结果还没有出的话设置一个默认值，防止报错
							var moren = ["", "", "", "", ""]
							this.$set(this.documentaryData.ballInfoList[idx], "bonusOdds", moren)
						}
					})
					setTimeout(function() {
						uni.hideLoading();
					}, 200);
				})
			},
			
			moni(){
				getImitates(this.queryParam).then(res => {
					if(res.success){
						let list =  res.voList
						list.forEach((item,index)=>{    //js遍历数组
							this.complaints.push({'value':item.userId,'text':item.nickname})  //push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
						});
					}
				})
				this.moniShow = true;
			},
			
			moniSuer(){
				this.moniShow = false
				let tha = this
				if(this.tempList == ""){
					uni.showToast({
						title: '请选择跟单用户！',
						icon: 'none'
					});
					return false
				}
				if(this.moniMultiple == 0){
					uni.showToast({
						title: '请输入跟单倍数！',
						icon: 'none'
					});
					return false
				}
				let data = {
					'multiple': this.moniMultiple,
					'orderId': this.documentaryData.orderId,
					'documentaryId': this.documentaryId,
					'userIdList':this.tempList
				}
				
				uni.showModal({
				    title: '模拟跟单',
				    content: "确认选中模拟用户进行跟单吗",
				    success: function (res) {
				        if (res.confirm) {
							uni.showLoading();
							this.tempList = "";
							this.complaints = "";
				            shopkeeperMoniAdd(data).then(res => {
								if(res.success){
									uni.hideLoading();
									uni.showToast({
										title: '操作成功！',
										icon: 'none'
									});
									setTimeout(function() {
										location.reload()
										}, 500);
								}
							})
				        } else if (res.cancel) {
							
				        }
				    }
				})
				
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/.uni-col {
		padding: 0px 0px 5px 0px !important;
		display: flex !important;
		justify-content: center !important;
		align-items: center !important;
	}

	.uni-card--border {
		border: 1px solid #fff;
	}

	.title {
		font-size: 28rpx;
	}

	.rangqiu {
		color: #515ffb;
	}

	.rangqiuBlue {
		color: #2d8cf0 !important;
	}

	.uni-card {
		margin: 0px !important;
		padding: 0px !important;
	}

	page {
		background: #fff;
		font-size: 15px;
		color: #333;
		font-family: Helvetica Neue, Helvetica, sans-serif;
	}
	
	.text {
			font-size: 12px;
			color: #666;
			margin-top: 5px;
	}
	.uni-px-5 {
		padding-left: 10px;
		padding-right: 10px;
	}
	.uni-pb-5 {
		padding-bottom: 10px;
	}
</style>
