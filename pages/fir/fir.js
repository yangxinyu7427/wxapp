// pages/fir/fir.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: ''
  },
  jumpLogin: function() {
    wx.redirectTo({
      url: '../login/login',
    })
  },
  jumpLogin2: function() {
    wx.redirectTo({
      url: '../login2/login2',
    })
  },
  Slide: function () {
    wx.getSystemInfo({
      success: (res) => {
        // this.setData({
        //   height: res.screenHeight
        // })
        // var height = this.setData
        var animation = wx.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
          delay: 0
        });
        animation.translateY(-res.windowHeight).step()
        this.setData({
          ani0: animation.export()
        });
      }
    })
    //
    // var animation = wx.createAnimation({
    //   duration: 2000,
    //   timingFunction: 'ease',
    //   delay: 0
    // });
    // animation.translateY(hei).step()
    // this.setData({
    //   ani0:  animation.export()
    // });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'ease',
      delay: 0
    });
    animation.opacity(1).step()
    this.setData({
      ani: animation.export()
    });

    var animation2 = wx.createAnimation({
      duration: 5000,
      timingFunction: 'ease',
      delay: 0
    });
    animation2.translate(50, -350).scale(1.5, 1.5).step()
    this.setData({
      ani2: animation2.export()
    })
    //文字逐个显示
    var that = this
    //文字逐个显示
    var story = "Welcome!";
    var i = 0;
    var time = setInterval(function () {
      var text = story.substring(0, i);
      i++;
      that.setData({
        text: text
      });
      if (text.length == story.length) {
        //   console.log("定时器结束！");
        clearInterval(time);
      }
    }, 200)
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


})

