const app = getApp()

Page({
  data: {

  },
  onLoad: function() {},
  friends: function(e) {
    wx.navigateTo({
      url: '../invitefriends/invitefriends?isHost=true&roomId=' + roomId,
    })
  },
  //调试用begin
  friends_2: function(e) {
    wx.navigateTo({
      url: '../invitefriends/invitefriends?isHost=false&roomId=' + roomId,
    })
  },
  bindKeyInput(e) {
    roomId = e.detail.value
  },
  //调试用end
})
let roomId = "000000"