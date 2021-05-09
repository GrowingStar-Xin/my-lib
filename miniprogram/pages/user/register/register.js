// miniprogram/pages/register/register.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    grade:["2016", "2017", "2018"],
    obj:{
      pername:null,
      sex:'m',
      name: null,
      sno: null,
      grade: 2016,
      _openid:null,
      borth:null
    },
    
  },

  //获取性别
  getSex(e){
    this.data.obj.sex = e.detail.value;
  },
  //获取昵称
  getperName(e) {
    if(!e.detail.value) {
      return;
    }
    this.data.obj.pername = e.detail.value;
  },
  //获取学生姓名
  getName(e) {
    if(!e.detail.value) {
      return;
    }
    this.data.obj.name = e.detail.value;
  },
  //获取学生学号
  getSno(e) {
    if(!e.detail.value) {
      return;
    }
    this.data.obj.sno = e.detail.value;
  },
  //获取学生年纪
  changeIndex(e) {
    this.setData({
      index:e.detail.value
    })
    this.data.obj.grade = e.detail.value
  },
  //获取学生的出生
  getBorth(e){
    const reg = /^\d{4}-\d{2}-\d{2}$/;
    const res = reg.test(e.detail.value);
    if(!e.detail.value) {
      return;
    } else if (!res) {
      wx.showToast({
        title: '出生格式不对',
        icon:"error",
      })
      return;
    }
    this.data.obj.borth = e.detail.value;
  },
  // 注册
  async submit(){
    await this.getOpenId();
    this.data.obj._openid = this.data._openid
    for ( const prop in this.data.obj) {
      console.log(this.data.obj[prop]);
      if(!this.data.obj[prop]) {
        wx.showToast({
          icon:"error",
          title: '信息不全或有误！',
        })
        return
      }
    }
    // 调用云函数查看是否存在该用户的信息，没有的话就进行注册，有的话就不再进行注册操作
    wx.cloud.callFunction({
      name:"getUser",
      data:{
        _openid:this.data._openid
      }
    }).then(res=>{
      //调用添加的云函数
      const that = this;
      if (res.result.data.length == 0) {
        wx.cloud.callFunction({
          name:"addUser",
          data:{
            obj: that.data.obj
          }
        })
        wx.showToast({
          title: '注册成功！',
        })
        wx.navigateBack({})
      } else {
        wx.showToast({
          title: '该用户已注册！',
        })

      }
    }).catch(console.error)
  },
  //在本page的其他函数里获得openid。
  async getOpenId(){
    this.data._openid = await getApp().getOpenid();
  },

  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
  //   // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.log(res.userInfo);
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
  }
})