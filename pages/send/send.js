// pages/send/send.js
const ctr = require('./controller.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH: 0,
    theme: {
      color: '#1890FF',
      tabColor: '#333' || '#20ACAB',
    },
    data: [
      {
        tag: "赛务招募"
      },
      {
        tag: "学习答疑"
      }, {
        tag: "运动打卡"
      }, {
        tag: "失物招领"
      }

    ],
    navH: 0,
    title: "",
    content: "",
    location: "",
    images: [],
    video: {},
    topic: {
      items: [],
      selected: -1,
    },
    showAdd: false,
    showDialog: false,
    showVideo: false,
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
    ctr.setup(this);
    ctr.onLoad(options);
    this.setData({
      navH: app.globalData.navHeight
    });
    console.log(this.data.topic)
  },
  onUnload: function () {
    ctr.onUnload()
  },

  bindTitle: function (e) {
    this.setData({ title: e.detail.value })
  },
  bindContent: function (e) {
    this.setData({ content: e.detail.value })
  },
  writerPublish: function () {
    biz.subscribe("new-post", () => {
      ctr.onClickSubmit()
    })
  },
  clickVideo: ctr.onClickVideo,
  chooseImage: ctr.onChooseImage,
  clickImage: ctr.onClickImage,
  clickDelete: ctr.onDeleteImage,
  clickDeleteVideo: ctr.onClickDeleteVideo,
  writerCancel: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  clickTag: function (e) {
    ctr.onClickTag(e)
  },
  clickLocation: function (e) {
    ctr.onClickLocation(e)

  },
  clickDeleteLocation: function (e) {
    ctr.onDeleteLocation(e)
  },
  chooseImage: ctr.onChooseImage,
  chooseVideo: ctr.onChooseVideo,

  onRequestClose: function () {
    this.setData({ showDialog: false })
  },

  onDialogSubmit: function (e) {
    ctr.onSubmitLink(e)
  }

})