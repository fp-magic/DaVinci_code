Page({
  onLoad(nowPage) {
    this.setData({
      title: nowPage.title
    }),
      beginTime = 0
    playerNum = 4
    gameStatus = 0
    cardArray = shuffleSwap(createArray(24))//洗牌
    console.log(cardArray)
    if (playerNum == 4) {//发牌
      for (var i = 0; i < 4; i++)player1.push(cardArray.pop())
      for (var i = 0; i < 4; i++)player2.push(cardArray.pop())
      for (var i = 0; i < 4; i++)player3.push(cardArray.pop())
      for (var i = 0; i < 4; i++)player4.push(cardArray.pop())
    }
    gameStatus = 1
  },
  canvasIdErrorCallback(e) {
    console.error(e.detail.errMsg)
  },
  onReady(e) {

  },
  headerTouchStart: function (e) {
    beginTime = e.timeStamp
    console.log(e.timeStamp + '- touch start')
  },
  headerLongTap: function (e) {
    console.log(e.timeStamp + '- long tap')
  },
  headerTouchEnd: function (e) {
    if (Math.abs(e.timeStamp - beginTime - 3000) < 200)
      wx.navigateBack({
        delta: 1
      })
    console.log(e.timeStamp + '- touch end')
  },
  headerTap: function (e) {
    console.log(e.timeStamp + '- tap')
  }
})
let beginTime//进入时间
let playerNum//游戏人数，默认为4
let gameStatus/*当前游戏状态
                **四人时0/1/2/3用于表示自己的状态
                **1表示轮到自己，抽牌并猜牌
                **2表示确定猜牌，正在猜牌
                **3表示猜牌结束处理
                **0表示其他状态
                **4/5/6/7/8/9用于表示其他人状态
                **偶数表示正常，奇数表示在猜牌
                */
let cardArray = new Array()//总牌组
const app = getApp()
let player1 = new player()
let player2 = new player()
let player3 = new player()
let player4 = new player()
//以下两个函数用来产生随机数数组                
function createArray(max) {
  const arr = [];
  for (let i = 0; i < max; i++) {
    arr.push(i);
  }
  return arr;
}
function shuffleSwap(arr) {
  if (arr.length == 1) return arr;
  let i = arr.length;
  while (--i > 1) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}
/*以下用于定义一位玩家
**cardIndex:存放玩家手上卡牌的编号
**cardVisible:存放玩家手上卡牌对其他人的可见性
**playerState:玩家当前状态
**playerName:玩家昵称
*/
function player() {
  this.cardIndex = new Array()
  this.cardVisible = new Array()
  this.playerState = 0
  this.playerName = app.globalData.userInfo
  function setName(newName) {
    this.playerName = newName
  }
  function getCard(newCardIndex) {
    this.cardIndex.push(newCardIndex)
    this.cardVisible.push(false)
  }
  function guessedJudge(guessCardLoc, guessCardIndex) {
    if (cardIndex[guessCardLoc] == guessCardIndex) {
      cardVisible[guessCardLoc] = true
      return true
    }
    return false
  }
}
