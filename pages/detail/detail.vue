<template>
	<view>
		<view class="top_img">
			
			<view class="" v-for="(item,index) in bridslist">
			<image :src="item" mode="widthFix" @click="lookimg(index)"></image> 
			</view>
		</view>
		<view class="classfily">
			<p>界：动物界 门：脊索动物门</p>
			<text>纲：鸟纲目; 目：{{data[0].mu}}；科：{{data[0].ke}}；属：{{data[0].shu}}； 种：{{data[0].zhong}}; 名称:{{data[0].name}}</text>
		</view>
		<view class="description">
			  <p class="title"> 形态描述</p>
			<view class="description_info">
				{{data[0].des}}
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				bridslist:[],
				data:[]
			}
		},
		onLoad(options) {
			console.log(options)
			//打开数据库，按id查找数据库，关闭数据库
			const {id} = options
			this.id = id
			this.openSQL()
			console.log('opensql run')
			//console.log(this.bridslist)
			
		},
		onShow() {
			this.openSQL()
		},
		onBackPress() {
			if(this.isOpenSQL()){
				this.closeDB()
			}
		},
		onReady() {
			console.log(this.bridslist)
		},
		methods: {
			openSQL(){
				if(!this.isOpenSQL()){
					plus.sqlite.openDatabase({
						name:"brids",
						path:'_doc/brids.db',
						success:()=>{
							//查询数据库
							this.selectSql()
							// plus.sqlite.executeSql({
							// 	name:"brids",
							// 	sql:'drop database brids',
							// 	success:() =>{
							// 		console.log('1221')
							// 	},
							// 	fail:(e)=>{
							// 		console.log('2323',JSON.stringify(e))
							// 	}
							// })
							console.log('111111')
						}
					})
				}else{
					this.selectSql()
					console.log('this.selectSql')
				}
			},
			selectSql (){
				let imglist = []
			   plus.sqlite.selectSql({
					name:'brids',
					//sql:'select * from bridstable',
					sql:`select  * from bridstable where id = ${this.id}`,
					   success:(data)=>{
						console.log('sql success')
						//console.log(data)
						this.data = data
						//console.log('1111',this.data[0].mu)
						//console.log('11111',data[0].img.split(','))
						//imglist = data.img.split(',')
						//this.bridslist = imglist
						//console.log(imglist)
						//console.log(this.bridsitem)
					    this.bridslist = data[0].img.split(',')
						console.log('1212',this.bridslist)
						
						
					},
					fail:(e)=>{
						console.log('selectSql failed: '+JSON.stringify(e));
					}
				})
			},
			isOpenSQL(){
				return plus.sqlite.isOpenDatabase({
					name:"brids",
					path:'_doc/brids.db',
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
			},
			lookimg(index){
				
				uni.previewImage({
					urls:this.bridslist,
					current:index
				})
			}
		}
	}
</script>

<style lang="scss">
.top_img{
	width: 96%;
	//height: 700rpx;
	//background: #007AFF;
	margin: 10rpx auto;
	border-radius: 10px;
	text-align: center;
}
.classfily{
	width: 96%;
	height: 150rpx;
	background: #e1e1e1;
	margin: 10rpx auto;
	border-radius: 15px;
	text-align: center;
	//line-height: 100rpx;
	padding-top: 30rpx;
	
}
.description{
	height: 90rpx;
	width: 96%;
	background: #669999;
	margin: 10rpx auto;
	border-radius: 15px 15px 0 0;
	line-height: 90rpx;
	//padding-left: 20rpx;
	font-size: 20px;
	.title{
		text-indent: 20rpx;
	}
}
.description_info{
	//height: 500rpx;
	padding-left: 20rpx ;
	padding-right: 20rpx;
	width: 100%;
	background: #CCCCCC;
	margin: 0 auto;
	border-radius: 0 0 15px 15px ;
	font-size: 15px;
	line-height: 35px;
	margin-bottom: 100rpx;
	
}

</style>
