<template>
	<view >
		<view class="top_search">
			<u-search class="search" placeholder="请输入想要查找的内容"  v-model="keyword" input-align="center" height="70" @custom="getInput"></u-search>
		</view>
		<!-- {{keyword}} -->
		<view class="img_show">
			 <view class="pubuBox">
			            <view class="pubuItem">
			                <view class="item-masonry" v-for="(item, index) in comList" :key="index">
			                    <image :src="item.img" mode="widthFix"></image>
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
				
				  comList: [
					  {
						img: "http://files.especies.cn/dot/images/1076e0105dab4bf2993c28f83b2acc10/5076e0105dab4bf2993c28f83b2acc10/{4F65A93E-D48B-470A-93C1-7C8B69AD6F31}/0b84c4cb3445423aa411789a08e11b31.jpg",
						des: '中等体型(29厘米)的褐色及黑色水雉。具粗大的白色眉纹，头、颈及下体黑色而带绿色闪光；上体橄榄青铜色，尾栗色，前额栗色，眉白。幼鸟头顶褐色，胸部有些白色。',
						name: '铜翅水雉'
				       },
					   {
						img: "http://files.especies.cn/dot/images/1076e0105dab4bf2993c28f83b2acc10/5076e0105dab4bf2993c28f83b2acc10/{4F783242-BD61-44BB-B971-8F1A107728F9}/703eccfe0c2d4ba5994c840c3c005092.jpg",
						des: '体大(60厘米)的深褐色鸭。头色浅，顶及眼线色深，嘴黑而嘴端黄且于繁殖期黄色嘴端顶尖有一黑点为本种特征。喉及颊皮黄。亚种 zonorhyncha有过颊的深色纹，体羽更黑。',
						name: '斑嘴鸭'
					    },
						{
						img: "http://files.especies.cn/dot/images/1076e0105dab4bf2993c28f83b2acc10/5076e0105dab4bf2993c28f83b2acc10/{4CF5B17D-C03B-4E23-A8BF-3D3F56A0DA3C}/120a081597e24de1bf70eea795310277.jpg",
						des: "中等体型(25厘米)， 翼长，叉形尾，喉皮黄色具黑色边缘(冬候鸟较模糊)。上体棕褐色具橄榄色光泽；两翼近黑；尾上覆羽白色；腹部灰；尾下白；叉形尾黑色",
						name: '普通燕鸻'
						},
						{
						img: "http://files.especies.cn/dot/images/1076e0105dab4bf2993c28f83b2acc10/5076e0105dab4bf2993c28f83b2acc10/{5B3DB6FE-E82C-4A59-B311-19834348C4F4}/8987e7756e664807af0cff43641f9f4a.jpg",
						des: "灰色，似雨燕，尾长，两翼长且弯曲。特征为具竖起的凤头。上体深灰，三级飞羽具八道灰色横纹；具黑色眼罩；下体灰。雄鸟脸侧及耳羽有棕色块斑。亚成鸟多褐色，凤头极小，上多具白色及深褐色鳞纹",
						name: '凤头雨燕4'
						},
						{
						img: "http://files.especies.cn/dot/images/1076e0105dab4bf2993c28f83b2acc10/5076e0105dab4bf2993c28f83b2acc10/{5B3DB6FE-E82C-4A59-B311-19834348C4F4}/8987e7756e664807af0cff43641f9f4a.jpg",
						des: "灰色，似雨燕，尾长，两翼长且弯曲。特征为具竖起的凤头。上体深灰，三级飞羽具八道灰色横纹；具黑色眼罩；下体灰。雄鸟脸侧及耳羽有棕色块斑。亚成鸟多褐色，凤头极小，上多具白色及深褐色鳞纹",
						name: '凤头雨燕3'
						},
						{
						img: "http://files.especies.cn/dot/images/1076e0105dab4bf2993c28f83b2acc10/5076e0105dab4bf2993c28f83b2acc10/{5B3DB6FE-E82C-4A59-B311-19834348C4F4}/8987e7756e664807af0cff43641f9f4a.jpg",
						des: "灰色，似雨燕，尾长，两翼长且弯曲。特征为具竖起的凤头。上体深灰，三级飞羽具八道灰色横纹；具黑色眼罩；下体灰。雄鸟脸侧及耳羽有棕色块斑。亚成鸟多褐色，凤头极小，上多具白色及深褐色鳞纹",
						name: '凤头雨燕2'
						},
						{
						img: "http://files.especies.cn/dot/images/1076e0105dab4bf2993c28f83b2acc10/5076e0105dab4bf2993c28f83b2acc10/{5B3DB6FE-E82C-4A59-B311-19834348C4F4}/8987e7756e664807af0cff43641f9f4a.jpg",
						des: "灰色，似雨燕，尾长，两翼长且弯曲。特征为具竖起的凤头。上体深灰，三级飞羽具八道灰色横纹；具黑色眼罩；下体灰。雄鸟脸侧及耳羽有棕色块斑。亚成鸟多褐色，凤头极小，上多具白色及深褐色鳞纹",
						name: '凤头雨燕1'
						},
				
					]
			}   
		},
		onLoad() {
			
		},
		methods: {
			getInput(e){
				console.log(e)
			},
			goForm(){
				uni.navigateTo({
					url:"../inputForm/inputForm"
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
