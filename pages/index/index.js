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
  onShow: function () {
    var that = this
    wx.onSocketMessage(function (res) {
      console.log('message: ', res)
      var resData = JSON.parse(res.data)
      that.solveMessage(resData)
    })
  },
  onGotUserInfo(){
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success(res) {
              app.globalData.userInfo=res.userInfo
              app.sendSocketMessage({
                "action": "updateuserinfo",
                "data": {
                  "openid": app.globalData.openid,
                  "nickName": res.userInfo.nickName,
                  "avatarUrl": res.userInfo.avatarUrl,
                  "gender": res.userInfo.gender
                }
              }) 
            }
          })
        }
      }
    })
  },
  solveMessage: function(resData){
    console.log("in index.js")
    if (resData.action == "getroominfores") {

    } else if (resData.action == "otherbroadcast") {

    } else if (resData.action == "loginres") {
      app.globalData.openid = resData.data.openid
    } else if (resData.action == "createroomres") {

    }
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