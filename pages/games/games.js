// pages/games/games.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 动态获取发布图片url,制作动态轮播效果
     */
    navH: 0,
  
    /**
     * 
     */
    circular: true,
    //是否显示画板指示点  
    indicatorDots: true,
    //选中点的颜色  
    //是否竖直  
    vertical: false,
    //是否自动切换  
    autoplay: true,
    //自动切换的间隔
    interval: 3000,
    //滑动动画时长毫秒  
    duration: 1000,
    //所有图片的高度  
    imgheights: 750,
    //图片宽度 
    imgwidth: 750,
    //默认  
    current: 0,
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
        url: '/pages/',
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

  imageLoad: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    console.log(imgwidth, imgheight)
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
  bindchange: function (e) {
    // console.log(e.detail.current)
    this.setData({ current: e.detail.current })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    });
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

  }
})