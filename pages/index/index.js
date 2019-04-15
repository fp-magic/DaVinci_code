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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
