// miniprogram/pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: async function () {
    console.log(this.openid = await getApp().getOpenid())
  },
  
  //在本page的其他函数里获得openid。
  yourFunc: function(){
    console.log(this.openid)
  }

})