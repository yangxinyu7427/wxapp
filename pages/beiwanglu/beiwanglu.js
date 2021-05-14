// pages/beiwanglu/beiwanglu.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showdate:'',
    queryResult:'',
    name:'',
    number:'',
    stdnumber:'',
    kind:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      showdate: time.slice(0,10).replace(/\//g,"-")
    });
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        getApp().globalData.openid = res.result.openid
        this.data.openid=res.result.openid
        wx.cloud.database().collection('bin').where({
          _openid: res.result.openid
        }).get({
          success: (res)=> {
            if(res.data.length == 0){
              wx.navigateTo({
                url: '../bin/bin',
              })
            }else{
            this.setData({
              queryResult: res.data,
              name:res.data[0].name,
              number:res.data[0].number,
              stdnumber:res.data[0].stdnumber
            })
            console.log('[数据库] [查询记录] 成功: ', this.data.name)
          }
            
          },
          fail: err => {
            wx.showToast({
              icon: 'none' ,
              title: '查询记录失败'  
            })
    
            console.error('[数据库] [查询记录] 失败：', err)
          }
        })
  },
})
 },
 setkaoshi(){
  this.setData({kind:'考试'})
  console.log(this.data.kind)
 },
 sethuiyi(){
  this.setData({kind:'会议'})
  console.log(this.data.kind)
 },
 setqita(){
  this.setData({kind:'其他'})
  console.log(this.data.kind)
 },
 setzuoye(){
  this.setData({kind:'作业'})
  console.log(this.data.kind)
 },
 setcaiwu(){
  this.setData({kind:'财务'})
  console.log(this.data.kind)
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