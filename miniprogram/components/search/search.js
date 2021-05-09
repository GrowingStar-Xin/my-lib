// components/search/search.js
const app = getApp()
const debounce = app.require('utils/debounce.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //父组件传入的结果数组
    searchRes: Array
  },
  /**
   * 组件的初始数据
   */
  data: {
    //输入的想要查询的内容
    target: "",
    //父组件传入的结果数组的长度
    res_num: 0,
    //搜索结果框是否展示
    show_flag: "none",
    //用于承接父组件传过来的searchRes
    res: 0,
    //在输入框输入的值
    target: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //内部函数, 获取所要查询的内容
    _getTarget(res) {
      //判断输入框的值是否为空，当为空的时候赋值为none
      res.detail.value = res.detail.value ? res.detail.value : "none"
      //由于父组件调用该控件的时候就把值传入了直接触发了该数据监听事件，所以可以通过这个判断是否展开搜索结果页，当搜索框中有数据输入的时候就展开收索结果框
      this.data.show_flag = "block"
      debounce(() => {
        if (res.detail.value != "none") {
          this.data.target = res.detail.value; 
          this.triggerEvent('getResult', res.detail.value, {})
        }
      }, 300)
    },
    //内部函数，当鼠标不再聚焦的时候就不再显示搜索框的内容，搜索框进行初始化操作
    _stopSearch() {
      // this.data.show_flag = "none"
      //相应式传值
      this.setData({
        show_flag: "none"
      })

    },
    //传值操作
    _go(res) {
      //获取书籍内容
      const index = res.currentTarget.dataset.id;
      const book = this.properties.searchRes[index]
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
  //数据监听器，当有数据发生变化的时候 触发函数
  observers: {
    "searchRes": function (searchRes) {
      this.data.res_num = searchRes.length;
      if (this.data.show_flag) {
        this.setData({
          res_num: this.data.res_num,
          show_flag: this.data.show_flag
        })
      }
    }
  }
})