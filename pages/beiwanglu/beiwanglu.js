// pages/beiwanglu/beiwanglu.js
var util = require('../../utils/util.js');
var text=''
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['考试', '会议', '竞赛', '作业','其他'],
    showdate:'',
    queryResult:'',
    name:'',
    number:'',
    stdnumber:'',
    kind:'',
    openid:'',
    index:0,
    findkind:'考试',
    findResult:''
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
 setjingsai(){
  this.setData({kind:'竞赛'})
  console.log(this.data.kind)
 },
 Input(event){
  text=event.detail.value 
  console.log('接受成功: ', text)
},
upDate(){
  db.collection('beiwang').where({
    _openid: this.data.openid,
    text:text,
    date:this.data.showdate
  }).get({
    success: (res)=> {
      console.log("查询结果",res.data.length)
      if(res.data.length==0){
        db.collection('beiwang').add({
          data: {
            
            text:text,
            date:this.data.showdate,
            kind:this.data.kind
          },
          success: res => {
            
            wx.showToast({
              title: '新增记录成功',
            })
            console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '新增记录失败'
            })
            console.error('[数据库] [新增记录] 失败：', err)
          }
        })
      }
      else{
        console.log('已存在')
        wx.showToast({
          title: '备忘录已存在',
        })
      }
      console.log('[数据库] [查询记录] 成功: ', res)
    },
    fail: err => {
      console.error('[数据库] [查询记录] 失败：', err)
    }
  })
  
},

looktext(){
  db.collection('beiwang').where({
    _openid: this.data.openid,
    kind:this.data.findkind,
  }).get({
    success: (res)=> {
      this.setData({findResult:res.data})
      console.log(res)
    }})
},
bindPickerChange: function (e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    index: e.detail.value,
    findkind:this.data.array[e.detail.value]
  })
  console.log('picker发送选择改变，携带值为', this.data.findkind)
},
getdel:function(e){
  console.log('picker发送选择改变，携带值为', e.target.id)
  console.log('picker发送选择改变，携带值为', this.data.findResult[e.target.id]._id)
  db.collection('beiwang').doc(this.data.findResult[e.target.id]._id).remove({
    success: res => {
      wx.showToast({
        title: '删除成功',
      })
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '删除失败',
      })
      console.error('[数据库] [删除记录] 失败：', err)}
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