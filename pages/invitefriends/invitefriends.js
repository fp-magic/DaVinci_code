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
  onLoad:function(option){
    console.log(option)
    var that=this
    console.log(app.globalData)
    openId=new Array()
    nickName=new Array()
    avatarUrl=new Array()
    if(option.isHost=="true"){
      isHost=true
    }else{
      roomId = Number(option.roomId)
      isHost=false
    }
    that.initSocket()
    console.log(isHost)
    if(isHost=="true"){
      console.log("?")
      that.sendCreateInfo()
    }else{
      console.log("!")
      that.sendEnterInfo()
      that.setData({
        Room_id:roomId
      })
    }
  }, 
  startgame: function(e){
    wx.navigateTo({
      url: '../game/game',
    })
  },
  initSocket() {
    var that = this
    app.globalData.localSocket = wx.connectSocket({
      url: 'ws://127.0.0.1:8080/websocket'
    })

    app.globalData.localSocket.onOpen(function (res) {
      console.log('WebSocket连接已打开！')
      socketOpen = true
      for (let i = 0; i < socketMsgQueue.length; i++) {
        that.sendSocketMessage(socketMsgQueue[i])
      }
      socketMsgQueue = []
    })
    app.globalData.localSocket.onClose(function (res) {
      console.log('close:', res)
    })
    app.globalData.localSocket.onMessage(function (res) {
      console.log('message: ', res)
      var resData = JSON.parse(res.data)
      if (resData.action == "getroominfores") {
        for (i = 0; i < resData.members.length; i++)
          if (resData.data.members[i].openid != app.globalData.openid) {
            openId.push(resData.data.members[i].openid)
            nickName.push(resData.data.members[i].nickName)
            avatarUrl.push(resData.data.members[i].avatarUrl)
          }
      } else if (resData.action == "otherbroadcast") {

      } else if (resData.action == "loginres") {
        console.log(resData.data)
        app.globalData.openid = resData.data.openid
        console.log(app.globalData)
      }else if(resData.action=="createroomres"){
        roomId=resData.data.roomid
        that.setData({
          Room_id:roomId
        })
      }
    })
  },
  sendSocketMessage: function (msg) {
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
  sendEnterInfo:function(){
    this.sendSocketMessage({
    "action":"enterroom",
    "data":{
      "openid":app.globalData.openid,
      "roomid":roomId
    }
    })
  },
  sendCreateInfo:function(){
    this.sendSocketMessage({
      "action": "createroom",
      "data": {
        "openid":app.globalData.openid,
        "roomcapacity": 4
      }
    })
  },  
})
let openId
let nickName
let avatarUrl
let roomId
let isHost
let socketOpen
let socketMsgQueue = new Array()