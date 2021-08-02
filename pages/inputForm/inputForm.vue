<template>
	<view>
		<view class="top_img">
			<view class="preImg" v-for="(item,index) in tempImg" :key='index'>

				<image :src="item" mode="" @click="lookImg(index)"></image>
				<span class="image-remove" @click="removeImage(index)">+</span>
			</view>
			<view class="chooseImg" @click="chooseImg">
				<u-icon class="icon" name="plus" size="50" ></u-icon>
			</view>
		</view>
		<view class="form">
			<u-form :model="form" ref="uForm" label-align="center">
				<u-form-item label="目"><u-input v-model="form.mu"></u-input></u-form-item>
				<u-form-item label="科"><u-input v-model="form.ke"></u-input></u-form-item>
				<u-form-item label="属"><u-input v-model="form.shu"></u-input></u-form-item>
				<u-form-item label="种"><u-input v-model="form.zhong"></u-input></u-form-item>
				<u-form-item label="名称"><u-input v-model="form.name"></u-input></u-form-item>
				<view class="des">
					<text>形态描述</text>
					<u-input v-model="form.des" type="textarea" maxlength="300"></u-input>
				</view>
			</u-form>
		</view>
		<button type="primary" @click="saveInfo()">确认保存</button>
	</view>
</template>

<script>
	import {openComDB,executeSQL,dropSQL} from '../../SQL/sql.js'
	export default {
		
		data() {
			return {
				tempImg:[],
				
				flag:true,
				form:{
					id:'',
					mu:'',
					ke:'',
					shu:'',
					zhong:'',
					name:'',
					des:'',
					img:[],
					
				}
			};
		},
	
		 onBackPress() {
			//判断数据库是否打开 
		const isopen = plus.sqlite.isOpenDatabase({
				name:'brids',
				path:'_doc/brids.db'
			})
			if(isopen){
				this.closeDB()
			}
			
		},
		methods:{
			chooseImg(){
				uni.chooseImage({
					count:3,
					sourceType:['album','camera'],
					success: (res) => {
						//this.tempImg.push(res.tempFilePaths)
						this.tempImg = res.tempFilePaths
						//console.log(this.tempImg)
						
					}
				})
			},
			
			lookImg(index){
				const urls=  this.tempImg
				const current = index
				uni.previewImage({
					urls:urls,
					current:current
				})
			},
			removeImage(index){
				//console.log('123')
				this.tempImg.splice(index,1)
			},
			saveInfo(){
				console.log('saveInfo')
				//console.log(this.tempImg)
				this.form.img = this.tempImg
				this.getTime()
				console.log(this.form)
				uni.showModal({
					title:'警告',
					content:'确认提交吗',
					success: (res) => {
						if(res.confirm){
							this.openDB()
							this.executeSQL()
							uni.navigateBack({
								delta:1
							})
						}else if(res.cancel){
							console.log('用户点击取消')
						}
					}
				})
			},
			getTime(){
				const time = Date.parse(new Date())
				this.form.id = time
			},
			 openDB(){
				 const isopen = plus.sqlite.isOpenDatabase({
				 		name:'brids',
				 		path:'_doc/brids.db'
				 	})
					if(!isopen){
						plus.sqlite.openDatabase({
							name:'brids',
							path:'_doc/brids.db',
							success:(e)=>{
								console.log('openDatabase')
							},
							fail:(e)=>{
									console.log("fail"+JSON.stringify((e)))
									//this.closeDB()
								}
							})
					}else{
						console.log('opened')
					}
				 
					
			},
			executeSQL(){
				//创建表

				plus.sqlite.executeSql({
					name:'brids',
					sql:'create table if not exists bridstable("id" INT(20),"mu" CHAR(50),"ke" CHAR(50),"shu" CHAR(50),"zhong" CHAR(50),"name" CHAR(50),"des" CHAR(400),"img"CHAR(300))',
					success:(e)=>{                          //${id}','${mu}','${ke}','${shu}','${zhong}','${name}','${des}','${img}'
						
						console.log('executeSql success!')
						//插入数据
						this.insertSQL()
					},
					fail:(e)=>{
						console.log("excutefaill"+JSON.stringify(e))
					}
				})
			},
			insertSQL(){
				//插入数据
				const{id,mu,ke,shu,zhong,name,des,img} = this.form
				
				plus.sqlite.executeSql({
					name:'brids',
					sql:`insert into bridstable values('${id}','${mu}','${ke}','${shu}','${zhong}','${name}','${des}','${img}')`,
					success:()=>{
						console.log("insert success")
						
					},
					fail:(e)=>{
						console.log("insert fail"+JSON.stringify(e))
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
	page{
		background: #d0d0d1;
	}
.top_img{
	width: 100%;
	margin-top: 10px;
	//background: #18B566;
	display: flex;
	justify-content: flex-start;
	
	.preImg{
		position: relative;
		width: 150rpx;
		height: 150rpx;
		border-radius: 20px;
		overflow: hidden;
		margin-left: 10px;
		image{
			width: 100%;
			height: 100%;
		}
		.image-remove{
			 background-color: #000000;
			  //font-color: #181716;
			  font-size: 27px;
			  color: #FFFFFF;
			  width: 30px;
			  height: 30px;
			  text-align: center;
			  border-radius: 100%;
			  transform: rotate(45deg); 
			  cursor:pointer;
			  opacity: 0.5;
			  top:-7px;
			  right:-5px;   //top、right: 距离上侧2个像素，距离右侧两个像素，也就是右上角
			  display: block; //块元素:设置宽和高，inline元素设置宽高无效
			  position: absolute;
			
		}
	}
	.chooseImg{
		width: 150rpx;
		height: 150rpx;
		background: #f4f5f6;
		border-radius: 20px;
		margin-left: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
.form{
	width: 95%;
	
	background:#F8F8FF;
	margin: 0 auto;
	border-radius: 10px;
	margin-top: 20rpx;
	margin-bottom: 50rpx;
	.des{
		border-bottom: 1px solid #cccccc;
		padding-left: 13rpx;
	}
}

</style>
