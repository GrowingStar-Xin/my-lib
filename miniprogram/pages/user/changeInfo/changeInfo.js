// miniprogram/pages/user/changeInfo/changeInfo.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
      key:null,
      val:null,
      //当前用户的唯一标识：_openid
      _openid: null
  },
  async getVal(e) {
    this.data._openid = await getApp().getOpenid();
    console.log(this.data._openid);
    const val = e.detail.value;
    if(!val) {
      return
    }else {
      this.data.val = val;
    }
    
  },
  async submit() {
    const _this  = this;
    await wx.cloud.callFunction({
      name:"updateUser",
      data:{
        key:_this.data.key,
        changeVal: _this.data.val,
        _openid:_this.data._openid
      }
    }).then(res=>{
      console.log(res);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
    this.data.key = options.key;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})