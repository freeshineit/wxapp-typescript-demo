/*
 * @Description:
 * @Author: ShineShao <xiaoshaoqq@gmail.com>
 * @Date: 2020-05-19 16:25:08
 */
export interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
}
