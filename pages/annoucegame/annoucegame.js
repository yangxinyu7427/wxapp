// pages/annoucegame/annoucegame.js

//定义全局变量
let webUrl = ""
let name = ""
let pictureUrl = ""
let signTime = ""

Page({

  /**
   * 添加赛事名称、截止时间、官网地址
   * @param {*} even 
   */
  addGameName(even){
    console.log("添加赛事名称"+even.detail.value)
    name = even.detail.value
  },

  addGameSignTime(even){
    console.log("添加赛事报名截止时间"+even.detail.value)
    signTime = even.detail.value
  },

  addGameWebUrl(even){
    console.log("添加赛事官网地址"+even.detail.value)
    webUrl = even.detail.value
  },

  /**
   * 选择照片
   */
  choseImg(){
    let that =this; //让that代表page整个类
    console.log("上传图片文件")

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log("选择成功",res)
        that.upLoadImg(res.tempFilePaths[0])
      }
    })
  },

  /**
   * 上传照片
   * @param {*} fileUrl 
   */
  upLoadImg(fileUrl){
    wx.cloud.uploadFile({
      cloudPath: 'gamesPicture/'+name+'.png', // 上传至云端的路径
      filePath: fileUrl, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log("上传成功",res)
        
          pictureUrl= res.fileID
        console.log(pictureUrl)
      },
      fail: console.error
    })
  },

  /**
   * 确认上传赛事
   */
  uploadgames(){
    wx.cloud.database().collection("gamesMes").add({
      data:{
        name:name,
        pictureUrl:pictureUrl,
        webUrl:webUrl,
        signTime:signTime
      },
      success(res){
        console.log("添加数据成功",res)
      },
      fail(res){
        console.log("添加数据失败",res)
      }
    })
  },




  /**
   * 页面的初始数据
   */
  data: {

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