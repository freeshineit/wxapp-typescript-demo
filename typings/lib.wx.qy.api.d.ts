/**
 * @desc 企业微信小程序 api
 * @date 2020/06/01  六一儿童节快乐
 * @author ShineShao <xiaoshaoqq@gmail.com>
 */
declare namespace WechatMiniprogram {
  interface Wx {
    qy: {
      /**
       * @desc 获取企业微信派发的临时登录凭证
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92388
       */
      login(obj?: {
        timeout?: Number
        success?: (res?: { errMsg: string; code: string }) => void
        fail?: (res?: { errMsg: string; code: string }) => void
        complete?: (res?: { errMsg: string; code: string }) => void
      }): void

      /**
       * @desc 校验用户当前 session_key 是否有效
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92390
       * @param obj
       */
      checkSession(obj?: {
        success?: (res?: { errMsg: string; expireIn: number }) => void
        fail?: (res?: { errMsg: string; expireIn: number }) => void
        complete?: (res?: { errMsg: string; expireIn: number }) => void
      }): void
      /**
       * @desc 判断企业微信专有接口、回调、参数等是否在当前版本可用。注意wx.canIUse判断的是微信小程序通用接口（即wx.[接口名]）是否在当前版本可用。
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92394
       * @param schema string
       */
      canIUse(
        /** 使用 `使用 ${API}.${method}.${param}.${options} 或者 ${component}.${attribute}.${option} 方式来调用 */
        schema: string
      ): boolean

      /**
       * @desc 获取企业成员基本信息
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92396
       */
      getEnterpriseUserInfo(obj?: {
        timeout?: Number
        success?: (res?: {
          userInfo: {
            name: string
            gender: number /**企业成员的性别，0表示未定义，1表示男性，2表示女性 */
            language: string
          }
          rawData: string
          signature: string
          encryptedData: string
          iv: string
        }) => void
        // 下面两个属性没有实践
        fail?: (res?: any) => void
        complete?: (res?: any) => void
      }): void

      /**
       * @desc 获取企业成员头像
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92397
       */
      getAvatar(obj?: {
        timeout?: Number
        success?: (res?: { avatar: string }) => void
        // 下面两个属性没有实践
        fail?: (res?: any) => void
        complete?: (res?: any) => void
      }): void

      /**
       * @desc 获取企业成员个人二维码
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92398
       */
      getQrCode(obj?: {
        timeout?: Number
        success?: (res?: { qrCode: string }) => void
        // 下面两个属性没有实践
        fail?: (res?: any) => void
        complete?: (res?: any) => void
      }): void

      /**
       * @desc 打开通讯录选人功能
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92403
       */
      selectEnterpriseContact(obj: {
        fromDepartmentId: -1 | 0
        mode: 'single' | 'multi'
        type: string[] // 选择限制类型，指定”department”、”user”中的一个或者多个
        selectedDepartmentIds?: string[]
        selectedUserIds?: string[]
        success?: (res?: {
          result: {
            departmentList?: {
              id?: string
              name?: string
              [key: string]: any
            }[]
            userList?: {
              id?: string
              name?: string
              avatar?: string
              [key: string]: any
            }[]
          }
        }) => void
        // 下面两个属性没有实践
        fail?: (res?: any) => void
        complete?: (res?: any) => void
      }): void

      /**
       * @desc 外部联系人选人接口
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92402
       */
      selectExternalContact(obj?: {
        filterType?: 0 | 1
        success?: (res?: { userIds?: string[] }) => void
        // 下面两个属性没有实践
        fail?: (res?: any) => void
        complete?: (res?: any) => void
      }): void

      /**
       * @desc 打开个人信息页
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92404
       */
      openUserProfile(obj?: {
        type?: 1 | 2
        userid?: string
        // 下面三个属性没有实践
        success?: (res?: any) => void
        fail?: (res?: any) => void
        complete?: (res?: any) => void
      }): void

      /**
       * @desc 创建会话接口
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92405
       */
      openUserProfile(obj: {
        groupName: string
        userIds?: string
        externalUserIds?: string
        // 下面三个属性没有实践
        success?: (res?: any) => void
        fail?: (res?: any) => void
        complete?: (res?: any) => void
      }): void

      /**
       * @desc 获取当前外部联系人userid
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92406
       */
      getCurExternalContact(obj?: {
        success?: (res?: { userId?: string }) => void
        // 下面两个属性没有实践
        fail?: (res?: any) => void
        complete?: (res?: any) => void
      }): void

      /**
       * @desc 此接口支持企业成员把小程序，传递到群发助手进行发送。为了防止滥用，同一个成员每日向一个客户最多可群发一条消息，每次群发最多可选200个客户。
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92407
       */
      getCurExternalContact(obj: {
        appid: string
        title: string
        imgUrl: string
        page: string
        // 下面三个属性没有实践
        success?: (res?: any) => void
        fail?: (res?: any) => void
        complete?: (res?: any) => void
      }): void

      /**
       * @desc 获取当前客户群的群ID
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92684
       */
      getCurExternalChat(obj?: {
        success?: (res?: { chatId?: string }) => void
        // 下面两个属性没有实践
        fail?: (res?: any) => void
        complete?: (res?: any) => void
      }): void

      /**
       * @desc 通过聊天工具栏向当前会话发送消息，支持多种消息格式，包括文本(“text”)，图片(“image”)，视频(“video”)，文件(“file”)、H5(“news”）和小程序(“miniprogram”)。
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92685
       */
      sendChatMessage(obj: {
        msgtype: string
        text?: {
          content?: string
        }
        image?: {
          mediaid: string
        }
        video?: {
          mediaid: string
        }
        file?: {
          mediaid?: string
        }
        news?: {
          link?: string
          title?: string
          desc?: string
          imgUrl?: string
        }
        miniprogram?: {
          appid: string
          title: string
          imgUrl: string
          page: string
        }
        // 下面三个属性没有实践
        success?: (res?: any) => void
        fail?: (res?: any) => void
        complete?: (res?: any) => void
      }): void

      /**
       * @desc 此接口支持企业成员把小程序，传递到群发助手进行发送。为了防止滥用，同一个成员每日向一个客户群最多可群发一条消息，每次群发最多可选200个最近活跃的客户群。
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92686
       */
      shareToExternalChat(obj: {
        appid: string
        title: string
        imgUrl: string
        page: string
        // 下面三个属性没有实践
        success?: (res?: any) => void
        fail?: (res?: any) => void
        complete?: (res?: any) => void
      }): void

      /**
       * @desc 判断当设备是否支持 NFC 能力
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92409
       */
      getNFCReaderState(obj?: {
        // 下面三个属性没有实践
        success?: (res?: any) => void
        fail?: (res?: any) => void
        complete?: (res?: any) => void
      }): void

      /**
       * @desc 打开 NFC 模块，仅支持安卓系统
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92410
       */
      startNFCReader(obj?: {
        // 下面三个属性没有实践
        success?: (res?: any) => void
        fail?: (res?: any) => void
        complete?: (res?: any) => void
      }): void

      /**
       * @desc 关闭 NFC 模块，仅支持安卓系统
       * @link https://work.weixin.qq.com/api/doc/90001/90144/92411
       */
      stopNFCReader(obj?: {
        // 下面三个属性没有实践
        success?: (res?: any) => void
        fail?: (res?: any) => void
        complete?: (res?: any) => void
      }): void
    }
  }
}
