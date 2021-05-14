// pages/gamePage/gamePage.js

let gameName = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gamename:"",
    gamesList:"",
    gameSignNum:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      gamename:options.gamename
    })
    let that = this
    console.log("gameName",that.data.gamename)

    //获得竞赛的具体数据
    wx.cloud.database().collection('gamesMes').where({
      name : that.data.gamename
    })
    .get()
    .then(res => {
      console.log("获取成功", res)
      that.setData({
        gamesList: res.data[0],
      })
      console.log("gamesList是",that.data.gamesList)
    })
    .catch(res => {
      console.log("获取失败", res)
    })


    //获得报名的队伍数量
    wx.cloud.database().collection('team').where({
      gamesName : that.data.gamename
    })
    .get()
    .then(res => {
      console.log("获取队伍成功", res)
      console.log("获取队伍数量",res.data.length)
     that.setData({gameSignNum:res.data.length,})
      console.log("队伍数量为",that.data.gameSignNum)
    })
    .catch(res => {
      console.log("获取失败", res)
    })

    
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