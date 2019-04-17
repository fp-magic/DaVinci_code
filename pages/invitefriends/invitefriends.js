const app = getApp()

Page({
  data: {
    Room_id: roomId,
    playerInfo_1: {
      avatarUrl: "https://i.postimg.cc/Hsdbtpbh/blackjoker.jpg",
      nickname: "玩家一",
    },
    playerInfo_2: {
      avatarUrl: "https://i.postimg.cc/Hsdbtpbh/blackjoker.jpg",
      nickname: "等待玩家2进入",
    },
    playerInfo_3: {
      avatarUrl: "https://i.postimg.cc/Hsdbtpbh/blackjoker.jpg",
      nickname: "等待玩家3进入",
    },
    playerInfo_4: {
      avatarUrl: "https://i.postimg.cc/Hsdbtpbh/blackjoker.jpg",
      nickname: "等待玩家4进入",
    }
  },
  onLoad: function(option) {
    console.log(option)
    console.log(app.globalData.userInfo)
    var that = this
    console.log(app.globalData)
    openId = new Array()
    nickName = new Array()
    avatarUrl = new Array()
    if (option.isHost == "true") {
      isHost = true
    } else {
      roomId = option.roomId
      isHost = false
    }
    that.initSocket()
    if (isHost) {
      that.sendCreateInfo()
    } else {
      that.sendEnterInfo()
      that.setData({
        Room_id: roomId
      })
    }
    this.refreshRoomShow()
  },
  startgame: function(e) {
    wx.navigateTo({
      url: '../game/game?myLoc='+myLoc+'&roomId='+roomId,
    })
  },
  initSocket() {
    var that = this
    app.globalData.localSocket = wx.connectSocket({
      url: 'ws://127.0.0.1:8080/websocket'
    })

    app.globalData.localSocket.onOpen(function(res) {
      console.log('WebSocket连接已打开！')
      socketOpen = true
      for (let i = 0; i < socketMsgQueue.length; i++) {
        that.sendSocketMessage(socketMsgQueue[i])
      }
      socketMsgQueue = []
    })
    app.globalData.localSocket.onClose(function(res) {
      console.log('close:', res)
    })
    app.globalData.localSocket.onMessage(function(res) {
      console.log('message: ', res)
      var resData = JSON.parse(res.data)
      if (resData.action == "enterroomres") {
        for (let i = 0; i < resData.members.length; i++)
          if (resData.data.members[i].openid != app.globalData.openid) {
            openId.push(resData.data.openid)
            nickName.push(resData.data.nickName)
            avatarUrl.push(resData.data.avatarUrl)
          }
        myLoc = resData.members.length
        openId.push(app.globalData.userInfo.openid)
        nickName.push(app.globalData.userInfo.nickName)
        avatarUrl.push(app.globalData.userInfo.avatarUrl)        
      } else if (resData.action == "otherenterroom") {
        openId.push(resData.data.openid)
        nickName.push(resData.data.nickName)
        avatarUrl.push(resData.data.avatarUrl)
      } else if (resData.action == "loginres") {
        console.log(resData.data)
        app.globalData.openid = resData.data.openid
        console.log(app.globalData)
      } else if (resData.action == "createroomres") {
        roomId = resData.data.roomid
        that.setData({
          Room_id: roomId
        })
        myLoc = 0
        openId.push(app.globalData.userInfo.openid)
        nickName.push(app.globalData.userInfo.nickName)
        avatarUrl.push(app.globalData.userInfo.avatarUrl)  
      }
      console.log("myLoc:",myLoc)
    })
  },
  sendSocketMessage: function(msg) {
    var that = this
    if (socketOpen) {
      console.log(msg)
      app.globalData.localSocket.send({
        data: JSON.stringify(msg)
      })
    } else {
      socketMsgQueue.push(msg)
    }
  },
  sendEnterInfo: function() {
    this.sendSocketMessage({
      "action": "enterroom",
      "data": {
        "openid": app.globalData.openid,
        "roomid": roomId
      }
    })
  },
  sendCreateInfo: function() {
    this.sendSocketMessage({
      "action": "createroom",
      "data": {
        "openid": app.globalData.openid,
        "roomcapacity": 4
      }
    })
  },
  refreshRoomShow: function(e) {
    var that = this
    var i = setInterval(function() {
      that.setData({
        playerInfo_1: {
          avatarUrl: avatarUrl[0],
          nickname: nickName[0],
        },
        playerInfo_2: {
          avatarUrl: avatarUrl.length > 1 ? avatarUrl[1] : "https://i.postimg.cc/Hsdbtpbh/blackjoker.jpg",
          nickname: nickName.length > 1 ? nickName[1] : "等待玩家2进入",
        },
        playerInfo_3: {
          avatarUrl: avatarUrl.length > 2 ? avatarUrl[2] : "https://i.postimg.cc/Hsdbtpbh/blackjoker.jpg",
          nickname: nickName.length > 2 ? nickName[2] : "等待玩家2进入",
        },
        playerInfo_4: {
          avatarUrl: avatarUrl.length > 3 ? avatarUrl[3] : "https://i.postimg.cc/Hsdbtpbh/blackjoker.jpg",
          nickname: nickName.length > 3 ? nickName[3] : "等待玩家2进入",
        }
      })
    }, 100)
  },
})
let openId
let myLoc
let nickName
let avatarUrl
let roomId
let isHost
let socketOpen
let socketMsgQueue = new Array()