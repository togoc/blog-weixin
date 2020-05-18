// miniprogram/pages/my-blog/my-blog.js
const app = getApp()
const { isGetList } = app
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {

    },
    blogs: []
  },

  async getMyBlog(refresh) {
    let blogs = await this.getList(refresh)
    this.setData({ blogs })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList = isGetList({ url: "/blog-service/get-my-blog" }, 'MY_BLOG');
    this.getMyBlog();
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    await this.getMyBlog(true);
    wx.stopPullDownRefresh()
  },

})