// components/reserve/reserve.js
Component({
  lifetimes:{
    attached:function () {
      const currentDay = new Date().toLocaleDateString();
      // 24 * 60 * 60 * 1000 通过时间戳算出下一天的日期
      const date = Date.now() + 86400000;
      const nextDay = new Date(date).toLocaleDateString();
      this.data.date.push(currentDay);
      this.data.date.push(nextDay);
      this.data.reserveInfo.date = currentDay;
      this.data.reserveInfo.time = '上午';
      this.setData({
        date: this.data.date,
        index:this.data.index
      })
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    user:Object
  },
  /**
   * 组件的初始数据
   */
  data: {
    date: [],
    reserveInfo:{
      date:null,
      time:null,
      name:null,
      sno:null

    },
    index:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取入馆时辰
    _getInTime(e){
      this.data.reserveInfo.time = e.detail.value
    },
    //获取日期
    _getDate(e) {
      this.setData({
        index:e.detail.value
      })
      this.data.reserveInfo.date = this.data.date[e.detail.value];
      console.log(this.data.reserveInfo);
    },
    //触发父组件函数
    _submit(e) {
      this.data.reserveInfo.name = this.properties.user.name;
      this.data.reserveInfo.sno = this.properties.user.sno;
      this.triggerEvent('toReserve',this.data.reserveInfo,{})
    }
  }
})
