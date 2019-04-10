Page({
  data: {
    player1_cards: ["white1", "black1", "white5"],
    player2_cards: ["white2", "black2", "white6"],
    player3_cards: ["white3", "black3", "white7"],
    player4_cards: ["white4", "black4", "white8", "black10", "black11"],
    player1_avatar: "/images/头像.jpg",
    player2_avatar: "/images/头像.jpg",
    player3_avatar: "/images/头像.jpg",
    player4_avatar: "/images/头像.jpg",
    player1_nickname: "I'mPlayer1",
    player2_nickname: "I'mPlayer2",
    player3_nickname: "I'mPlayer3",
    player4_nickname: "I'mPlayer4",

    white_left: ["white0", "white9", "white10", "white11", "whitejoker"],
    white_wait: ["white0", "white1", "white2", "white3", "white4", "white5", "white6", "white7", "white8", "white9", "white10", "white11", "whitejoker"],
    black_left: ["black0", "black5", "black6", "black7", "black8", "black9", "blackjoker"],
    black_wait: ["black0", "black1", "black2", "black3", "black4", "black5", "black6", "black7", "black8", "black9", "black10", "black11", "blackjoker",],

    Ismyturn: true,
    Havecardsleft: true,
    Isleftcardchosed: true,
    Havecardsstanded: true,
    Isstandedcardchose: true,
    Isjudgeright: true,
    state_left: false,
    state_standed: false,
    state_judge: true,
  },
  onLoad(nowPage) {
    this.setData({
        title: nowPage.title,
        player0card0: player0.cardIndexToString[0]
      }),
      beginTime = 2
    showTime = 10
    playTime = 20
    midTime = 5
    playerNum = 4
    gameStatus = 0
    guessStatus = 0
    aiMode = "freshman"
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
    player0.setLoc(0)
    player1.setLoc(1)
    player2.setLoc(2)
    player3.setLoc(3)
    this.setData({
      player0card0: player0.cardIndexToString[0]
    })
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
  },
  cardTouchEnd: function(e) { //之后配合前端进行修改
    if (gameStatus != 3) return
    guessPlayerLoc = Number("1") //分别表示点击的玩家编号的牌的编号
    guessCardLoc = Number("1") //之后配合前端进行修改
  },
  listSelectEnd: function(e) { //之后配合前端进行修改
    if (gameStatus != 3) return
    guessCons = false
    if (guessPlayerLoc == 1) {
      guessCons = player1.guessedJudge(guessCardLoc, guessCardIndex)
    } else
    if (guessPlayerLoc == 2) {
      guessCons = player2.guessedJudge(guessCardLoc, guessCardIndex)
    } else
    if (guessPlayerLoc == 3) {
      guessCons = player3.guessedJudge(guessCardLoc, guessCardIndex)
    }
    if (guessCons == true) {
      player0.succussJudge()
    } else {
      player0.failJudge()
    }
    guessStatus = 2
    player0.guessed=true
  }
})
let beginTime, showTime //进入时间,倒计时用时间
let playTime, midTime //回合时间，回合中间时间
let playerNum //游戏人数，默认为4
let gameStatus, gameStatus2, guessStatus
let guessPlayerLoc, guessCardLoc, guessCardIndex, guessCons //要猜的玩家位置编号,牌的位置编号,牌的实际编号和结果
let aiMode //ai智商
/*gameStatus:当前游戏状态
 **四人时0/1/2/3用于表示自己的状态
 **0表示游戏结束
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
  console.log(showTime, gameStatus, guessStatus, playerNum)
  if (guessStatus > 0) {
    guessStatus -= 1
  } else {
    if (playerNum == 4) {
      if(gameStatus==3){       
      }
      if (gameStatus == 5) {
        player1.aiController()
      } else if (gameStatus == 7){
        player2.aiController()
      }else if (gameStatus == 9){
        player3.aiController()
      }
    } else {
      //todo!
    }
  }
  if (showTime <= 0) {
    if (gameStatus == 2 || gameStatus == 4 || gameStatus == 6 || gameStatus == 8) {
      gameStatus += 1
      if (gameStatus == 3) {
        player0.getCard()
        player0.guessed = false
      } else if (gameStatus == 5) {
        player1.getCard()
        player1.guessed = false
      } else if (gameStatus == 7) {
        player2.getCard()
        player2.guessed = false
      } else if (gameStatus == 9) {
        player3.getCard()
        player3.guessed = false
      }
      showTime = playTime
    } else {
      if(cardArray.length<=0)gameStatus=0
      console.log(cardArray)
      if (gameStatus == 1 || gameStatus == 3 || gameStatus == 5 || gameStatus == 7 || gameStatus == 9) {
        if (gameStatus == 3) {
          if(!player0.guessed){
            player0.failJudge()
          }
        } else if (gameStatus == 5) {
          if (!player1.guessed) {
            player1.failJudge()
          }
        } else if (gameStatus == 7) {
          if (!player2.guessed) {
            player2.failJudge()
          }
        } else if (gameStatus == 9) {
          if (!player3.guessed) {
            player3.failJudge()
          }
        }
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
 **lastCardIndex:抽的最后一张牌
 **playerLoc:玩家的位置
 **guessed:本回合是否猜过
 */
function player() {
  this.cardIndex = new Array()
  this.cardIndexToString = new Array()
  this.cardVisible = new Array()
  this.playerState = 0
  this.playerName = "jack"
  this.cardNum = 0
  this.lastCardIndex = 0
  this.playerLoc = 0
  this.guessed = true
}
/*设置姓名
 */
player.prototype.setName = function(newName) {
  this.playerName = newName
}
/*设置位置
 */
player.prototype.setLoc = function(newLoc) {
  this.playerLoc = newLoc
}
/*抽一张牌
 */
player.prototype.getCard = function() {
  if (cardArray.length <= 0) return
  this.lastCardIndex = cardArray.pop()
  this.cardIndex.push(this.lastCardIndex)
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
/*查看是否还有立牌
 */
player.prototype.haveUnvisibleCard = function() {
  for (let i = 0; i < this.cardNum; i++) {
    if (this.cardVisible[i] == false)
      return true
  }
  return false
}
player.prototype.aiController = function() {
  if (aiMode == "freshman") {
    //随便找个人随便抽张牌随便猜个数
    do {
      guessPlayerLoc = Math.floor(Math.random() * (4))
    } while (guessPlayerLoc == this.playerLoc)
    guessCardLoc = Math.floor(Math.random() * (4))
    guessCardIndex = Math.floor(Math.random() * (24))
    guessCons = false
    if (guessPlayerLoc == 0) {
      guessCons = player0.guessedJudge(guessCardLoc, guessCardIndex)
    } else
    if (guessPlayerLoc == 1) {
      guessCons = player1.guessedJudge(guessCardLoc, guessCardIndex)
    } else
    if (guessPlayerLoc == 2) {
      guessCons = player2.guessedJudge(guessCardLoc, guessCardIndex)
    } else
    if (guessPlayerLoc == 3) {
      guessCons = player3.guessedJudge(guessCardLoc, guessCardIndex)
    }
    if (guessCons == true) {
      this.succussJudge()
    } else {
      this.failJudge()
    }
    console.log(guessCons, guessPlayerLoc, guessCardLoc, guessCardIndex)
    guessStatus = 2
    this.guessed=true
  }
}