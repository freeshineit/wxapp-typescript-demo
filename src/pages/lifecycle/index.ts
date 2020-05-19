// https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html

Page({
  data: {
    text: 'This is page data.'
  },
  onLoad: function(options) {
    // Do some initialize when page load.
    console.log('onLoad', options)
  },
  onShow: function() {
    // Do something when page show.
    console.log('onShow')
  },
  onReady: function() {
    // Do something when page ready.
    console.log('onReady')
  },
  onHide: function() {
    // Do something when page hide.
    console.log('onHide')
  },
  onUnload: function() {
    // Do something when page close.
    console.log('onUnload')
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
    console.log('onPullDownRefresh')
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
    console.log('onReachBottom')
  },
  onShareAppMessage: function() {
    // return custom share data when user share.
    console.log('onShareAppMessage')
    return {}
  },
  onPageScroll: function() {
    // Do something when page scroll
    console.log('onPageScroll')
  },
  onResize: function() {
    // Do something when page resize
    console.log('onResize')
  },
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  // Event handler.
  viewTap: function() {
    this.setData(
      {
        text: 'Set some data for updating view.'
      },
      function() {
        // this is setData callback
        console.log('viewTap setData callback')
      }
    )
  },
  customData: {
    hi: 'MINA'
  }
})
