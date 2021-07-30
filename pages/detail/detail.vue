<template>
	<view>
		<view class="top_img">
			<image src="../../static/test.jpg" mode="widthFix"></image>
		</view>
		<view class="classfily">
			<p>界：动物界 门：脊索动物门</p>
			<text>纲：鸟纲目：雁形目科：鸭科属：鸳鸯属 种：鸳鸯</text>
		</view>
		<view class="description">
			  <p class="title"> 形态描述</p>
			<view class="description_info">
				体小(40厘米)而色彩艳丽的鸭类。雄鸟有醒目的白色眉纹、金色颈、背部长羽以及拢翼后可直立的独特的棕黄色炫耀性"帆状饰羽"。雌鸟不甚艳丽--亮灰色体羽及雅致的白色眼圈及眼后线。雄鸟的非婚羽似雌鸟，但嘴为红色。
				虹膜－褐色；嘴－雄鸟红色，雌鸟灰色；脚－近黄色。
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(options) {
			console.log(options)
		},
		methods: {
			
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
	
}

</style>
