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
  onShow: function () {
    var that = this
    wx.onSocketMessage(function (res) {
      console.log('message: ', res)
      var resData = JSON.parse(res.data)
      that.solveMessage(resData)
    })
  },
  onLoad: function (option) {
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
    if(myLoc==0){
      app.sendSocketMessage({
        "action": "startroomgame",
        "data": {
          "openid": app.globalData.openid,
          "roomid": roomId
        }
      })
    }
    wx.navigateTo({
      url: '../game/game?myLoc=' + myLoc + '&roomId=' + roomId + '&playMode=multi',
    })
  },
  solveMessage: function (resData) {
    let that = this
    console.log("in invitefriends.js")
    if (resData.action == "enterroomres") {
      for (let i = 0; i < resData.data.members.length; i++)
        if (resData.data.members[i].openid != app.globalData.openid) {
          openId.push(resData.data.members[i].openid)
          nickName.push(resData.data.members[i].nickName)
          avatarUrl.push(resData.data.members[i].avatarUrl)
        }
      myLoc = resData.data.members.length
      openId.push(app.globalData.openid)
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
      openId.push(app.globalData.openid)
      nickName.push(app.globalData.userInfo.nickName)
      avatarUrl.push(app.globalData.userInfo.avatarUrl)
    } else if (resData.action == "roomgamestarted") {
      if (myLoc <= 3 && myLoc >= 1) {
        wx.navigateTo({
          url: '../game/game?myLoc=' + myLoc + '&roomId=' + roomId + '&playMode=multi',
        })
      }
    }
  },
  sendEnterInfo: function () {
    app.sendSocketMessage({
      "action": "enterroom",
      "data": {
        "openid": app.globalData.openid,
        "roomid": roomId
      }
    })
  },
  sendCreateInfo: function () {
    app.sendSocketMessage({
      "action": "createroom",
      "data": {
        "openid": app.globalData.openid,
        "roomcapacity": 4
      }
    })
  },
  refreshRoomShow: function (e) {
    var that = this
    var i = setInterval(function () {
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
  start_button: function(e){
    wx.navigateTo({
      url: '../game/game',
    })
  }
})
let openId
let myLoc
let nickName
let avatarUrl
let roomId
let isHost