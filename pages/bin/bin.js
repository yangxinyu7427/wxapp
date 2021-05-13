// miniprogram/pages/bin/bin.js
let name=''
let number=''
let stdnumber=''
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  nameInput(event){
    name=event.detail.value 
    console.log('接受成功: ', name)
  },
  numberInput(event){
    number=event.detail.value 
    console.log('接受成功: ', number)
  },
  stdnumberInput(event){
    stdnumber=event.detail.value 
    console.log('接受成功: ', stdnumber)
  },
  bind(){
    db.collection('bin').add({
      data: {
        name: name,
        number:number,
        stdnumber:stdnumber
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        wx.navigateTo({
          url: '../sport/sport',
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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