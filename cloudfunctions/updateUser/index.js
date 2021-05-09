// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: "mylib-6g5dx8lw51411b8d"
})

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(111, event);
  const key = event.key;
  console.log('key', key);
  return db.collection('User').where({
            _openid: event._openid
          }).update({
            data:{
              [key]: event.changeVal
            }
           
          }).then(res=>res)
}