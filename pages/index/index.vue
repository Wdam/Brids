<template>
	<view >
		<view class="top_search">
			<u-search class="search" placeholder="请输入想要查找的内容"  v-model="keyword" input-align="center" height="70" @custom="getInput" :clearabled="true" @clear="Clear"></u-search>
		</view>
		<!-- {{keyword}} -->
		<view class="img_show">
			 <view class="pubuBox">
			            <view class="pubuItem">
			                <view class="item-masonry" v-for="(item, index) in comList" :key="index">
								<!-- <view  v-for="(imgitem,index) in item.img" :key="index">
									 <image :src="imgitem[0]" mode="widthFix" @click="toDeali(item.id)"></image>
								</view> -->
			                    <image :src="item.img[0]" mode="widthFix" @click="toDeali(item.id)"></image>
			                    <view class="listtitle"> <!-- 这是没有高度的父盒子（下半部分） -->
			                        <view class="listtitle1">{{ item.des }}</view>
			                        <view class="listtitle2">
			                            <!-- <text class="listtitle2son">￥</text> -->
			                            {{ item.name }}
			                        </view>
			                        <!-- <view class="listtitle3">
			                            来自莫成尘的旗舰店
			                        </view> -->
			                    </view>
			                </view>
			            </view>
			        </view>
		</view>
		<view class="plus" @click="goForm">
			<image  src="../../static/plus.png" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				bridimg:[],
				comList: []
			}   
		},
		onLoad() {
			this.openSQL()
		},
		onShow() {
			this.openSQL()
		},
		methods: {
			getInput(e){
			let	res = this.selectMatchItem(this.comList,e)
				console.log(res)
				this.comList = res
			},
			Clear(){
				
			},
			selectMatchItem(lists, keyWord) {
			    let reg =  new RegExp(keyWord);
			    let resArr = [];
			    lists.filter(item => {
			        for(let i in item){
			            if (reg.test(item[i])) {
			                resArr.push(item);
			            }
			        }
			    })
			    return resArr;
			},

			goForm(){
				uni.navigateTo({
					url:"../inputForm/inputForm"
				})
			},
			toDeali(id){
				uni.navigateTo({
					url:`../detail/detail?id=${id}`
				})
			},
			isOpenSQL(){
				return plus.sqlite.isOpenDatabase({
					name:"brids",
					path:'_doc/brids.db',
				})
			},
			openSQL(){
				const SQL = 'select * from bridstable'
				if(!this.isOpenSQL()){
					plus.sqlite.openDatabase({
						name:"brids",
						path:'_doc/brids.db',
						success:()=>{
							//查询数据库
							this.selectSql(SQL)
							
							
						}
					})
				}
			},
			selectSql(SQL){
				plus.sqlite.selectSql({
					name:'brids',
					//sql:'select * from bridstable',
					sql:SQL,
					success:(data)=>{
						console.log('sql success')
						//console.log(data)
						//this.comList = data
						for (let i in data){
							let newimg = []
							//console.log(i)
							//console.log(data[i].img)
							//console.log(data[i].img.split(','))
							newimg = data[i].img.split(',')
							data[i].img = newimg
							
						}
						console.log(data)
						this.comList = data
					},
					fail:(e)=>{
						console.log('selectSql failed: '+JSON.stringify(e));
					}
				})
			},
			closeDB(){
				plus.sqlite.closeDatabase({
					name:"brids",
					success:()=>{
						console.log('close success')
					},
					fail:(e)=>{
						console.log('close fail')
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.top_search{
		height: 100rpx;
		width: 100%;
		display: flex;
		position: sticky;
		top: 0;
		background: #FFFFFF;
		//border: 1px solid #909399;
		justify-content: space-around;
		align-items: center;
		margin: 0 auto;
		z-index: 9999;
		.search{
			padding-left: 30rpx;
			padding-right: 30rpx;
		}
	}
	.img_show{
		height: 100%;
		width: 100%;
		background: #f8f8f8;
		margin: 0 auto;
		.pubuBox {
		        padding: 22rpx;
		    }
		
		    .pubuItem {
		        column-count: 2;
		        column-gap: 20rpx;
		    }
		
		    .item-masonry {
		        box-sizing: border-box;
		        border-radius: 15rpx;
		        overflow: hidden;
		        background-color: #fff;
		        break-inside: avoid;
		        /*避免在元素内部插入分页符*/
		        box-sizing: border-box;
		        margin-bottom: 20rpx;
		        box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);
		    }
		
		    .item-masonry image {
		        width: 100%;
		    }
		
		    .listtitle {
		        padding-left: 22rpx;
		        font-size: 24rpx;
		        padding-bottom: 22rpx;
		
		        .listtitle1 {
		            line-height: 39rpx;
		            text-overflow: -o-ellipsis-lastline;
		            overflow: hidden;
		            text-overflow: ellipsis;
		            display: -webkit-box;
		            -webkit-line-clamp: 2;
		            line-clamp: 2;
		            -webkit-box-orient: vertical;
		            min-height: 39rpx;
		            max-height: 78rpx;
		        }
		
		        .listtitle2 {
		            //color: #ff0000;
					text-overflow:ellipsis;
		            font-size: 32rpx;
		            line-height: 32rpx;
		            font-weight: bold;
		            padding-top: 22rpx;
		
		            .listtitle2son {
		                font-size: 32rpx;
		            }
		        }
		
		        .listtitle3 {
		            font-size: 28rpx;
		            color: #909399;
		            line-height: 32rpx;
		            padding-top: 22rpx;
		        }
		    }

		
	}
	.plus{
		position: fixed;
		//background: #18B566;
		bottom:200rpx;
		right:60rpx;
		width: 110rpx;
		height: 120rpx;
		
		image{
			display:block;
			width: 100%;
			height: 100%;
		}
	}
</style>
