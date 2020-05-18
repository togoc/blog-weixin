// pages/home/home.js
const app = getApp()
const { wxHttp } = app
const baseURL = app.globalData.baseURL
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseURL: "http://106.13.184.92:3000",
    userInfo: null,
    userHot: [
      {
        title: "动态",
        count: 10,
        link: "/pages/my-blog/my-blog"
      },
      {
        title: "关注",
        count: 3,
        link: "/my-like-user"
      },
      {
        title: "粉丝",
        count: 0,
        link: "/my-fans"
      }
    ],
    myLink: [
      {
        title: "我的关注",
        icon: "like",
        link: "/my-focus"
      },
      {
        title: "我的收藏",
        icon: "star",
        link: "/pages/my-like-blog/my-like-blog"
      },
      {
        title: "我的博客",
        icon: "todo-list",
        link: "/pages/my-blog/my-blog"
      },
      {
        title: "我的关注",
        icon: "like-o",
        link: "/my-focus"
      },
      {
        title: "我的关注",
        icon: "like-o",
        link: "/my-focus"
      },
      {
        title: "我的关注",
        icon: "like-o",
        link: "/my-focus"
      },
      {
        title: "我的关注",
        icon: "like-o",
        link: "/my-focus"
      },
      {
        title: "更多",
        icon: "weapp-nav",
        link: "/my-focus"
      }
    ],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          user: app.globalData.user
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            baseURL
          })
        }
      })
    }

    // 获取App.js 回调
    if (app.globalData.user) {
      this.setData({
        user: app.globalData.user,
      })
    } else {
      app.getUserCallback = res => {
        this.setData({
          user: res
        })
      }
    }
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 2
      })
    }
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