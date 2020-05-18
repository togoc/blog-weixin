// pages/home/home.js
const app = getApp()
const { wxHttp, isGetList } = app
const baseURL = app.globalData.baseURL
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [
      {
        img_url: "/public/images/h5/swiper/vue1.jpg",
        path: "https://cn.vuejs.org/",
        tips: "vue2.x",
        _id: "5ea6bfda1163ba444081483d",
      },
      {
        img_url: "/public/images/h5/swiper/vue.jpg",
        path: "https://vuex.vuejs.org/zh/",
        tips: "vuex",
        _id: "5ea6bfda1163ba444081483c",
      },
      {
        img_url: "/public/images/h5/swiper/vant.jpg",
        path: "https://youzan.github.io/vant/#/zh-CN/home",
        tips: "vant",
        _id: "5ea6bfda1163ba444081483e",
      }
    ],
    active: 0,
    tabList: [
      {
        title: "最热",
        key: 'hot',
        list: []
      },
      {
        title: "最新",
        key: 'new',
        list: []
      }
    ],
    baseURL: baseURL,
    searchList: null
  },
  async handleSearch({ detail: keyword }) {
    keyword = encodeURIComponent(keyword.trim())
    let url = "/blog-service/search"
    let data = await wxHttp({ url, data: { keyword } }) || null
    this.setData({
      searchList: data
    })
  },
  // 点击tab切换
  onChange(event) {
    this.setData({
      active: event.detail.name
    })
    wx.pageScrollTo({ selector: "#sw" })
  },
  // 滚动scroll-view
  onScroll() {
    if (this.isScroll) return
    this.isScroll = true
    wx.pageScrollTo({ selector: "#sw" })

    let timeOut = setTimeout(() => {
      this.isScroll = false
      clearTimeout(timeOut)
    }, 2500);
  },
  createGetListFoo() {
    let hotList = {
      url: "/blog-service/get-index-blog",
      data: {
        key: 'hot'
      }
    }
    let newList = {
      url: "/blog-service/get-index-blog",
      data: {
        key: 'new'
      }
    }
    return isGetList([hotList, newList], 'SEARCH_DEFAULT_BLOGS_LIST')
  },
  // 点击轮播图
  handleClickSwiper() {
    wx.showToast({
      title: '敬请期待!',
      icon: 'none',
    });
  },
  // 获取默认列表
  async getList(refresh) {
    let data = await this.getListFoo(refresh)
    let hotList = data[0]
    let newList = data[1]

    let List = this.data.tabList.map(v => v.key === 'hot' ? { ...v, list: hotList } : { ...v, list: newList })
    this.setData({
      tabList: List,
      searchList: null
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getListFoo = this.createGetListFoo()
    this.getList()
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
        active: 1
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
  async onPullDownRefresh() {
    await this.getList(true)
    wx.stopPullDownRefresh()
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