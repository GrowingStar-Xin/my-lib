// components/login_data/login_data.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   * 数据:bookName(书名), writer(作者),browse(浏览),tag(标签),time(出版时间),location(书架位置),intro_info(文章简介),writerInfo(作者简介)
   */
  data: {
    book: {
      bookName: "",
      imgSrc:"",
      writer: "",
      browse: "",
      tag: "",
      time: "",
      location: "",
      intro_info: "",
      writerInfo: ""
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取书本名称
    _getBookName: function (res) {
      if (res.detail.value) {
        this.data.book.bookName = res.detail.value;
      }
    },
    //获取作者的名字
    _getBookImg: function (res) {
      if (res.detail.value) {
        this.data.book.imgSrc = res.detail.value;
      }
    },
    //获取作者的名字
    _getWriterName: function (res) {
      if (res.detail.value) {
        this.data.book.writer = res.detail.value;
      }
    },
    //获取预览次数
    _getBrowse: function (res) {
      if (res.detail.value) {
        this.data.book.browse = res.detail.value;
      }
    },
    //获取书本标签
    _getTag: function (res) {
      if (res.detail.value) {
        let str = res.detail.value;
        const arr = str.split(" ");
        this.data.book.tag = arr;
      }

    },
    //获取出版时间
    _getTime: function (res) {
      if (res.detail.value) {
        this.data.book.time = res.detail.value;
      }
    },
    //获取书架地址信息
    _getLocation: function (res) {
      if (res.detail.value) {
        this.data.book.location = res.detail.value;
      }
    },
    //获取书本简介
    _getIntro: function (res) {
      if (res.detail.value) {
        this.data.book.intro_info = res.detail.value;
      }
    },
    _getWriterIntro: function (res) {
      if (res.detail.value) {
        this.data.book.writerInfo = res.detail.value;
      }
    },
    //将书本信息传输给父组件
    sendData: function (res) {
      //console.log(this.data.book)
      this.triggerEvent('addData', this.data.book, {})
    }
  }
})