// pages/user/history-record/history-record.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 编辑按钮的文字内容
    operation_text: "编辑",
    //编辑状态是否触发的标志
    event_flag: false,
    //收藏书籍的列表
    books_list: [{
      nav_src: "",
      img_src: "https://images-cn.ssl-images-amazon.cn/images/I/61MFpcnEAWL.jpg",
      book_name: "人性的弱点",
    }, {
      nav_src: "",
      img_src: "https://images-cn.ssl-images-amazon.cn/images/I/514805GEf7L._SY346_.jpg",
      book_name: "奥里森:马登谈成功"
    }, {
      nav_src: "",
      img_src: "https://images-cn.ssl-images-amazon.cn/images/I/514805GEf7L._SY346_.jpg",
      book_name: "奥里森:马登谈成功"
    }, {
      nav_src: "",
      img_src: "https://images-cn.ssl-images-amazon.cn/images/I/514805GEf7L._SY346_.jpg",
      book_name: "奥里森:马登谈成功"
    }, {
      nav_src: "",
      img_src: "https://images-cn.ssl-images-amazon.cn/images/I/514805GEf7L._SY346_.jpg",
      book_name: "奥里森:马登谈成功"
    }, {
      nav_src: "",
      img_src: "https://images-cn.ssl-images-amazon.cn/images/I/61MFpcnEAWL.jpg",
      book_name: "人性的弱点",
    }, {
      nav_src: "",
      img_src: "https://images-cn.ssl-images-amazon.cn/images/I/61MFpcnEAWL.jpg",
      book_name: "人性的弱点",
    }],
    //收藏书籍的列表长度
    len: 0,
    //编辑按钮按下后图片可视的标志
    img_display: null,
    //选中的收藏书籍数量
    number: 0,
    //全选按钮的事件处理
    all_flag: false
  },
  // 对收藏页面的右上角编辑按钮的监听事件
  operation(e) {
    //操作前初始化数据
    this.data.event_flag = false;
    this.data.operation_text = "编辑";
    this.data.number = 0;
    //获取收藏列表的长度
    var len = this.data.books_list.length;
    this.data.img_display = this.data.img_display == null ? new Array(len) : null;
    if (this.data.img_display) {
      this.data.operation_text = "完成";
      this.data.event_flag = true;
      this.data.img_display.fill('none');
    }
    // 相应式应答
    this.setData({
      operation_text: this.data.operation_text,
      img_display: this.data.img_display,
      event_flag: this.data.event_flag,
      number:this.data.number
    })
  },
//收藏书籍的选中触发事件
  book_selected(e) {
    if (this.data.event_flag) {
      var index = e.currentTarget.id;
      this.data.img_display[index] = this.data.img_display[index] == "block" ? "none" : "block";
      this.data.number += this.data.img_display[index]=="block" ? 1: -1; 
      this.setData({
        img_display: this.data.img_display,
        number:this.data.number
      });
    }
  },
  //全选按钮的监听事件
  all_select(e){
    if(this.data.event_flag){
      this.data.all_flag = this.data.all_flag == true ? false : true;
      this.data.number = this.data.img_display.length;
      if(this.data.all_flag){
        this.data.img_display.fill('block');
      } else{
        this.data.img_display.fill('none');
      }
    }
    //相应式触发
    this.setData({
      img_display:this.data.img_display,
      all_flag:this.data.all_flag,
      number:this.data.number
    })
  },
  //取消收藏事件e
  cancel_collect(e){
    //点击取消之后的数据处理
    this.data.img_display.fill('none');
    this.data.number = 0;
    this.setData({
      img_display:this.data.img_display,
      number:this.data.number
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取屏幕的高度
    //let that = this;
    // wx.getSystemInfo({
    //   success: function (res) {
    //     let clientHeight = res.windowHeight;
    //     let clientWidth = res.windowWidth;
    //     let radio = 750 / clientWidth;
    //     let rptHeight = clientHeight * radio;
    //     that.setData({
    //       clientHeight: rptHeight
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面初始化完成之后对数据进行赋值

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