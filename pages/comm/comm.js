// pages/comm/comm.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: 0,
    swiperCurrent: 0,
    loading: true,
    sortList: [
      {
        icon: "../../images/my/hz.png",
        sortid: 1,
        text: "赛务招募"
      }, {
        icon: "../../images/my/xx.png",
        sortid: 2,
        text: "学习答疑"
      }, {
        icon: "../../images/my/zl.png",
        sortid: 3,
        text: "失物招领"
      }, {
        icon: "../../images/my/dk.png",
        sortid: 4,
        text: "运动打卡"
      },
    ],
    tabbar: {
      "color": "#999999",
      "selectedColor": "#1296db",
      "borderStyle": "#dcdcdc",
      "backgroundColor": "#F5F5F5",
      "list": [{
        "key": "ga",
        "pagePath": "../games/games",
        "iconPath": "../../icon/bs.png",
        "selectedIconPath": "../../icon/bs2.png",
        "text": "赛务"
      },
      {
        "key": "sp",
        "pagePath": "../sports/sports",
        "iconPath": "../../icon/yd.png",
        "selectedIconPath": "../../icon/yd2.png",
        "text": "运动"
      },
      {
        "key": "ho",
        "iconPath": "../../icon/me2.png",
        "pagePath": "../home/home",
        "iconType": "big overflow circle shadow",
        "choose": "disable"
      },
      {
        "key": "co",
        "iconPath": "../../icon/mk.png",
        "pagePath": "../comm/comm",
        "selectedIconPath": "../../icon/mk2.png",
        "text": "模块"
      },
      {
        "key": "pu",
        "iconPath": "../../icon/tx.png",
        "selectedIconPath": "../../icon/tx2.png",
        "text": "记录"
      }
      ]
    }
  },
  onReady(){
    this.setData({
      loading: false
    });
  },
  tabChange: function (e) {
    var key = e.detail.key
    if (key == 'ga') {
      wx.reLaunch({
        url: '/pages/games/games',
      })
    } else if (key == 'sp') {
      wx.reLaunch({
        url: '/pages/sports/sports',
      })
    } else if (key == 'pu') {
      wx.reLaunch({
        url: '/pages/send/send',
      })
    } else if (key == 'ho') {
      wx.reLaunch({
        url: '/pages/home/home',
      })
    } else if (key == 'co') {
      wx.reLaunch({
        url: '/pages/comm/comm',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
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