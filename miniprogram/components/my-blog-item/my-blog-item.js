// components/my-blog-item/my-blog-item.js
import { blogItem } from '../../behaviors/index'
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [blogItem],
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
