import { BASEHONST, APIKEY } from '../config/index'

const methods = ['get', 'post', 'put', 'delete']

let Request: any = {}

methods.forEach(item => {
  Request[item] = (
    url: string,
    data?: string | object | ArrayBuffer,
    options?: wx.RequestOption
  ) => {
    /* eslint-disable */
    return new Promise((resolve, reject) => {
      const _url = /^http[s]?:\/\/|^\/\//.test(url) ? url : `${BASEHONST}${url}`

      let _options = {}

      if (options) {
        _options = Object.assign(_options, options)
      }

      data = Object.assign(
        {
          apikey: APIKEY
        },
        data
      )

      const requestOptions = Object.assign(
        {
          url: _url,
          method: item || 'GET',
          data,
          success(res: wx.RequestSuccessCallbackResult) {
            // if (res.data.code == 401) {
            //   let currentPage = pages[pages.length - 1] // 获取当前页面的对象
            //   if (currentPage.route !== 'pages/login/index') {
            //     // 未登陆
            //     wx.navigateTo({
            //       url: '../login/index'
            //     })
            //   }
            // }
            resolve(res)
          },
          fail(e: wx.GeneralCallbackResult) {
            reject(e)
          }
        },
        _options
      ) as wx.RequestOption
      wx.request(requestOptions)
    })
  }
})

export default Request
