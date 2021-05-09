// pages/recommend/recommend.js
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //记录机型的高度
    mheight: 0,
    // 推荐的书籍
    books_list: [],
    //筛选后的书籍列表
    filter_list: [],
    //顶部的菜单列表
    top_menu_list: ['全部', '心理', '历史', '传记', '小说', '励志', '成长', '商业'],
    //所点击的需要收藏的书籍的数量
    books_num: 0,
    //推荐的列表的书籍的长度
    len: 0,
    //收藏书籍的标记数组，用于判断是否取消书籍的选中
    collected_flag: null,
    //用户所收藏的书籍的列表
    collectArr: [],
    //是否展示所选内容区的判定flag
    show_content_flag: false,

  },
  /**
   * 书籍的筛选事件
   */
  filter: function (res) {
    const index = res.currentTarget.dataset.id;
    const codition = this.data.top_menu_list[index]
    //根据所点击的标签内容过滤书本
    //当标签内容为"全部"的是否直接赋值
    if (codition === "全部") {
      this.data.filter_list = this.data.books_list
    } else {
      this.data.filter_list = this.data.books_list.filter(v => {
        return v.tag.includes(codition)
      })
    }
    this.setData({
      filter_list: this.data.filter_list
    })

  },
  // 推荐列表的点击事件
  collected(e) {
    //flag用来判断收藏书架中是否存在需要收藏的书籍，如果存在，怎不进行添加操作，如果不存在，则进行添加操作
    //let flag = false;
    const CurrentId = e.currentTarget.id;
    //console.log(CurrentId);
    this.data.filter_list.forEach((v, i) => {
      if (v._id == CurrentId) {
        v.collected_flag = !v.collected_flag;
      }
    })
    this.data.collectArr = this.data.books_list.filter(v => {
      return v.collected_flag
    })
    //获取当前收藏夹数组的数量
    this.data.books_num = this.data.collectArr.length;
    this.setData({
      collectArr: this.data.collectArr,
      filter_list: this.data.filter_list,
      books_num:this.data.books_num
    })
    // this.data.collectArr.forEach((v, i)=>{
    //   if (v._id ==  this.data.filter_list[CurrentId]._id) {
    //     flag =true
    //     console.log(flag);
    //   }
    // })
    // if (!flag) {
    // }
    //需要修改
    // this.data.collected_flag[CurrentId] = !this.data.collected_flag[CurrentId];
    // //通过collected_flag[index]来判断用户对该书籍是否是选中的状态
    // if (this.data.collected_flag[CurrentId]) {

    //   // 深度克隆推荐书籍的对象,防止A数组中的对象的改变会影响到B数组的内容的改变
    //   let obj = JSON.stringify(this.data.filter_list[CurrentId]);
    //   obj = JSON.parse(obj);
    //   //往obj对象中加入right属性, 方便 收藏夹的左滑删除按钮的移动
    //   obj.right = 0;
    //   this.data.collectArr.push(obj);
    //   console.log(this.data.collectArr);
    // } else {
    //   //当用户点击了2次之后，就会变成未相应的状态，那么就删除收藏列表中的对相应的书籍信息
    //   const arr = this.data.collectArr;
    //   const that = this;
    //   arr.forEach(function (item, index) {
    //     //遍历数组，把用户不再收藏的书籍进行删除操作
    //     if (item.id == that.data.filter_list[CurrentId].id) {
    //       arr.splice(index, 1);
    //     }
    //   })
    // }
  },
  //点击所选书籍列表的触发事件
  //通过show_content_flag判定是否展开所选书籍列表
  show_selectedContent(e) {
    //当收藏夹中有图书的时候 才准许内容页的打开操作
    if (this.data.books_num) {
      this.setData({
        show_content_flag: !this.data.show_content_flag
      })
    }
  },

  // 删除在收藏夹里头的书籍的功能
  del_item(e) {
    const delId = e.detail.id
    this.data.books_list.forEach((v, i)=>{
      if (v._id == delId) {
        v.collected_flag = false
      }
    })
    this.data.collectArr = this.data.books_list.filter(v=>{
      return v.collected_flag
    })
    this.data.books_num = this.data.collectArr.length;
    //当书本的数量为0的时候 不再展示书本列表
    if (this.data.books_num == 0) {
      //console.log(this.data.show_content_flag);
      this.data.show_content_flag = false;
    }
    this.setData({
      collectArr: this.data.collectArr,
      filter_list: this.data.filter_list,
      books_num: this.data.books_num,
      show_content_flag: this.data.show_content_flag
    })

    // //根据组件传入的参数删除 存在在e.detail
    // const that = this;
    // this.data.collectArr.forEach(function (item, index) {
    //   //当component传入的数据与collectArr数据相同时进行删除操作
    //   if (item._id == e.detail.id) {
    //     that.data.collectArr.splice(index, 1);
    //     //console.log(that.data.collectArr.length);
    //     that.data.books_num = that.data.collectArr.length;
    //   }
    // })

    // //this.data.collected_flag[e.detail.id] = false;
    // this.data.filter_list.forEach((v, i) => {
    //   if (v._id == e.detail.id) {
    //     this.data.collected_flag[i] = false;
    //   }
    // })
    // 当书本的数量为0的时候 不再展示书本列表
    // if (this.data.books_num == 0) {
    //   //console.log(this.data.show_content_flag);
    //   this.data.show_content_flag = false;
    // }
    // //响应式赋值
    // this.setData({
    //   collected_flag: this.data.collected_flag,
    //   collectArr: this.data.collectArr,
    //   books_num: this.data.books_num,
    //   show_content_flag: this.data.show_content_flag
    // })
  },
  // 清除按钮的监听事件
  clearArr(e) {
    this.data.filter_list.forEach((v, i) => {
      v.collected_flag = false
    })
    
    this.data.collectArr = [];
    this.data.books_num = 0;
    this.data.show_content_flag = false;
    this.setData({
      filter_list:this.data.filter_list,
      collectArr: this.data.collectArr,
      show_content_flag: this.data.show_content_flag,
      books_num: this.data.books_num
    })
    // //对现有的数据进行初始化的操作
    // this.data.collectArr = [];
    // this.data.collected_flag.fill(false);
    // this.data.books_num = 0;
    // this.data.show_content_flag = false;
    // //响应式赋值
    // this.setData({
    //   collectArr: this.data.collectArr,
    //   collected_flag: this.data.collected_flag,
    //   books_num: this.data.books_num,
    //   show_content_flag: this.data.show_content_flag
    // })
  },
  //当用户点击收集按钮 
  async addCollectArr() {
    const CollectBook = db.collection('CollectBook');
    const len = this.data.collectArr.length;
    //查看数据库中是否有与选中的书籍，如果有，就不进行添加操作，如果没有，就将书籍添加到收藏的数据库中
    for (let i = 0; i < len; i++) {
      let obj = this.data.collectArr[i];
      //去掉_openid 不然添加不了数据库
      delete obj._openid;
      console.log(obj);
      await CollectBook.where({
        _id: obj._id
      }).get().then(res => {
        //查询的结果为空的时候
        if (res.data.length == 0) {
          CollectBook.add({
            data: obj,
            success(res) {
              console.log('success:', res);
            },
            fail(res) {
              console.log('fail:', res);
            }
          })
        }
      })
    }
    //收藏成功之后进行一次初始化操作
    this.clearArr();

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从数据库获取书籍列表
    wx.cloud.callFunction({
      name: "getBooks"
    }).then(res => {
      // 初始化页面的数据
      // console.log('res', res.result.data);
      this.data.filter_list = this.data.books_list = res.result.data
      //对获取的书籍列表的每一本书都添加一个标签，方便后面的收藏操作
      this.data.books_list.forEach((v, i) => {
        v.collected_flag = false;
      })
      // const len = this.data.filter_list.length;
      // this.data.collected_flag = new Array(len);
      // this.data.collected_flag.fill(false);
      this.setData({
        filter_list: this.data.filter_list
        //collected_flag: this.data.collected_flag
      })
    })






















    //计算出机型的高度
    const that = this;
    wx.getSystemInfo({
      success: (result) => {
        let clientHeight = result.windowHeight;
        let clientWidth = result.windowWidth;
        let ratio = 750 / clientWidth;
        let rpxHeight = clientHeight * ratio;
        // console.log(rpxHeight);
        that.setData({
          mheight: rpxHeight
        })
      },
    })
  },

})