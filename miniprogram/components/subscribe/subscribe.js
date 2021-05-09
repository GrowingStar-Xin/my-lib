// components/subscribe/subscribe.js
Component({

  // lifetimes:{
  //   ready:function () {

  //   }
  // },
  /**
   * 组件的属性列表
   */
  properties: {
    selectedArr:Array,
    user:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    index:0,
    count: 0,
    duration: ['1个月', '2个月','3个月'],
    // createTime: ab.serverDate(服务器时间)
  },
  bindChange(e) {
    //console.log(e);
    this.setData({
      index: e.detail.value
    })
    
  },
  observers:{
    "selectedArr":function(selectedArr){
      this.data.count = this.properties.selectedArr.length;
      console.log("count:",this.data.count,this.data.selectedArr);
      this.setData({
        count: this.data.count
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //提交借阅书籍事件
    _submit:function () {
      if(this.data.selectedArr.length == 0) {
        wx.showToast({
          title: '当前无书要借！',
        })
      } else {
        wx.showToast({
          title: '提交成功！',
        })
        const index = this.data.index;
        const length = this.data.duration[index];
        const obj = {
          selectedArr:this.properties.selectedArr,
          length: length
        }
        this.triggerEvent('borrowSubmit', obj,{})
      }
    },
    //删除事件
    delEvent: function (res) {
      console.log('delEvent', res.detail.id);
      const index = res.detail.id;
      this.properties.selectedArr.splice(res.detail.id, 1);
      this.setData({
        selectedArr:this.properties.selectedArr
      })
    }
  }
})
