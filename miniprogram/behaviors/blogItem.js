export default Behavior({
    methods: {
        handleView(id) {
            wx.navigateTo({
                url: "/pages/blog-show/blog-show?id=" + id,
            });
        },
        handleDel(id) {
            wx.showToast({
                title: '暂不支持',
                icon: 'none',
            });
        }
    }
})