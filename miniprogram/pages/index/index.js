//index.js
//获取应用实例
const app = getApp()
const { isGetList } = app

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
  createGetListFoo() {
    let blogList = {
      url: "/blog-service/get-index-blog"
    }
    let titleList = {
      url: "/blog-service/get-types/list"
    }
    return isGetList([blogList, titleList], 'INDEX_BLOGS_LIST')
  },
  async getList(refresh) {
    let data = await this.getListFoo(refresh)
    let blogList = data[0]
    let titleList = data[1]
    let List = titleList.map(v => {
      let newArr = blogList.filter(blog => blog.types.includes(v.name))
      return {
        title: v.name,
        list: newArr
      }
    }).filter(v => v.list.length)

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
  onLoad() {
    this.getListFoo = this.createGetListFoo()
    this.getList()
  },
  // 默认最高六秒
  async onPullDownRefresh() {
    await this.getList(true)
    wx.stopPullDownRefresh()
  }
})






