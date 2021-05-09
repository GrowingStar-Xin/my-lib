// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env:"mylib-6g5dx8lw51411b8d"
})
// 云函数入口函数
exports.main = async (event, context) => {

  return  await db.collection('Book')
                  .get()
                  .then(res=>{
                    return res;
                  })
}