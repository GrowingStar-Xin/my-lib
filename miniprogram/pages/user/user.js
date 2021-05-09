// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null
  },
  //跳转到书架页面
  toCollectPage() {
    wx.switchTab({
      url: '/pages/collect/collect',
    })
  },
  //借阅信息页面
  toBorrowInfoPage() {
    wx.navigateTo({
      url: '/pages/user/borrowInfo/borrowInfo',
    })
  },
  //跳转到预约页面
  toMyReserve() {
    wx.navigateTo({
      url: '/pages/user/myReserve/myReserve',
    })
  },
  //跳转到详情页面
  toUserDetail() {
    const that = this;
    wx.navigateTo({
      url: '/pages/user/user-detail/user-detail',
        //将user的信息传递到detail页面    
        success: function(res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: that.data.user})
        }
    })
  },
  //在本page的其他函数里获得openid,获取并初始化用户信息
  async iniUserInfo() {
    
    const that = this;
    this.data._openid = await getApp().getOpenid();
    wx.cloud.callFunction({
      name: "getUser",
      data: {
        _openid: that.data._openid
      }
    }).then(res => {
      const obj = res.result.data;
      if (obj.length != 0) {
        console.log(obj);
        this.data.user = obj[0];
        this.setData({
          user: this.data.user
        })
      } else {
        wx.showModal({
          title: '提示',
          content: "当前用户未注册!",
          showCancel: false,
          confirmColor: "#009efd",
          // 跳转到注册模块
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/user/register/register',
              })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期
   */
  onLoad: function () {
    this.iniUserInfo()
  }
})