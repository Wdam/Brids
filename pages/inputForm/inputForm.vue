<template>
	<view>
		<view class="chooseImg">
			<u-icon class="icon" name="plus" size="50" @click="chooseImg"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			chooseImg(){
				uni.chooseImage({
					count:1,
					sourceType:['album','camera'],
					success: (res) => {
						console.log(JSON.stringify((res)))
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.chooseImg{
	width: 200rpx;
	height: 200rpx;
	background: #f4f5f6;
	display: flex;
	justify-content: center;
	align-items: center;
	
	//margin: 0 auto;te
	
}
</style>
