// components/menu_btn/menu_btn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected_book: Array,
    selected_flag: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    //收藏栏是否已经弹出
    isPopping: false,
    //menu列表高度
    listHeight: 0,
    //展示所收藏书籍
    show_flag: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //展示菜单
    _show() {
      if (this.data.isPopping) {
        this._hide();
      } else {
        //展开动画
        this.data.isPopping = true
        this.setData({
          isPopping: true,
          run: "pop",
          listHeight: 1,
          show_flag: true
        })
      }
    },
    _hide() {
        //缩回动画
        this.data.isPopping = false
        this.setData({
          isPopping: false,
          run: "takeback",
          listHeight: 0,
          show_flag: false
        })
    },
    //收藏功能
    _collect(res) {
      console.log("进行收藏操作...");
      const ope = {
        selected_flag: this.properties.selected_flag,
        cb: function () {
          wx.showToast({
            title: '收藏成功！',
          })
          wx.showTabBarRedDot({
            index: 2,
          })
        }
      }
      this.triggerEvent('collectBook',ope, {})
      this._hide();
    },
    //借阅功能
    _subscribe(res) {
      console.log("进行借阅操作...");
      this.triggerEvent('subscribe', this.properties.selected_flag, {})
      this._hide();
    },
    //清除操作
    _clear(res) {
      console.log("进行清除操作...");
      this.triggerEvent('removebook', this.properties.selected_flag, {})
    },
    //书本选中操作
    _select(res) {
      const index = res.currentTarget.dataset.id;
      this.properties.selected_flag[index] = this.properties.selected_flag[index] ? false : true
      this.setData({
        selected_flag: this.properties.selected_flag
      })
    }
  }

})