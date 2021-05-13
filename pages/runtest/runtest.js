// miniprogram/pages/runtest/runtest.js
const app = getApp()
const db = wx.cloud.database()
let countid=""
let step=""
let day=""
let name="hhh"
let number=""
let stdnumber=""
let status=""
Page({
  data: {
    openid:'fff',
    queryResult:'',
    runResult:'',
    date:'',
    status:'',
    name:'',
    number:'',
    stdnumber:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (){
    
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
              icon: 'none',
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
              this.setData({date:day}) 
               })
           },
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
      // 调用云函数
      
      
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:  function () {
    
  
  },
  //上传运动数据
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
      date: e.detail.value
    })
    console.log(this.data.number,this.data.date)
    db.collection('step').orderBy('step','desc').where({
      number:this.data.number,
      day:this.data.date
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
  lookRun(){

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