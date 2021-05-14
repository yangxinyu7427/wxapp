// pages/gamesTeam/gamesTeam.js

let teamNumberName = [];
let teamNumberId = [];
let teamNumberPhone = [];
let teamNumberEmail = [];
let teamName = "";
let gamesName = "";
let signTime = "";
let gameMes = "";

Page({

  

  /**
   * 页面的初始数据
   */
  data: {
    gamesList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.cloud.database().collection('gamesMes')
      .get()
      .then(res => {
        console.log("获取成功", res)
        that.setData({
          gamesList: res.data,

        })
        that.setData({
          pictureUrl: res.data
        })
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

  },


  
data: {
 
  formitems:[] //首先将formitems定义为数组
   
  },
   
  //添加
   
  additems(e){
   
  var formitems = this.data.formitems
   
  var newData = {id: formitems.length}; //这个用来动态添加id为对应表单个数的对象
   
  formitems.push(newData); //给formitems添加1个对象
   
  this.setData({
   
  formitems: formitems, //动态渲染
   
  })
   
  },
   
  //删除
   
  delme(e){
   
  var delid=e.currentTarget.id; //动态获取数组下标（通过前端设id来实现）
   
  var formitems = this.data.formitems
   
  formitems.splice(delid, 1); //从id对应下标值开始，删除1个
   
  console.log(formitems)
   
  this.setData({
   
  formitems: formitems, //动态渲染
   
  })
   
  },




  inputTeamNumberName:function(e){

    console.log(e.target.dataset.index,e.detail.value);
  

    var index=e.target.dataset.index;
    

    var value=e.detail.value;
    teamNumberName[index] = value;
    console.log("名字"+teamNumberName);
  },

  inputTeamNumberId:function(e){

    console.log(e.target.dataset.index,e.detail.value);
  

    var index=e.target.dataset.index;
    

    var value=e.detail.value;
    teamNumberId[index] = value;
    console.log("学号"+teamNumberId);
  },

  TeamNumberPhone:function(e){

    console.log(e.target.dataset.index,e.detail.value);
  

    var index=e.target.dataset.index;
    

    var value=e.detail.value;
    teamNumberPhone[index] = value;
    console.log("手机"+teamNumberPhone);
  },

  inputTeamNumberEmail:function(e){

    console.log(e.target.dataset.index,e.detail.value);
  

    var index=e.target.dataset.index;
    

    var value=e.detail.value;
    teamNumberEmail[index] = value;
    console.log("邮箱"+teamNumberEmail);
  },


  addTeamName(even){
    teamName = even.detail.value
  },

  addGamesName(even){
    gamesName = even.detail.value
    wx.cloud.database().collection("gamesMes").where({
      name:gamesName
    }).get({
      success(res){
        console.log("得到竞赛的数据",res)
        signTime = res.data[0].signTime
        console.log("竞赛的截止时间为",signTime)
      }
    })
  },

  addTeam(){
    
    wx.cloud.database().collection("team").add({
      data:{
         teamNumberName : teamNumberName,
         teamNumberId :  teamNumberId,
         teamNumberPhone : teamNumberPhone,
         teamNumberEmail : teamNumberEmail,
         teamName : teamName,
         gamesName : gamesName,
         signTime : signTime,
      },
      success(res){
        console.log("添加数据成功",res)
      },
      fail(res){
        console.log("添加数据失败",res)
      }

    })
  }



  
})