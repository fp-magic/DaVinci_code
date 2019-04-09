Page({
  onLoad(nowPage) {
    this.setData({
        title: nowPage.title,
        player0card0: player0.cardIndexToString[0]
      }),
      beginTime = 2
    showTime = 10
    playTime = 60
    midTime = 5
    playerNum = 4
    gameStatus = 0
    changeState()
    cardArray = shuffleSwap(createArray(24)) //洗牌
    console.log(cardArray)
    console.log(player1)
    if (playerNum == 4) { //发牌
      for (var i = 0; i < 3; i++) player0.getCard()
      for (var i = 0; i < 3; i++) player1.getCard()
      for (var i = 0; i < 3; i++) player2.getCard()
      for (var i = 0; i < 3; i++) player3.getCard()
    }
    this.setData({
      player0card0: player0.cardIndexToString[0]
    })
    player0.playerName = "mary"
    console.log(player1)
    gameStatus = 1

  },
  canvasIdErrorCallback(e) {
    console.error(e.detail.errMsg)
  },
  onReady(e) {

  },
  headerTouchStart: function(e) {
    beginTime = e.timeStamp
    console.log(e.timeStamp + '- touch start')
  },
  headerLongTap: function(e) {
    console.log(e.timeStamp + '- long tap')
  },
  headerTouchEnd: function(e) {
    if (Math.abs(e.timeStamp - beginTime - 3000) < 200)
      wx.navigateBack({
        delta: 1
      })
    console.log(e.timeStamp + '- touch end')
    console.log(e)
  },
  headerTap: function(e) {
    console.log(e.timeStamp + '- tap')
  }
})
let beginTime, showTime //进入时间,倒计时用时间
let playTime, midTime //回合时间，回合中间时间
let playerNum //游戏人数，默认为4
let gameStatus, gameStatus2
/*gameStatus:当前游戏状态
 **四人时0/1/2/3用于表示自己的状态
 **0表示未定
 **1表示游戏即将开始
 **2表示猜牌中
 **3表示猜牌结束
 **4/5/6/7/8/9用于表示其他人状态，偶数表示猜牌中，奇数表示猜牌结束
 **偶数表示正常，奇数表示在猜牌
 */
let cardArray = new Array() //总牌组
const app = getApp()
let player0 = new player()
let player1 = new player()
let player2 = new player()
let player3 = new player()
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
/*以下用于定时，控制状态变化
 */
function changeState() {
  showTime -= 1
  console.log(showTime)
  if (showTime <= 0) {
    if (gameStatus == 2 || gameStatus == 4 || gameStatus == 6 || gameStatus == 8) {
      gameStatus += 1
      showTime = playTime
    } else {
      if (gameStatus == 1 || gameStatus == 3 || gameStatus == 5 || gameStatus == 7 || gameStatus == 9) {
        gameStatus += 1
        showTime = midTime
        if (gameStatus == 10) {
          gameStatus = 2
        }
      }
    }
  }
  let timer = setTimeout(changeState, 1000)
}
/*以下用于定义一位玩家
 **cardIndex:存放玩家手上卡牌的编号,卡牌编号为0-23，其中0-11是白牌，12-23是黑牌
 **cardVisible:存放玩家手上卡牌对其他人的可见性
 **playerState:玩家当前状态
 **playerName:玩家昵称
 **cardNum:手牌数量
 */
function player() {
  this.cardIndex = new Array()
  this.cardIndexToString = new Array()
  this.cardVisible = new Array()
  this.playerState = 0
  this.playerName = "jack"
  this.cardNum = 0
  this.lastCardIndex = 0
}
/*设置姓名
 */
player.prototype.setName = function(newName) {
  this.playerName = newName
}
/*抽一张牌
 */
player.prototype.getCard = function() {
  let lastCardIndex = cardArray.pop()
  this.cardIndex.push(lastCardIndex)
  this.cardVisible.push(false)
  this.cardNum = this.cardNum + 1
  for (let i = 0; i < this.cardNum; i++) { //保持降序，牌数较少就直接冒泡排了
    for (let j = i + 1; j < this.cardNum; j++) {
      if (this.cardIndex[i] % 12 < this.cardIndex[j] % 12 || (this.cardIndex[i] % 12 == this.cardIndex[i] % 12 && this.cardIndex[i] < this.cardIndex[j])) {
        let tmp = this.cardIndex[i]
        this.cardIndex[i] = this.cardIndex[j]
        this.cardIndex[j] = tmp
        let tmp2 = this.cardVisible[i]
        this.cardVisible[i] = this.cardVisible[j]
        this.cardVisible[j] = tmp2
      }
    }
  }
  for (let i = 0; i < this.cardNum; i++) {
    this.cardIndexToString[i] = this.cardIndex[i].toString()
  }
}
/*被猜牌
 **guessCardLoc:被猜的牌的位置编号
 **guessCardIndex:被猜的牌的实际编号
 */
player.prototype.guessedJudge = function(guessCardLoc, guessCardIndex) {
  if (this.cardIndex[guessCardLoc] == guessCardIndex) {
    this.cardVisible[guessCardLoc] = true
    return true
  }
  return false
}
/*猜牌成功的情况
 */
player.prototype.succussJudge = function() {
  showTime = playTime
}
/*猜牌失败的情况
 */
player.prototype.failJudge = function() {
  for (let i = 0; i < this.cardNum; i++) {
    if (this.cardIndex[i] == this.lastCardIndex)
      this.cardVisible[i] = true
  }
  showTime = 1
}