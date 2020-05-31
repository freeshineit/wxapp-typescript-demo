//qywx.ts
Page({
  data: {},
  onLaunch: function() {
    wx.qy.login({
      success: function() {}
    })
    wx.qy.selectEnterpriseContact({
      fromDepartmentId: 0,
      mode: 'single',
      type: ['department'],
      selectedDepartmentIds: ['1231'],
      selectedUserIds: ['123412']
    })
    wx.login()
  }
})
