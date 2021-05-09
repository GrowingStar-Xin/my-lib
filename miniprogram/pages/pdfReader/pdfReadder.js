// miniprogram/pages/pdfReader/pdfReadder.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    content:"",
    chapterId:1,
    index:0,
    chapters:[],
    book:null,
    hasBook:false
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
    this.getChapterLen();
    this.getChapter();
  },
  //选择章节
  chanpterChange(e){
    const index = e.detail.value;
    //选中的章节没有改变，不请求数据库
    if ((index + 1) == this.data.chapterId) {
      return;
    } 
    this.data.chapterId = +index+1;
    this.getChapter();
    this.setData({
      index:e.detail.value
    })
  },
  //下一章节
  nextChapter(){
    if (this.data.chapterId == this.data.chapters.length) {
      wx.showToast({
        title:'已是末章节',
        icon:"error"
      })
      return;
    } 
    this.data.chapterId++;
    this.getChapter()
  },
  //上一章节
  preChapter() {
    if (this.data.chapterId == 1) {
      wx.showToast({
        title: '已是首章节！',
        icon:"error"
      })
      return;
    } 
    this.data.chapterId--;
    this.getChapter()
  },
  getChapter() {
    wx.showLoading({
      title: 'Loading...',
    })
    const _this = this;
    console.log(this.data.book._id);
    wx.cloud.callFunction({
      name:"getBook",
      data:{
        collection:_this.data.book._id,
        chapterId: this.data.chapterId
      }
    }).then(res=>{
      this.setData({
        title:res.result.data[0].title,
        content:res.result.data[0].content
      })
      wx.hideLoading()
    }).catch(()=>{
        wx.showLoading({
          title: '无该书籍!',
        })
        setTimeout(()=>{
          wx.navigateBack({
            delta: 0,
          })
          wx.hideLoading({})
        },1000)
    })
  },
  //获取文章总章节数
  getChapterLen(){
    const _this = this;
    wx.cloud.callFunction({
      name:"getChaptersLen",
      data:{
        collection:_this.data.book._id,
      }
    }).then(res=>{
      const len = res.result.data[0].chapterLen;
      for(let i = 1; i <= len; i++) {
        this.data.chapters.push(`第${i}章`)
      }
      this.setData({
        chapters:this.data.chapters
      })
    })
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