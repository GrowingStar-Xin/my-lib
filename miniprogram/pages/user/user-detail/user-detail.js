// pages/user-detail/user-detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    val:null
  },
  changeInfo(e) {
    console.log(e.target.dataset.key);
    const key = e.target.dataset.key;
    if (key) {
      wx.navigateTo({
        url: '/pages/user/changeInfo/changeInfo?key='+key,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(this.getOpenerEventChannel()) {
      const eventChannel = this.getOpenerEventChannel()
      const that = this;
      // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
      eventChannel.on('acceptDataFromOpenerPage', function(data) {
        that.setData({
          user:data.data
        })
      })
    }
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