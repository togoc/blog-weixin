// miniprogram/pages/my-setting/my-setting.js
const app = getApp()
const { wxHttp, logout } = app
const { baseURL } = app.globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    currentUser: null
  },
  handleLogout() {
    logout()
    wx.switchTab({
      url: '/pages/home/home'
    });

  },
  async getUser(id) {
    if (id) {
      let user = await wxHttp({
        url: '/user-service/user',
        data: {
          id
        }
      })
      this.setData({
        user: user
      })
    } else {
      // 获取App.js 回调
      if (app.globalData.user) {
        this.setData({
          user: app.globalData.user,
          currentUser: app.globalData.user,
        })
      } else {
        app.getUserCallback = res => {
          this.setData({
            user: res,
            currentUser: res
          })
        }
      }
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUser(options.id)
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