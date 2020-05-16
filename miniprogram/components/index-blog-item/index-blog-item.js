// components/index-blog-item.js
import { url, blogItem } from '../../behaviors/index'
Component({
  behaviors: [url, blogItem],
  /**
   * 组件的属性列表
   */
  properties: {
    blog: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleViewPre(e) {
      this.handleView(e.currentTarget.dataset.blogid)
    }
  }
})