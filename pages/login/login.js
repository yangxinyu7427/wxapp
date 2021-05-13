// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    inputValue1: '',
    inputValue2: '',
    inputValue3: '',
    
  },
  cancel(){
    this.setData({
     inputValue1: '',
     inputValue2: '',
     inputValue3: ''
    })
  },
  mh(){
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      delay: 0
    });
    animation.opacity(0.5).step()
    this.setData({
      ani: animation.export()
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var animation = wx.createAnimation({
      duration: 2100,
      timingFunction: 'linear',
      delay: 0
    });
    animation.opacity(1).step()
    this.setData({
      ani2: animation.export()
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})