// pages/collect/collect.js
const db = wx.cloud.database();
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
    books_list: null,
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
      number: this.data.number
    })
  },
  //收藏书籍的选中触发事件
  book_selected(e) {
    if (this.data.event_flag) {
      var index = e.currentTarget.id;
      this.data.img_display[index] = this.data.img_display[index] == "block" ? "none" : "block";
      this.data.number += this.data.img_display[index] == "block" ? 1 : -1;
      this.setData({
        img_display: this.data.img_display,
        number: this.data.number
      });
    } else {
      console.log(e);
          //   //获取书籍内容
          const index = e.currentTarget.id;
          const book = this.data.books_list[index]
          //将书本的信息传入到bookInfo页面
          wx.navigateTo({
            url: '/pages/bookInfo/bookInfo',
            //通过信息通道将book对象传到bookinfo页面    
            success: function(res) {
              res.eventChannel.emit('acceptDataFromOpenerPage', { data: book })
            }
          })
        
    }
  },
  //全选按钮的监听事件
  all_select(e) {
    if (this.data.event_flag) {
      this.data.all_flag = this.data.all_flag == true ? false : true;
      this.data.number = this.data.img_display.length;
      if (this.data.all_flag) {
        this.data.img_display.fill('block');
      } else {
        this.data.img_display.fill('none');
      }
    }
    //相应式触发
    this.setData({
      img_display: this.data.img_display,
      all_flag: this.data.all_flag,
      number: this.data.number
    })
  },
  //取消收藏事件e
  async cancel_collect(e) {
    const len = this.data.img_display.length;
   for (let i = 0; i < len; i++) {
      if (this.data.img_display[i] == 'block') {
        console.log(this.data.img_display[i]);
        await wx.cloud.callFunction({
          name: "delData",
          data: {
            collection: "CollectBook",
            _id: this.data.books_list[i]._id
          }
        }).catch(res => {
          console.log(res);
        })
        this.data.img_display.splice(i, 1);
        this.data.books_list.splice(i, 1);
      }
    }
    this.setData({
      img_display:this.data.img_display,
      books_list: this.data.books_list
    })

    //点击取消之后的数据处理
    this.data.img_display.fill('none');
    this.data.number = 0;
    this.setData({
      img_display: this.data.img_display,
      number: this.data.number
    })
  },
  async loadData(){
    const that = this;
    db.collection('CollectBook').get().then(res => {
      //页面加载的时候从数据库中获取用户所收集的书籍列表
      // console.log(res);
      that.setData({
        books_list: res.data
      })
    })
  },
  onShow() {
    this.loadData();
    wx.hideTabBarRedDot({
      index: 2,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 显示新添的文字
    //可做成闪动效果 循环调用显示隐藏事件 showTabBarRedDot hideTabBarRedDot
    // wx.setTabBarBadge({
    //   index: 2,
    //   text: "2",
    // })
  },

})