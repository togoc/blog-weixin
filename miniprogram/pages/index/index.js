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
  async getList() {
    let blogList = await wxHttp({
      url: "/blog-service/get-index-blog",
      data: {
        page: 0
      }
    })
    let titleList = await wxHttp({
      url: "/blog-service/get-types/list"
    })
    this.setData({
      list: titleList.map(v => {
        let newArr = blogList.filter(blog => blog.types.includes(v.name))
        return {
          title: v.name,
          list: newArr
        }
      }).filter(v => v.list.length)
    })
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 0
      })
    }
    this.getList()
  }
})