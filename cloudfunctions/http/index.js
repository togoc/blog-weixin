// 云函数入口文件
const request = require('request-promise');

const BASEURL = "http://106.13.184.92:3000/blog"
const HANDLE = {
  async GET(url, data) {
    let dataStr = '';
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined)
        dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }

    return await request(BASEURL + url, {
      json: true
    })
  },
  async POST(url, data) {
    return await request.post(BASEURL + url, {
      json: true,
      body: data
    })
  }
}

// 云函数入口函数
exports.main = async ({
  url,
  method = "GET",
  data = {}
}, context) => {

  return HANDLE[method] ?
    HANDLE[method](url, data) : result = {
      statusCode: 404,
      msg: '请使用GET或者POST'
    };
}