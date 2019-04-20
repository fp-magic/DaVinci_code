const app = getApp()

Page({
  data: {
    playernum: 4,
    playerInfo_1: {
      // avatarUrl: "https://i.postimg.cc/Hsdbtpbh/blackjoker.jpg",
      avatarUrl: "/images/head1.bmp",
      nickname: "玩家一",
      point: 40
    },
    playerInfo_2: {
      avatarUrl: "/images/head2.bmp",
      nickname: "玩家2",
      point: 30
    },
    playerInfo_3: {
      avatarUrl: "/images/head3.bmp",
      nickname: "玩家3",
      point: 20
    },
    playerInfo_4: {
      avatarUrl: "/images/head4.bmp",
      nickname: "玩家4",
      point: 10
    },
  },
  onLoad: function () {
    var that=this
    that.setData({
      playerInfo_1: {
        avatarUrl: app.globalData.nowAvatarUrl[0],
        nickname: app.globalData.nowNickName[0],
        point: app.globalData.nowScore[0]
      },
      playerInfo_2: {
        avatarUrl: app.globalData.nowAvatarUrl[1],
        nickname: app.globalData.nowNickName[1],
        point: app.globalData.nowScore[1]
      },
      playerInfo_3: {
        avatarUrl: app.globalData.nowAvatarUrl[2],
        nickname: app.globalData.nowNickName[2],
        point: app.globalData.nowScore[2]
      },
      playerInfo_4: {
        avatarUrl: app.globalData.nowAvatarUrl[3],
        nickname: app.globalData.nowNickName[3],
        point: app.globalData.nowScore[3]
      },
    })
  }
  
})
