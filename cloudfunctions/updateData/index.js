// 云函数入口文件
const cloud = require('wx-server-sdk')

const db = wx.cloud.database({
  env:"mylib-6g5dx8lw51411b8d"
})
cloud.init()

// 云函数入口函数
//可以用于更新多条数据
exports.main = async (event, context) => {
   return await db.collection('BorrpwBooks').update({
     data:{
       name:  event.detail.name
     }
   }).then(res=>{
     console.log(res);
   }).catch(console.error);
  
}