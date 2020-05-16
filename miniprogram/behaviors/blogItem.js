export default Behavior({
    methods: {
        handleView(id) {
            wx.navigateTo({
                url: "/pages/blog-show/blog-show?id=" + id,
            });
        }
    }
})