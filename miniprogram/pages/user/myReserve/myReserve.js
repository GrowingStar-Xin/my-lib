// miniprogram/pages/user/myReserve/myReserve.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
 onLoad: function (options) {
    const currentDay = new Date().toLocaleDateString();
    // 24 * 60 * 60 * 1000 通过时间戳算出下一天的日期
    const date = Date.now() + 86400000;
    const nextDay = new Date(date).toLocaleDateString();
    const that = this;
    wx.cloud.callFunction({
      name:"getReserve",
      data:{
        date:currentDay
      }
    }).then(res=>{
      //console.log(res.result.data);
      const arr =  res.result.data;
      that.data.record.push(...arr);
      that.setData({
        record: this.data.record
      })
    })
    wx.cloud.callFunction({
      name:"getReserve",
      data:{
        date:nextDay
      }
    }).then(res=>{
      console.log(res.result.data);
      const arr =  res.result.data;       
      that.data.record.push(...arr);
      that.setData({
        record: this.data.record
      })
    })

  }
})