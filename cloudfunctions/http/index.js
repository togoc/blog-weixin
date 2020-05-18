// 云函数入口文件
const request = require('request-promise');

const BASEURL = "http://106.13.184.92:3000/blog"
const HANDLE = {
  async GET(url, data, headers) {
    let dataStr = '';
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined)
        dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }

    try {
      return await request(encodeURI(BASEURL + url), {
        json: true,
        headers
      })
    } catch (error) {
      return error
    }
  },
  async POST(url, data, headers) {
    try {
      return await request.post(encodeURI(BASEURL + url), {
        json: true,
        body: data,
        headers
      })
    } catch (error) {
      return error
    }
  }
}

// 云函数入口函数
exports.main = async({
  url,
  method = "GET",
  data = {},
  headers = {}
}, context) => {

  return HANDLE[method] ?
    HANDLE[method](url, data, headers) : result = {
      statusCode: 404,
      msg: '请使用GET或者POST'
    };
}