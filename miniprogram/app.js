App({
  onLaunch: function () {
    
    wx.cloud.init({
      env: 'test-a9c8fa'
    })

    this.globalData = {}
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.globalData.openid = res.result.openid
      },
      fail: err => {}
    })
  }
})