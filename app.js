// app.js
App({
  onLaunch() {

    wx.cloud.init({
      env:'cpl-0gc3ce3m31f7c11f'
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    wx.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight;
        // console.log(this.globalData.navHeight);
      }, fail(err) {
        console.log(err);
      }
    })
  },
  globalData: {
    userInfo: null,
    navHeight: 0,
    meta: {}
  }
})
