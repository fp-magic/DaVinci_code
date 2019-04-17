const app = getApp()

Page({
  data: {
    inputValue: '',
  },
  bindKeyInput: function (e) {
    // console.log(e.detail.value)
    this.setData({
      inputValue: e.detail.value
    })
  },
  confirmbutton: function (e) {
    wx.navigateTo({
      url: '../invitefriends/invitefriends',
    })
  }
})
