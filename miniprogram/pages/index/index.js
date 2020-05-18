//index.js
//获取应用实例
const app = getApp()
const wxHttp = app.wxHttp

Page({
  data: {
    active: 0,
    list: []
  },
  //事件处理函数
  handleSearch() {
    wx.switchTab({
      url: '/pages/search/search'
    });
  },
  onChange(event) {
    this.setData({
      active: event.detail.name
    })
  },
  handleView() {
    wx.switchTab({
      url: '/page/search/search'
    })
  },
  async getList(refresh) {
    let List = null
    if (refresh) {
      let blogList = await wxHttp({
        url: "/blog-service/get-index-blog",
        data: {
          page: 0
        }
      })
      let titleList = await wxHttp({
        url: "/blog-service/get-types/list"
      })

      List = titleList.map(v => {
        let newArr = blogList.filter(blog => blog.types.includes(v.name))
        return {
          title: v.name,
          list: newArr
        }
      }).filter(v => v.list.length)

      wx.setStorageSync("INDEX_BLOGS_LIST", JSON.stringify(List));
    } else {
      let list = wx.getStorageSync('INDEX_BLOGS_LIST')
      list ? List = JSON.parse(list) : this.getList(true)
    }

    this.setData({
      list: List
    })
  },
  onShow() {
    // 自定义tabbar
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 0
      })
    }
    this.getList()
  },
  // 默认最高六秒
  async onPullDownRefresh() {
    await this.getList(true)
    wx.stopPullDownRefresh()
  }
})