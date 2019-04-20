const app = getApp()
let pageId = 1

Page({
  data: {
    pageindex: 1,
  },
  nextpage: function (e) {
    pageId += 1
    this.setData({
      pageindex: pageId,
    })
  },
  befpage: function (e) {
    pageId -= 1;
    this.setData({
      pageindex: pageId,
    })
  }
})
