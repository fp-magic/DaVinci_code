const app = getApp()

Page({
  data: {

  },
  onLoad: function () {
  },
  friends: function (e) {
    wx.navigateTo({
      url: '../invitefriends/invitefriends',
    })
  },
})

