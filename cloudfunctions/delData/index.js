// 云函数入口文件
//删除收藏列表的书籍
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env:"mylib-6g5dx8lw51411b8d"
})
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection(event.collection).where({
    _id:event._id
  }).remove().catch(res=>{
    return res;
  })

}