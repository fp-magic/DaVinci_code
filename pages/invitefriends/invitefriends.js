const app = getApp()

Page({
  data: {
    Room_id: 123456,
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
  startgame: function(e){
    wx.navigateTo({
      url: '../game/game',
    })
  }

  
})
