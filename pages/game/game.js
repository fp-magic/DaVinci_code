Page({
  onLoad(nowPage) {
    this.setData({
      title: nowPage.title
    })
  },
  canvasIdErrorCallback(e) {
    console.error(e.detail.errMsg)
  },
  onReady(e) {
    const context = wx.createCanvasContext('gameCanvas')

    context.setStrokeStyle('#00ff00')
    context.setLineWidth(5)
    context.rect(0, 0, 375, 500)
    context.stroke()
    context.setFillStyle('red')
    context.fillRect(100, 100, 100, 75)
    context.stroke()
    context.draw()
  },
  touchGameStart:function(e) {
    const context = wx.createCanvasContext('gameCanvas')

    context.setStrokeStyle('#00ff00')
    context.setLineWidth(5)
    context.rect(0, 0, 375, 500)
    context.stroke()
    context.setFillStyle('green')
    context.fillRect(e.touches[0].x-25, e.touches[0].y-35,50,50)
    context.stroke()
    context.draw()
  },
  headerTouchStart: function (e) {
    beginTime=e.timeStamp
    console.log(e.timeStamp + '- touch start')
  },
  headerLongTap: function(e){ 
    console.log(e.timeStamp + '- long tap')
  }, 
  headerTouchEnd: function (e) {
    if(Math.abs(e.timeStamp-beginTime-3000)<200)
      wx.navigateBack({
        delta:1
      })
    console.log(e.timeStamp + '- touch end')
  }, 
  headerTap: function (e) {
    console.log(e.timeStamp + '- tap')
}
})
var beginTime=0