// miniprogram/pages/blog-show/blog-show.js
const app = getApp()
const wxHttp = app.wxHttp
const baseIMGURL = app.globalData.baseIMGURL
const a = '123'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blog: {},
    baseIMGURL: ""
  },
  async getBlog(data) {
    let blog = await wxHttp({ url: '/blog-service/get-index-blog', data })
    wx.setNavigationBarTitle({
      title: blog.title
    });

    this.setData({
      blog,
      baseIMGURL
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBlog(options)
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