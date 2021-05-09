// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const collection = db.collection(event.collectionName);
  const len = event.arr.length;
  for (let i = 0; i < len; i++) {
    collection.add({
      data: event.arr[i],
    }
    ).catch(console.error)
  } 
}