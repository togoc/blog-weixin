// miniprogram/pages/login/login.js
let app = getApp();
const { wxHttp, getUser } = app

Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: "togoc@xx.com",
    password: "123456",
  },
  async  summit() {
    let { email, password } = this.data
    let data = await wxHttp({
      method: "POST",
      url: "/user-service/login", data: {
        email, password
      }
    }) || {};
    let { token, user } = data

    if (token && user) {
      wx.setStorageSync('BLOG_TOKEN', token);
      app.globalData.user = user
      getUser()
      wx.switchTab({
        url: '/pages/home/home'
      });
    }
  },
  onChangePsw(event) {
    this.setData({
      password: event.detail
    })
  },
  onChangeName(event) {
    this.setData({
      email: event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})