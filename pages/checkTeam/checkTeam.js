// pages/checkTeam/checkTeam.js
let openId = "";
let stuId = "";
let teamMes = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamNumberName:[],
    teamNumberId:[],
    openid:"",
    stuid:"",
    teammes:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    wx.cloud.callFunction({
      name:"getOpenId",
      success(res){
        console.log("请求OpenId成功",res)
        openId = res.result.openid
        console.log("openid是"+openId)
        // that.setData({
        //   openid:res.data.openid
        // })
        wx.cloud.database().collection("bin").where({
          _openid:openId
        }).get({
          success(res){
            console.log("请求成功学号",res.data[0].stdnumber)
            stuId = res.data[0].stdnumber
            console.log("得到的学号为"+stuId)
            // that.setData({
            //   stuid:res.data.stdnumber
            // })
            // console.log("stuid",that.data[0].stuid)

            wx.cloud.database().collection("team").where({
              teamNumberId : stuId
            }).get({
              success(res){
                console.log("请求队伍成功",res)
                teamMes = res.data
                console.log("队伍是"+teamMes)
                that.setData({
                  teammes:res.data,
                })
                console.log("队伍为",teammes)
        
              }
            })

          }
        })
      },
      fail(res){
        console.log("请求OpenId失败",res.result.openid)
      }
    })

    that.setData({teammes:teamMes})

    //从bin中得到学号
    // wx.cloud.database().collection("bin").where({
    //   _openid:openId
    // }).get({
    //   success(res){
    //     console.log("请求成功学号",res.data[0].stdnumber)
    //     stuId = res.data[0].stdnumber
    //     console.log("得到的学号为"+stuId)
    //     that.setData({
    //       stuid:res.data.stdnumber
    //     })
    //     console.log("stuid",that.data[0].stuid)
    //   }
    // })

    // //从team中得到组队信息
    // wx.cloud.database().collection("team").where({
    //   teamNumberId : stuId
    // }).get({
    //   success(res){
    //     console.log("请求队伍成功",res)
    //     that.setData({
    //       teammes:res.data
    //     })

    //   }
    // })
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