//app.js

// 与服务端交互预留接口
//var socketOpen = false
//var socketMsgQueue = []

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 与服务端交互预留接口
    //this.initSocket()

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 与服务端交互预留接口
        /*this.sendSocketMessage({
          "action": "login",
          "data": {
            "code": res.code
          }
        })*/
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 与服务端交互预留接口
  /*initSocket() {
    var that = this
    that.globalData.localSocket = wx.connectSocket({
      url: 'ws://10.0.2.2:8080/websocket'
    })

    that.globalData.localSocket.onOpen(function (res) {
      console.log('WebSocket连接已打开！')
      socketOpen = true
      for (let i = 0; i < socketMsgQueue.length; i++) {
        sendSocketMessage(socketMsgQueue[i])
      }
      socketMsgQueue = []
    })
    that.globalData.localSocket.onClose(function (res) {
      console.log('close:', res)
    })
    that.globalData.localSocket.onMessage(function (res) {
      console.log('message: ', res)
      var resData = JSON.parse(res.data)
      if (resData.action == "loginres" && resData.status == 0) {
        that.globalData.openid = resData.data.openid
        wx.getUserInfo({
          success: res => {
            that.sendSocketMessage({
              "action": "updateuserinfo",
              "data": {
                "openid": that.globalData.openid,
                "nickName": res.userInfo.nickName,
                "avatarUrl": res.userInfo.avatarUrl,
                "gender": res.userInfo.gender
              } 
            }) 
          }
        })
      }
    })
  },
  sendSocketMessage: function (msg) {
    if (socketOpen) {
      this.globalData.localSocket.send({
        data: JSON.stringify(msg)
      })
    } else {
      socketMsgQueue.push(msg)
    }
  },*/
  globalData: {
    userInfo: null,
    openid: {},
    localSocket: {},
    socketOpen: null,
    socketMsgQueue :[]
  }
})