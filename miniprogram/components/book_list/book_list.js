// components/book_list/book_list.js
Component({
  externalClasses:['my-class'],
  options:{
    //引入外部样式
    multipleSlots:true,
    //互不影响isolated  外部可以影响到里头apply-shared
    styleIsolation:"isolated"
  },
  /**
   * 组件的属性列表
   * 属性定义(外部)
   */
  properties: {
    edition:String,
    collectArr:Array,
    del_flag: String  
    // //简化定义
    // myName: String,//现在支持的类型：String、 Number、 Boolean、 Object、 Array、null（任意类型）
    // //标准类型
    // myAge: {
    //   type:Number,
    //   value:"29",//属性初始值
    //   observer:function(newVal, oldVal){
    //     //obserVer属性变动侦测方法
    //     this._peopertyChange(newVal, oldVal)
    //     console.log('newVal:', newVal)
    //     console.log('oldVal',oldVal)
    //   }
    // }
  },

  /**
   * 组件的初始数据
   * 数据创建并赋值（内部）
   */
  data: {
    //设置开始的位置
    startX: 0,
    startY:0,
    //删除按钮的长度
    delBtn_len:160
  },

  /**
   * 组件的方法列表
   * 组件里头不要使用箭头函数 会有this的指向问题
   */
  methods: {
    sendData(e){
      //触发回调
      //传递的数据
      let myEventDetail = {
        id: e.currentTarget.id
      }
      //如果有冒泡的处理方式
      let myEventOption = {
        bubbles:false
      }
      this.triggerEvent('delEvent', myEventDetail, myEventOption)
    },
    _drawstart(e){
      //console.log(e);
      //console.log(e.touches[0].clientX);
      this.data.startX = e.touches[0].clientX;
      this.data.startY = e.touches[0].clientY;
      this.setData({
        startX : this.data.startX,
        startY: this.data.startY
      });
    },
    //按钮拖动事件
    _drawmove(e){
      var index = e.currentTarget.dataset.index;
      var item = this.data.collectArr[index];
      var disX = this.data.startX - e.touches[0].clientX;
      if(disX > 20) {
        if(disX > this.data.delBtn_len) {
          disX = this.data.delBtn_len;
        }
        this.data.collectArr[index].right = 160;
        this.setData({
          collectArr: this.data.collectArr
        })
      } else {
        this.data.collectArr[index].right = 0;
        this.setData({
          collectArr: this.data.collectArr
        })
      }
    },
    _drawend(e){
      // var index = e.currentTarget.dataset.index;
      // var item = this.data.collectArr[index];
      // console.log(item);
      // if (item.right >= this.data.delBtn_len) {
      //   item.right = this.data.delBtn_len;
      //   this.setData({
      //     collectArr: this.data.collectArr
      //   })
      // } else {
      //   item.right = 0;
      //   this.setData({
      //     collectArr: this.data.collectArr
      //   })
      // }
    },
    

    //组件内部私有操作
    // _myPrivateMethod: function () {
    //   //设置、替换
    //   this.replaceDataOnPath(["A", 0, "B"],"newB")
    //   //执行替换
    //   this.applyDataUpdates()
    // },
    //属性变动侦测
    // _peopertyChange: function (newVal, oldVal) {
    //   console.log("newVal",newVal);
    //   console.log("oldVal",oldVal);
    // }

  }
})
