// pages/sports/sports.js
const app = getApp()
const db = wx.cloud.database()
var util = require('../../utils/util.js');
let countid=""
let step=""
let day=""
let name="hhh"
let number=""
let stdnumber=""
let status=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'fff',
    queryResult:'',
    runResult:'',
    date:'',
    status:'',
    name:'',
    number:'',
    stdnumber:'',
    showdate:'',
    navH: 0,
    day: '查看我的步数吧',
    count: '',
    record: [

    ],
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    minDate: new Date().setMonth(new Date().getMonth() - 1),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } 
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    show: false,
    showPop: false,
    walkCount: [
      {
        id: "1",
        count: ''
      }, {
        id: "2",
        count: ''
      }, {
        id: "3",
        count: ''
      }, {
        id: "4",
        count: ''
      }, {
        id: "5",
        count: ''
      }, {
        id: "6",
        count: ''
      }, {
        id: "7",
        count: ''
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
        "text": "发布"
      }
      ]
    },
    sortList: [
      {
        icon: "../../icon/1.png",
        sortid: 1,
        text: "周一"
      }, {
        icon: "../../icon/2.png",
        sortid: 2,
        text: "周二"
      }, {
        icon: "../../icon/3.png",
        sortid: 3,
        text: "周三"
      }, {
        icon: "../../icon/4.png",
        sortid: 4,
        text: "周四"
      }, {
        icon: "../../icon/5.png",
        sortid: 5,
        text: "周五"
      }, {
        icon: "../../icon/6.png",
        sortid: 6,
        text: "周六"
      }, {
        icon: "../../icon/7.png",
        sortid: 7,
        text: "周日"
      },
    ],
    showShare: false,
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: '复制链接', icon: 'link' },
      { name: '二维码', icon: 'qrcode' },
    ],
  },
  showPopUp() {
    this.setData({
      showPop:true
    });
  },
  showPopDown() {
    this.setData({
      showPop:false
    });
  },
  exit() {
    this.setData({
      showPop:false
    });
  },
  conExit(event) {
    this.setData({
      currentDate: event.detail,
      showPop:false
    });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  onClick(event) {
    this.setData({ showShare: true });
  },

  onClose() {
    this.setData({ showShare: false });
  },

  onSelect(event) {
    Toast(event.detail.name);
    this.onClose();
  },
  showCount: function (e) {
    var key = e.currentTarget.dataset.index
    // console.log(index)
    // this.setData({
    //   count: index
    // });
    // var key = e.detail.key
    if (key == '0') {
      this.setData({
        day: "周一我的步数为 ",
        count: "22"
      });
    } else if (key == '1') {
      this.setData({
        day: "周二我的步数为  ",
        count: "33"
      });
    } else if (key == '2') {
      this.setData({
        day: "周三我的步数为  ",
        count: "44"
      });
    } else if (key == '3') {
      this.setData({
        day: "周四我的步数为  ",
        count: "55"
      });
    } else if (key == '4') {
      this.setData({
        day: "周五我的步数为  ",
        count: "66"
      });
    } else if (key == '5') {
      this.setData({
        day: "周六我的步数为  ",
        count: "77"
      });
    } else if (key == '6') {
      this.setData({
        day: "周日我的步数为  ",
        count: "88"
      });
    }
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
          _openid: getApp().globalData.openid
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
            name=this.data.name
            number=this.data.number
            stdnumber=this.data.stdnumber
            console.log('[数据库] [查询记录] 成功: ', name)
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
        wx.getWeRunData({
          success:res=> {
            console.log("cloudID:"+res.cloudID)    
            wx.cloud.callFunction({
              name: 'myFunction',
              data: {
                weRunData: wx.cloud.CloudID(res.cloudID)
              },
            }).then(resData=>{    
              console.log(resData) 
               console.log(resData.result.event.weRunData.data.stepInfoList[30].step)//今天的步数
               this.setData({step:resData.result.event.weRunData.data.stepInfoList[30].step})
               step=resData.result.event.weRunData.data.stepInfoList[30].step
               if(step>10000){
                status='已达标'
                this.setData({status:status})
              }else{
                status='未达标'
                this.setData({status:status})
              }
               var date = new Date(resData.result.event.weRunData.data.stepInfoList[30].timestamp*1000)
              //获取年份  
              var Y =date.getFullYear()
              //获取月份  
              var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
              //获取当日日期 
              var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
              day=Y + '-'  + M+ '-' + D
              console.log("当前时间：" + day )
              this.setData({
                date:day
              }) 
              console.log(this.data.number,this.data.showdate)
              db.collection('step').orderBy('step','desc').where({
                number:this.data.number,
                day:this.data.showdate
              }).get({
                success: (res)=> {
                  this.setData({
                    runResult: res.data
                  })
                  console.log('[数据库] [查询全班记录] 成功: ', res)
                },
                fail: err => {
                  wx.showToast({
                    icon: 'none',
                    title: '查询记录失败'  
                  })
                  console.error('[数据库] [查询记录] 失败：', err)
                }
              })
               })
           },
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })

    this.setData({
      navH: app.globalData.navHeight,
    });
    console.log(new Date().setMonth(new Date().getMonth() - 1))
  },
  updateRun(){
    console.log(this.data.openid,day)
    db.collection('step').where({
      _openid: this.data.openid,
      day:day
    }).get({
      success: (res)=> {
        
        console.log("查询结果",res.data.length)
        
        if(res.data.length==0){
          db.collection('step').add({
            data: {
              name: this.data.name,
              number:this.data.number,
              stdnumber:this.data.stdnumber,
              step:step,
              day:day,
              status:status
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
          countid=res.data[0]._id
          console.log('已有步数')
          db.collection('step').doc(countid).update({
            data: {
              name: this.data.name,
              number:this.data.number,
              stdnumber:this.data.stdnumber,
              step:step,
              day:day,
              status:status
            },
            success: res => {
              console.log('已更新')
              wx.showToast({
                title: '提交成功',
              })
            },
            fail: err => {
              icon: 'none',
              console.error('[数据库] [更新记录] 失败：', err)
            }
          })
        }
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      showdate: e.detail.value
    })
    console.log(this.data.number,this.data.date)
    db.collection('step').orderBy('step','desc').where({
      number:this.data.number,
      day:this.data.showdate
    }).get({
      success: (res)=> {
        this.setData({
          runResult: res.data
        })
        console.log('[数据库] [查询全班记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'  
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
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