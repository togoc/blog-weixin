//app.js
import config from './config/config'
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: "blog-weixin-7uvul",
        traceUser: true,
      })
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 云函数
  async wxHttp({
    url, data = {}, method = "GET"
  }) {
    let result = await wx.cloud.callFunction({
      name: 'http',
      data: {
        url, data, method
      }
    })
    return result.result
  },
  globalData: {
    userInfo: null,
    ...config
  }
  // async http({ url, data = {}, method = 'GET' }) {
  //   const baseURL = this.globalData.baseURL
  //   const ErrorHandle = {
  //     401: "没有请求权限!",
  //     404: "请求错误:404 (Not Found)",
  //     500: "服务器错误!"
  //   }
  //   // 拼接GET query
  //   if (method === 'GET') {
  //     let dataStr = ''; //数据拼接字符串
  //     Object.keys(data).forEach(key => {
  //       if (data[key] !== undefined)
  //         dataStr += key + '=' + data[key] + '&';
  //     })

  //     if (dataStr !== '') {
  //       dataStr = dataStr.substr(0, dataStr.lastIndexOf('&')); //切掉最后一个&
  //       url = url + '?' + dataStr;
  //     }
  //   }

  //   return new Promise((resolve, reject) => {

  //     var reqTask = wx.request({
  //       url: baseURL + url,
  //       data,
  //       method,
  //       header: { 'content-type': 'application/json' },
  //       dataType: 'json',
  //       responseType: 'text',
  //       success: (result) => {
  //         let { statusCode, data } = result

  //         ErrorHandle[statusCode]
  //           ?
  //           wx.showToast({
  //             title: ErrorHandle[statusCode],
  //             icon: 'none',
  //             duration: 2000
  //           })
  //           :
  //           "";
  //         resolve(data)
  //       },
  //       fail: (e) => {
  //         reject(e)
  //       },
  //       complete: () => { }
  //     });
  //   })
  // },
})