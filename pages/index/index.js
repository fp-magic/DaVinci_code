//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that=this
    that.initSocket()
    wx.login({
      success(res) {
        if (res.code) {
          that.sendSocketMessage({
            "action": "login",
            "data": {
              "code": res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    
  },
  onGotUserInfo(){
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success(res) {
              app.globalData.userInfo=res.userInfo
            } 
          })
        }
      }
    })
  },
  initSocket() {
    var that = this
    console.log("in index.js")
    app.globalData.localSocket = wx.connectSocket({
      url: 'ws://127.0.0.1:8080/websocket'
    })

    app.globalData.localSocket.onOpen(function (res) {
      console.log('WebSocket连接已打开！')
      app.globalData.socketOpen = true
      for (let i = 0; i < app.globalData.socketMsgQueue.length; i++) {
        that.sendSocketMessage(app.globalData.socketMsgQueue[i])
      }
      app.globalData.socketMsgQueue = []
    })
    app.globalData.localSocket.onClose(function (res) {
      console.log('close:', res)
    })
    app.globalData.localSocket.onMessage(function (res) {
      console.log('message: ', res)
      var resData = JSON.parse(res.data)
      that.solveMessage(resData)
      
    })
  },
  sendSocketMessage: function (msg) {
    var that = this
    if (app.globalData.socketOpen) {
      console.log(msg)
      app.globalData.localSocket.send({
        data: JSON.stringify(msg)
      })
    } else {
      app.globalData.socketMsgQueue.push(msg)
    }
  },
  solveMessage: function(resData){
    console.log("in index.js")
    if (resData.action == "getroominfores") {

    } else if (resData.action == "otherbroadcast") {

    } else if (resData.action == "loginres") {
      app.globalData.openid = resData.data.openid
    } else if (resData.action == "createroomres") {
    }
  },
  globalData: {
    userInfo: null,
    openid: {},
    localSocket: {}
  },
  mode1tap: function(e) {
    wx.navigateTo({
      url: '../GroupTeam/GroupTeam'
    })
  },
  mode2tap: function (e) {
    wx.navigateTo({
      url: '../game/game'
    })
  },
  rankingtap: function (e) {
    wx.navigateTo({
      url: '../ranking/ranking'
    })
  },
  optiontap: function (e) {
    wx.navigateTo({
      url: '../option/option'
    })
  },
  tutorialtap: function (e) {
    wx.navigateTo({
      url: '../tutorial/tutorial'
    })
  }
})