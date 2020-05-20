#  遗留问题

- ~~切换用户~~
- ~~清除token~~
- ~~当我的收藏, 我的博客列表为空时, 页面空白且没有提示下拉刷新.~~
- ~~搜索无数据时没有提示.~~
- ~~退出登录没有跳转页面.~~

# 新入门小程序的坑

## 自定义`tabbar`的组件必须写(不然可能会带来不同设备显示不一样的问题)
  ```js
  {
      "component": true
  }
  ```

## 关于`scroll-view`组件的使用
> 谨慎使用, 特别是高度问题, 还有下拉刷新.

## 校验合法域名问题
> 使用`wx.request`必须是备案过的域名, 可通过云函数解决.

# 云函数

- `http `: 代理转发请求服务器内容.

# 主要插件的使用

| 名字          | 作用           |            使用的页面(频繁使用不列出)             |
| ------------- | -------------- | :-----------------------------------------------: |
| `wemark`      | markdown格式化 | [显示指定博客内容](####pages/blog-show/blog-show) |
| `@vant/weapp` | `ui`框架       |                       很多                        |



# 页面

## 页面大纲
| 页面路径(对标`app.json`)          |                         内容                          |
| :-------------------------------- | :---------------------------------------------------: |
| `pages/index/index`               |              [首页](#pages/index/index)               |
| `pages/search/search`             |             [搜索](#pages/search/search)              |
| `pages/home/home`                 |             [ 我的相关](#pages/home/home)             |
| `pages/blog-show/blog-show`       |    [显示指定博客内容](#pages/blog-show/blog-show)     |
| `pages/login/login`               |              [登录](#pages/login/login)               |
| `pages/register/register`         |           [ 注册](#pages/register/register)           |
| `pages/my-blog/my-blog`           |          [我的博客](#pages/my-blog/my-blog)           |
| `pages/my-like-blog/my-like-blog` |   [我收藏的博客](#pages/my-like-blog/my-like-blog)    |
| `pages/my-setting/my-setting`     | [我的信息相关 退出登录](#pages/my-setting/my-setting) |

### 页面详情
#### pages/index/index
`app.json:`
```js
  "navigationBarTitleText": "首页",
  "enablePullDownRefresh": true
```
`query:`
```js
none
```
#### pages/search/search
`app.json:`
```js
  "navigationBarTitleText": "搜索",
  "enablePullDownRefresh": true
```
`query:`
```js
none
```
#### pages/home/home
`app.json:`
```js
  "navigationBarTitleText": "我的"
```
`query:`
```js
none
```
#### pages/blog-show/blog-show
`app.json:`
```js
   "usingComponents": {
        "wemark": "/components/wemark/wemark"
    }
```
`query:`
```js
{
    id:页面id
}
```
#### pages/login/login
`app.json:`
```js
  "navigationBarTitleText": "登录"
```
`query:`
```js
none
```
#### pages/register/register
`app.json:`
```js
  "navigationBarTitleText": "注册"
```
`query:`
```js
none
```
#### pages/my-blog/my-blog
`app.json:`
```js
  "navigationBarTitleText": "我的博客",
  "enablePullDownRefresh": true
```
`query:`
```js
none
```
#### pages/my-like-blog/my-like-blog
`app.json:`
```js
  "navigationBarTitleText": "我的收藏",
  "enablePullDownRefresh": true
```
`query:`
```js
none
```
#### pages/my-setting/my-setting
`app.json:`
```js
  "navigationBarTitleText": "信息"
```
`query:`
```js
{
    id:用户id
}
```




# 其他


## 样式插件(`easy sass` + `css tree`)
具体使用按网上配置就可以.

## `config.js`
> 初衷: 为了方便统一修改配置. 但是似乎小程序没有`state`的管理中心, 在这里通过`App.js`引入通过`globalData`的方式暴露使用.

```js
module.exports = {
    baseURL: "http://106.13.184.92:3000",
    baseIMGURL: "http://106.13.184.92:3000/blog/file-service/img/" //有些图片的显示可能会用到
}
```

## `style/app.scss`
> 项目大部分内容是由`vue`转变来的, 因此不能避免有些样式会直接`copy`, 这会带来一些兼容的问题. 为了很好解决这个问题, 同时为了方便统一管理样式, 在每个页面引入该样式可以解决.
    `tips:`由于文件读取方式的不同, 引入的方式略有区别. 例如`../xx`要写成`..\\xx`

## `utils/util.wxs(关于wxs)`
> 小程序似乎不支持类似于`vue`的`filter`, 但是它支持直接将变量引入`wxml`使用([wxs](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs)).
```html
<!-- 外联 -->
<wxs module="filter" src="/utils/filter.wxs"></wxs>
<!-- 内嵌 -->
<wxs module="m1">
var msg = "hello world";
module.exports.message = msg;
</wxs>
<view> {{m1.message}} </view>
```

## `behaviors`
> 小程序支持类似`mixin`的[behaviors](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html)

内容比较简单看下就懂了, 都是为了方便对博客的常用操作.

## `app.json`
```js
// app.json 主要内容后期可能会有微调
{
    "pages": [
        "pages/index/index",
        "pages/search/search",
        "pages/home/home",
        "pages/blog-show/blog-show",
        "pages/login/login",
        "pages/register/register",
        "pages/my-blog/my-blog",
        "pages/my-like-blog/my-like-blog",
        "pages/my-setting/my-setting"
    ],
    "tabBar": {
        "custom": true,
        "color": "#000000",
        "selectedColor": "#000000",
        "backgroundColor": "#000000",
        "list": [{
                "pagePath": "pages/index/index"
            },
            {
                "pagePath": "pages/search/search"
            },
            {
                "pagePath": "pages/home/home"
            }
        ]
    },
    "usingComponents": {
        "van-button": "@vant/weapp/button/index",
        "van-search": "@vant/weapp/search/index",
        "index-blog-item": "components/index-blog-item/index-blog-item",
        "my-blog-item": "components/my-blog-item/my-blog-item",
        "van-tabbar": "@vant/weapp/tabbar/index",
        "van-tabbar-item": "@vant/weapp/tabbar-item/index",
        "van-icon": "@vant/weapp/icon/index",
        "van-field": "@vant/weapp/field/index",
        "van-notice-bar": "@vant/weapp/notice-bar/index",
        "van-swipe-cell": "@vant/weapp/swipe-cell/index",
        "van-sticky": "@vant/weapp/sticky/index",
        "van-tab": "@vant/weapp/tab/index",
        "van-tabs": "@vant/weapp/tabs/index"
    },
    "window": {
        "backgroundTextStyle": "light",
        "navigationBarBackgroundColor": "#4fc08d",
        "navigationBarTitleText": "WeChat",
        "navigationBarTextStyle": "black",
        "backgroundColor": "#98f2c9"
    },
    "sitemapLocation": "sitemap.json"
}
```