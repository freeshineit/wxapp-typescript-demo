//qywx.ts
Page({
  data: {},
  onLoad: function() {
    // wx.qy.login({
    //   timeout: 1,
    //   success: (res: any) => {
    //     console.log(res);
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: "https://test.com/onLogin",
    //         data: {
    //           code: res.code,
    //         },
    //       });
    //     } else {
    //       console.log("登录失败！" + res.errMsg);
    //     }
    //   },
    //   fail: (err) => {
    //     console.log(err);
    //   },
    //   complete: (res) => {
    //     console.log(res);
    //   },
    // });

    wx.qy.checkSession({
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.log(err)
      },
      complete: res => {
        console.log(res)
      }
    })

    wx.qy.selectEnterpriseContact({
      fromDepartmentId: 0,
      mode: 'single',
      type: ['department'],
      selectedDepartmentIds: ['1231'],
      selectedUserIds: ['123412']
    })
  }
})
