import { DEV_BASE_URL, PROD_BASE_URL } from '../config/index'
import { ENV } from '../config/env'

export interface RequestOption {
  url: string
  data?: string | object | ArrayBuffer
  dataType?: 'json' | '其他'
  header?: object
  method?:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT'
  responseType?: 'text' | 'arraybuffer'
}

class Request {
  private baseURL: string
  constructor() {
    this.baseURL = ENV === 'production' ? PROD_BASE_URL : DEV_BASE_URL
  }

  //http 请求类, 当noRefech为true时，不做未授权重试机制
  request(params: RequestOption) {
    let url = this.baseURL + params.url
    let header = {
      'content-type': 'application/json'
      // token
    }
    let method = params.method || 'GET'
    let data = params.data

    if (params.header) {
      header = Object.assign(header, params.header)
      delete params['header']
    }

    return new Promise((resolve, reject) => {
      wx.request({
        ...params,
        url: url,
        data,
        method,
        header,
        success: function(res) {
          //   if (res.statusCode == 401) {
          //     // 未授权
          //   }
          resolve(res)
          //   // 判断以2（2xx)开头的状态码为正确
          //   // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
          //   var code = res.statusCode.toString()
          //   var startChar = code.charAt(0)
          //   if (startChar == '2') {
          //     params.success && params.success(res.data)
          //   } else {
          //     params.error && params.error(res)
          //   }
        },
        fail: function(err) {
          reject(err)
        }
      })
    })
  }
}

export default Request
