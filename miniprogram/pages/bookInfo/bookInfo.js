// miniprogram/pages/bookInfo/bookInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用于接受收索页面传入的对象
    book:null,
    //是否加入预选栏
    isSelect: false,
    // //是否点赞
    // isZan: false
  },
  onZan() {
    this.setData({
      isZan: this.data.isZan ? false : true
    })
    if (this.data.isZan) {
      book.browse++;
    } else {
      book.browse--;
    }
  },
  onAdd() {
    this.setData({
      isSelect: this.data.isSelect ? false : true
    })
  },
  readOnline(){
    //获取书籍内容
    const book = this.data.book
    //将书本的信息传入到pdfReader页面
    wx.navigateTo({
      url: "/pages/pdfReader/pdfReadder",
      //通过信息通道将book对象传到bookinfo页面    
      success: function(res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: book })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const eventChannel = this.getOpenerEventChannel()
      const that = this;
      // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
      eventChannel.on('acceptDataFromOpenerPage', function(data) {
        that.data.book = data.data;
        that.setData({
          book:that.data.book
        })
      })
  }, 

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    const that = this;
    //当用户有点击收藏的话，就将数据返回
    if (this.data.isSelect) {
      wx.setStorage({
        data: that.data.book,
        key: 'book',
      }).catch(console.error)
    }
  },

})