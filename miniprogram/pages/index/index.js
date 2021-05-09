// pages/index.js
const db = wx.cloud.database()
const Book = db.collection('Book')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //菜单列表
    menu_list: [{
      template_name: 'mlib',
      menu_item: '莞工图书'
    }, {
      template_name: 'search_book',
      menu_item: '书籍搜索'
    }, {
      template_name: 'online_book',
      menu_item: '书籍借阅'
    }, {
      template_name: 'subscribe',
      menu_item: '预约座位'
    }, {
      menu_item: '书本录入'
    }],
    //轮播图的图片列表
    swiper_img_list: [{
        id: 1,
        url: "",
        src: 'https://th.bing.com/th/id/R2ee26343ee8ac2d6342e01f69a6427c7?rik=ogfsV45zh8vBQA&riu=http%3a%2f%2fimg1.juimg.com%2f170327%2f330687-1F32G00H196.jpg&ehk=g78xm7Zakqx3RtWaXZtEUDhmlXL%2b3MDgD2N3yeqnOzg%3d&risl=&pid=ImgRaw'
      }, {
        id: 2,
        url: "",
        src: 'https://tse2-mm.cn.bing.net/th/id/OIP.8-opN3v8f3Iqv7_wiDT_gwHaE2?pid=ImgDet&w=1024&h=670&rs=1'
      },
      {
        id: 3,
        url: "",
        src: "https://uploadfile.huiyi8.com/up/52/e5/e7/52e5e7840006497d0ff32962236f44cf.jpg"
      }
    ],
    // 轮播图的索引下标-内容区
    index: 0,
    //搜索到的结果
    searchRes: "",
    //接收本地缓存的书本
    mStorage: [],
    //mStorage 是否选中的按钮
    mStorage_flag: [],
    //用户选中的书籍
    last: [],
    //用户的借阅信息
    record: {
      sno: null,
      name: null,
      detail: [],
      return: false
    },
    //用户的预约信息页
    reserve: {
      name: null,
      sno: null
    },
    //用户的信息
    user: null,
    //当前用户的唯一标识：_openid
    _openid: null
  },
  show_content(e) {
    this.data.index = e.currentTarget.id;
    // console.log(e.currentTarget.id)
    this.setData({
      index: this.data.index
    })
  },
  //查找书籍函数界面
  search(res) {
    //调用云函数找所需要的数据
    wx.cloud.callFunction({
      name: "getData",
      data: {
        collection: "Book",
        filter: res.detail
      }
    }).then(res => {
      this.setData({
        searchRes: res.result.data
      })

    }).catch(console.error);
  },

  // 书本信息录入界面函数
  addData(res) {
    // console.log(res);
    Book.add({
      data: res.detail,
      success: function (res) {
        wx.showToast({
          title: '录入成功',
          icon: "success",
          mask: true
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '录入失败',
          icon: "none",
          mask: true
        })
      }
    })
  },

  /**
   *搜索页面-数据处理函数 
   */
  collation: function (arr) {
    let selectArr = [];
    arr.forEach((v, i) => {
      if (v) {
        selectArr.push(this.data.mStorage[i]);
      }
    })
    //过滤掉已选中的数据内容
    let unSelectArr = [...this.data.mStorage].filter((v) => !selectArr.includes(v));
    //重置mStorage_flag
    const len = unSelectArr.length;
    this.data.mStorage_flag = new Array(len);
    this.data.mStorage_flag.fill(false);
    this.data.last.push(...selectArr)
    this.setData({
      mStorage: unSelectArr,
      mStorage_flag: this.data.mStorage_flag,
      last: this.data.last
    })
    //console.log('last', this.data.last);
    return selectArr;
  },
  /**
   * 搜索页面-收藏操作
   */
  collectBook: function (res) {
    //console.log(res);
    const cb = res.detail.cb;
    const arr = this.collation(res.detail.selected_flag)
    //console.log("collect",arr);
    //调用云函数addData
    wx.cloud.callFunction({
      name: "addData",
      data: {
        collectionName: "CollectBook",
        arr: arr
      }
    }).then(res => {
      cb();
      // console.log(res);
    })
  },
  /**
   * 搜索页面-清除操作
   */
  removeBook: function (res) {
    this.collation(res.detail);
  },
  /**
   * 搜索页面-借阅操作
   */
  borrowBook: function (res) {
    this.collation(res.detail)
    console.log("subscribe", res);
    this.setData({
      index: 2
    })
  },
  /**
   * 书籍借阅页面 提交借阅数据
   */
  borrowSubmit: function (res) {
    //console.log('detail',res.detail);
    const that = this;
    //遍历用户想要借阅的书本然后将其名字、书本图片地址放入借阅详情中
    const borrowed = res.detail.selectedArr;
    const length = res.detail.length;
    borrowed.forEach((v, i) => {
      this.data.record.detail.push({
        bookName: v.bookName,
        imgSrc: v.imgSrc
      })
    })
    //添加开始借阅时间
    this.data.record.time = new Date().toLocaleDateString();
    this.data.record.length = length;
    wx.cloud.callFunction({
      name: "addData",
      data: {
        arr: [that.data.record],
        collectionName: "BorrowBooks"
      },
      //借阅成功之后删除书籍
      success:function() {
        //console.log(wx.getStorageSync('book'));
        that.data.record.detail = [];
        that.setData({
          last:[]
        })
        
      }
    })

  },
  /**
   * 预约座位页面 预约图书馆座位
   */
  toReserve(e) {
    let obj = e.detail;
    obj._openid = this.data._openid;
    //console.log(obj);
    const date = obj.date;
    wx.cloud.callFunction({
      name: "getReserve",
      data: {
        date: date
      }
    }).then(res => {
      console.log("返回", res);
      const len = res.result.data.length;
      if (len == 0) {
        wx.cloud.callFunction({
          name: "addReserve",
          data: {
            record: e.detail
          }
        })
        wx.showToast({
          title: '提交成功！',
        })
      } else {
        wx.showToast({
          title: '当前已预约！',
        })
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
        //console.log(obj);
        this.data.user = obj[0];
        this.data.record.name = this.data.user.name;
        this.data.record.sno = this.data.user.sno;
        this.setData({
          user: this.data.user,
          record: this.data.record
        })
      } else {
        wx.showModal({
          title: '提示',
          content: "当前用户未注册!",
          showCancel: false,
          confirmColor: "#009efd",
          confirmText: "去注册",
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
   * 生命周期函数，在此获取学生的信息 
   */
  onLoad: function (options) {
    this.iniUserInfo();
  },

  /**
   * 生命周期函数
   * 用于接收详情页返回的信息
   * @param {*} options 
   */
  onShow: function (options) {
    //再次显示的时候，防止用户没注册就返回页面，在此处做判断
    if (this.data.user) {
      this.iniUserInfo();
    }
    //把本地缓存的书本信息获取
    const book =  wx.getStorageSync('book');
    const that = this;
    let flag = true;
    if (book) {
      //当book在mStorage中存在的时候，就不加入到mStorage中
      const len = this.data.mStorage.length;
      for (let i = 0; i < len; i++) {
        if (this.data.mStorage[i]._id == book._id) {
          flag = false;
          break;
        }
      }
      //将书本添加到收藏列表之后清除缓存
      if (flag) {
        this.data.mStorage.push(book);
        this.data.mStorage_flag.push(false);
        wx.removeStorage({
          key: "book"
        })
      }
    }
    // 当mStorage中有值的时候，将其传入menu_btn按钮中，提供给用户操作
    if (this.data.mStorage.length) {
      this.setData({
        mStorage: that.data.mStorage,
        mStorage_flag: that.data.mStorage_flag
      })
    }

  }

})