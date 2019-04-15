Page({
  data: {

    player1_avatar: "/images/头像.jpg",
    player2_avatar: "/images/头像.jpg",
    player3_avatar: "/images/头像.jpg",
    player4_avatar: "/images/头像.jpg",
    player1_nickname: "I'mplayer[1]",
    player2_nickname: "I'mplayer[2]",
    player3_nickname: "I'mplayer[3]",
    player4_nickname: "I'mPlayer4",


    white_wait: ["white0", "white1", "white2", "white3", "white4", "white5", "white6", "white7", "white8", "white9", "white10", "white11"],
    black_left: ["black0", "black5", "black6", "black7", "black8", "black9", "blackjoker"],
    black_wait: ["black0", "black1", "black2", "black3", "black4", "black5", "black6", "black7", "black8", "black9", "black10", "black11"],
    black_left: ["black0", "black1", "black2", "black3", "black4", "black5", "black6", "black7", "black8", "black9", "black10", "black11", "blackjoker",],

    cards_imageURL: {
      "black0": "https://i.postimg.cc/bwvNzMjJ/black0.jpg",
      "black1": "https://i.postimg.cc/XYDNX8Vg/black1.jpg",
      "black2": "https://i.postimg.cc/CKXKr4XK/black2.jpg",
      "black3": "https://i.postimg.cc/qvtVDdT8/black3.jpg",
      "black4": "https://i.postimg.cc/pLBGBG9D/black4.jpg",
      "black5": "https://i.postimg.cc/rsWgRQXR/black5.jpg",
      "black6": "https://i.postimg.cc/76jmLjcy/black6.jpg",
      "black7": "https://i.postimg.cc/vmq0J4tT/black7.jpg",
      "black8": "https://i.postimg.cc/638MtBM0/black8.jpg",
      "black9": "https://i.postimg.cc/D0dLKD36/black9.jpg",
      "black10": "https://i.postimg.cc/jdcPgGXd/black10.jpg",
      "black11": "https://i.postimg.cc/fRbX6B27/black11.jpg",
      "blackback": "https://i.postimg.cc/KcnnLK3T/blackback.jpg",
      "blackblank": "https://i.postimg.cc/L80fRLwc/blackblank.jpg",
      "blackjoker": "https://i.postimg.cc/Hsdbtpbh/blackjoker.jpg",

      "white0": "https://i.postimg.cc/nLH5bb8R/white0.jpg",
      "white1": "https://i.postimg.cc/QtCyCQdc/white1.jpg",
      "white2": "https://i.postimg.cc/5N8bfVGb/white2.jpg",
      "white3": "https://i.postimg.cc/252tCcrz/white3.jpg",
      "white4": "https://i.postimg.cc/7PFqv6KK/white4.jpg",
      "white5": "https://i.postimg.cc/sfQ30S4B/white5.jpg",
      "white6": "https://i.postimg.cc/tJVvt9PT/white6.jpg",
      "white7": "https://i.postimg.cc/G2fSy44V/white7.jpg",
      "white8": "https://i.postimg.cc/nMbR3NY1/white8.jpg",
      "white9": "https://i.postimg.cc/W1jj3yLr/white9.jpg",
      "white10": "https://i.postimg.cc/0yfvJCP4/white10.jpg",
      "white11": "https://i.postimg.cc/HLkg07Lk/white11.jpg",
      "whiteback": "https://i.postimg.cc/FKCQTsfg/whiteback.jpg",
      "whiteblank": "https://i.postimg.cc/SsXb3FC0/whiteblank.jpg",
      "whitejoker": "https://i.postimg.cc/vBpwdqt4/whitejoker.jpg",

      "option": "https://i.postimg.cc/ncwwrHRN/option.png",
      "picture-black": "https://i.postimg.cc/rmJfkcRn/picture-black.jpg",
      "ranking": "https://i.postimg.cc/sgQHZtbx/ranking.png",
      "ranking1": "https://i.postimg.cc/SxBTLgpr/ranking1.jpg",
      "ranking2": "https://i.postimg.cc/HnkBWKQp/ranking2.jpg",
      "ranking3": "https://i.postimg.cc/KzF0w4j3/ranking3.jpg",
      "tutorial": "https://i.postimg.cc/0N7tV7kq/tutorial.png",
    },

    Isselect: "white0",
    Ismyturn: false,
    Havecardsleft: true,
    Isleftcardchosed: true,
    Havecardsstanded: gameStatus,
    Isstandedcardchose: false,
    Isjudgeright: true,
    state_left: false,
    state_standed: false,
    state_judge: true,
    // 新加的变量，Player_turn表示当前是哪个玩家，Left_time表示剩余时间
    Player_turn: 4,
    Left_time: 10,
  },
  /*刷新牌组显示
   */

  onLoad(nowPage) {
    beginTime = 2 //游戏开始前等待时间
    showTime = 5 //用于显示的当前状态剩余时间
    playTime = 10 //游戏内回合时间
    midTime = 5 //回合间等待时间
    playerNum = 4 //玩家人数
    gameStatus = 0 //游戏进行状态
    guessStatus = 0
    aiMode = "freshman" //ai难度
    playMode = "single" //游戏模，sigle是单人模式，multi是好友对战
    isHost = true
    myLoc = 0
    openId = ["123", "456", "789"]
    nickName = ["player1", "player2", "player3"]
    cardNameForBind = ["white0", "white1", "white2", "white3", "white4", "white5", "white6", "white7", "white8", "white9", "white10", "white11", "black0", "black1", "black2", "black3", "black4", "black5", "black6", "black7", "black8", "black9", "black10", "black11"]
    for (let i = 0; i < cardNameForBind.length; i++) {
      cardVisibleDict[cardNameForBind[i]] = false
    }
    if (playMode == "multi") {
      initSocket()
    }
    if (playMode == "multi" && isHost) {
      this.sendSocketMessage({
        "action": "startroomgame",
        "data": {
          "openid": this.globalData.openid,
          "roomid": roomId
        }
      })
    }
    if (isHost || playMod == "single") {
      changeState()
      cardArrayWhite = shuffleSwap(createArray(12)) //洗牌
      cardArrayBlack = shuffleSwap(createArray(12))
      this.sendCardInfo()
      for (let i = 0; i < cardArrayBlack.length; i++) cardArrayBlack[i] += 12
      cardArrayWhiteForBind = countForBind(cardArrayWhite)
      cardArrayBlackForBind = countForBind(cardArrayBlack)
      console.log(cardArrayWhite, cardArrayBlack) 
      
      if (playerNum == 4) { //发牌
        for (let i = 0; i < 3; i++) player[0].getCard(0)
        for (let i = 0; i < 3; i++) player[1].getCard(0)
        for (let i = 0; i < 3; i++) player[2].getCard(0)
        for (let i = 0; i < 3; i++) player[3].getCard(0)
      }
      player[0].setLoc(0)
      player[1].setLoc(1)
      player[2].setLoc(2)
      player[3].setLoc(3)
      gameStatus = 1
    }
    this.setData({
      player1_cards: player[0].cardIndexForBind,
      player2_cards: player[1].cardIndexForBind,
      player3_cards: player[2].cardIndexForBind,
      player4_cards: player[3].cardIndexForBind,
      white_left: cardArrayWhiteForBind,
      black_left: cardArrayBlackForBind,
      cards_dict: cardVisibleDict
    })
    
  },
  onLoadAffiliate: function(){
    for (let i = 0; i < cardArrayBlack.length; i++) cardArrayBlack[i] += 12
    cardArrayWhiteForBind = countForBind(cardArrayWhite)
    cardArrayBlackForBind = countForBind(cardArrayBlack)
    console.log(cardArrayWhite, cardArrayBlack)
    if (playerNum == 4) { //发牌
      for (let i = 0; i < 3; i++) player[0].getCard(0)
      for (let i = 0; i < 3; i++) player[1].getCard(0)
      for (let i = 0; i < 3; i++) player[2].getCard(0)
      for (let i = 0; i < 3; i++) player[3].getCard(0)
    }
    player[0].setLoc(0)
    player[1].setLoc(1)
    player[2].setLoc(2)
    player[3].setLoc(3)
    this.setData({
      player1_cards: player[0].cardIndexForBind,
      player2_cards: player[1].cardIndexForBind,
      player3_cards: player[2].cardIndexForBind,
      player4_cards: player[3].cardIndexForBind,
      white_left: cardArrayWhiteForBind,
      black_left: cardArrayBlackForBind,
      cards_dict: cardVisibleDict
    })
  },
  refreshCardBind: function (e) {
    var that = this
    var i = setInterval(function () {
      that.setData({
        player1_cards: player[0].cardIndexForBind,
        player2_cards: player[1].cardIndexForBind,
        player3_cards: player[2].cardIndexForBind,
        player4_cards: player[3].cardIndexForBind,
        white_left: cardArrayWhiteForBind,
        black_left: cardArrayBlackForBind,
        cards_dict: cardVisibleDict
      })
      if (gameStatus == 3) {
        that.setData({
          Ismyturn: true
        })
      } else {
        that.setData({
          Ismyturn: false,
          state_judge: false
        })
      }
    }, 100)
  },
  onReady(e) {
    this.refreshCardBind()
  },
  cardTouchEnd: function (e) { //之后配合前端进行修改
    if (gameStatus != 3) return
    console.log(e.target)
    let buttonId = e.target["id"]
    guessPlayerLoc = Number(buttonId[6]) - 1 //分别表示点击的玩家编号的牌的编号
    guessCardTrueName = buttonId.substring(7, buttonId.length) //之后配合前端进行修改
    this.setData({
      Isstandedcardchose: true
    })
  },
  listSelectEnd: function (e) { //之后配合前端进行修改
    if (gameStatus != 3) return
    guessCons = false
    let buttonId = e.target["id"]
    guessCardName = buttonId
    console.log(guessPlayerLoc, guessCardName, guessCardTrueName)
    if (guessPlayerLoc == 1) {
      guessCons = player[1].guessedJudge(guessCardName, guessCardTrueName)
    } else
    if (guessPlayerLoc == 2) {
      guessCons = player[2].guessedJudge(guessCardName, guessCardTrueName)
    } else
    if (guessPlayerLoc == 3) {
      guessCons = player[3].guessedJudge(guessCardName, guessCardTrueName)
    }
    if (guessCons == true) {
      player[0].succussJudge()
      this.setData({
        Isjudgeright: true
      })
    } else {
      player[0].failJudge()
      this.setData({
        Isjudgeright: false
      })
    }
    console.log(guessCons)
    guessStatus = 2
    player[0].guessed = true
    this.setData({
      Isstandedcardchose: false,
      state_judge: true
    })
  },
  endMyTurn: function (e) {
    showTime = 1
  },
  initSocket() {
    var that = this
    that.globalData.localSocket = wx.connectSocket({
      url: 'ws://120.78.169.154:8689/websocket'
    })

    that.globalData.localSocket.onOpen(function(res) {
      console.log('WebSocket连接已打开！')
      socketOpen = true
      for (let i = 0; i < socketMsgQueue.length; i++) {
        this.sendSocketMessage(socketMsgQueue[i])
      }
      socketMsgQueue = []
    })
    that.globalData.localSocket.onClose(function(res) {
      console.log('close:', res)
    })
    that.globalData.localSocket.onMessage(function(res) {
      console.log('message: ', res)
      var that = this
      var resData = JSON.parse(res.data)
      if (resData.action == "startroomgameres" && resData.status == 0) {
        for (i = 0; i < 4; i++)
          if (resData.data.members[i].openid != that.globalData.openid) {
            openId.push(resData.data.members[i].openid)
            nickName.push(resData.data.members[i].nickName)
            avatarUrl.push(resData.data.members[i].avatarUrl)
          }
      } else if (resData.action == "otherbroadcast"){
        if(resData.content.openid==that.globalData.openid){
          content=resData.content
          if(content.type=="cardInfo"){
            myLoc=content.loc
            cardArrayWhite=content.cardArrayWhite
            cardArrayBlack=content.cardArrayBlack
            this.onLoadAffiliate()
          }
        }
      }
    })
  },
  sendSocketMessage: function(msg) {
    if (socketOpen) {
      this.globalData.localSocket.send({
        data: JSON.stringify(msg)
      })
    } else {
      socketMsgQueue.push(msg)
    }
  },
  globalData: {
    userInfo: null,
    openid: {},
    localSocket: {}
  },
  sendCardInfo(){
    for(let i=0;i<3;i++){
      this.sendSocketMessage({
        "action": "broadcast",
        "roomid": roomId,
        "content": {
          "type":"cardInfo",
          "openid": this.globalData.openid,
          "roomid": roomId,
          "content": {
            "openid": openId[i],
            "loc": i+1,
            "cardArrayWhite": cardArrayWhite,
            "cardArrayBlack": cardArrayBlack
          }
        }
      })
    }
  }
})
let beginTime, showTime //进入时间,倒计时用时间
let playTime, midTime //回合时间，回合中间时间
let playerNum //游戏人数，默认为4
let gameStatus, gameStatus2, guessStatus
let guessPlayerLoc, guessCardName, guessCardTrueName, guessCons //要猜的玩家位置编号,牌的名称,牌的实际名称和结果
let aiMode, playMode, isHost //ai智商,游戏模式
let roomId,myLoc
let openId = new Array(3)
let nickName = new Array(3)
let avatarUrl = new Array(3)
/*gameStatus:当前游戏状态
 **四人时0/1/2/3用于表示自己的状态
 **0表示游戏结束
 **1表示游戏即将开始
 **2表示猜牌中
 **3表示猜牌结束
 **4/5/6/7/8/9用于表示其他人状态，偶数表示猜牌中，奇数表示猜牌结束
 **偶数表示正常，奇数表示在猜牌
 */
let cardArrayWhite = new Array() //总牌组
let cardArrayBlack = new Array() //总牌组
let cardArrayWhiteForBind = new Array()
let cardArrayBlackForBind = new Array()
const app = getApp()
let player = new Array(4)
player[0] = new oneplayer()
player[1] = new oneplayer()
player[2] = new oneplayer()
player[3] = new oneplayer()
let cardNameForBind = new Array(24)
let cardVisibleDict = new Object()
let socketOpen
let socketMsgQueue= new Array()
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
      if (gameStatus == 3) { }
      if (gameStatus == 5) {
        player[1].aiController()
      } else if (gameStatus == 7) {
        player[2].aiController()
      } else if (gameStatus == 9) {
        player[3].aiController()
      }
    } else {
      //todo!
    }
  }
  if (showTime <= 0) {
    if (gameStatus == 2 || gameStatus == 4 || gameStatus == 6 || gameStatus == 8) {
      gameStatus += 1
      if (gameStatus == 3) {
        if (!player[0].gotCard) {
          player[0].getCard(0)
        }
        player[0].gotCard = false
        player[0].guessed = false
      } else if (gameStatus == 5) {
        if (!player[1].gotCard) {
          player[1].getCard(0)
        }
        player[1].gotCard = false
        player[1].guessed = false
      } else if (gameStatus == 7) {
        if (!player[2].gotCard) {
          player[2].getCard(0)
        }
        player[2].gotCard = false
        player[2].guessed = false
      } else if (gameStatus == 9) {
        if (!player[3].gotCard) {
          player[3].getCard(0)
        }
        player[3].gotCard = false
        player[3].guessed = false
      }
      showTime = playTime
    } else {
      if (cardArrayWhite.length <= 0 && cardArrayBlack.length <= 0) gameStatus = 0
      console.log(cardArrayWhite, cardArrayBlack, cardVisibleDict)
      if (gameStatus == 1 || gameStatus == 3 || gameStatus == 5 || gameStatus == 7 || gameStatus == 9) {
        if (gameStatus == 1) {
          player[0].setGotCard(false)
          player[1].setGotCard(false)
          player[2].setGotCard(false)
          player[3].setGotCard(false)
        } else if (gameStatus == 3) {
          if (!player[0].guessed) {
            player[0].failJudge()
          }
        } else if (gameStatus == 5) {
          if (!player[1].guessed) {
            player[1].failJudge()
          }
        } else if (gameStatus == 7) {
          if (!player[2].guessed) {
            player[2].failJudge()
          }
        } else if (gameStatus == 9) {
          if (!player[3].guessed) {
            player[3].failJudge()
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

/*多人游戏流程
 *主机：
 * 与单人模式类似
 * 初始化时向从机根据从机位置发送牌堆情况和玩家实际位置
 * 在changestate中向从机根据从机位置发送showTime和gameStatus
 * 自己的猜牌判定结果和收到猜牌判定结果后根据从机位置处理后根据从机位置转发给其他从机
 *从机：   
 * 与单人模式类似
 * 在接收到主机的牌堆情况后进行牌堆相关的初始化
 * 接收主机发送的showTime和gameStatus来完成changestate中的功能，需要额外记录上次接收的gameStatus来判断是否发生变化（这个方案比较好写且稳定，但由于延迟游戏体验会有一定影响）
 * 自己的猜牌判定结果对自己进行修改后立即发送给主机
 */
function oneplayer() {
  this.cardIndex = new Array()
  this.cardIndexForBind = new Array()
  this.cardVisible = new Array()
  this.playerState = 0
  this.playerName = "jack"
  this.cardNum = 0
  this.lastCardIndex = 0
  this.playerLoc = 0
  this.guessed = true
  this.gotCard = false
}
/*设置姓名
 */
oneplayer.prototype.setName = function(newName) {
  this.playerName = newName
}
/*设置位置
 */
oneplayer.prototype.setLoc = function(newLoc) {
  this.playerLoc = newLoc
}
/*设置gotCard
 */

oneplayer.prototype.setGotCard = function(ifGotCard) {
  this.gotCard = ifGotCard
}
/*抽一张牌
 **0:随机;1:white;2:black
 */
oneplayer.prototype.getCard = function(getCardMod) {
  if (cardArrayWhite.length <= 0 && cardArrayWhite.length <= 0) return
  if (getCardMod != 1 && getCardMod != 2) {
    getCardMod = Math.floor(Math.random() * (2)) + 1
  }
  if (getCardMod == 1 && cardArrayWhite.length <= 0) getCardMod = 2
  if (getCardMod == 2 && cardArrayBlack.length <= 0) getCardMod = 1
  if (getCardMod == 1) {
    this.lastCardIndex = cardArrayWhite.pop()
    cardArrayWhiteForBind = countForBind(cardArrayWhite)
  } else {
    this.lastCardIndex = cardArrayBlack.pop()
    cardArrayBlackForBind = countForBind(cardArrayBlack)
  }
  this.cardIndex.push(this.lastCardIndex)
  this.cardIndexForBind = countForBind(this.cardIndex)
  this.cardVisible.push(false)
  this.cardNum = this.cardNum + 1
  for (let i = 0; i < this.cardNum; i++) { //保持降序，牌数较少就直接冒泡排了
    for (let j = i + 1; j < this.cardNum; j++) {
      if (this.cardIndex[i] % 12 < this.cardIndex[j] % 12 || (this.cardIndex[i] % 12 == this.cardIndex[j] % 12 && this.cardIndex[i] < this.cardIndex[j])) {
        let tmp = this.cardIndex[i]
        this.cardIndex[i] = this.cardIndex[j]
        this.cardIndex[j] = tmp
        let tmp2 = this.cardVisible[i]
        this.cardVisible[i] = this.cardVisible[j]
        this.cardVisible[j] = tmp2
      }
    }
  }
  console.log(this.cardNum, this.cardIndex, this.cardIndexForBind)
  this.gotCard = true
  this.cardIndexForBind = countForBind(this.cardIndex)
}
/*被猜牌
 **guessCardName:猜的牌的名称
 **guessCardTrueName:被猜的牌的真实名称
 */
oneplayer.prototype.guessedJudge = function(guessingCardName, guessingCardTrueName) {
  if (guessingCardTrueName == guessingCardName) {
    for (let i = 0; i < this.cardNum; i++) {
      console.log(i)
      if (this.cardIndexForBind[i] == guessingCardTrueName) {
        this.cardVisible[i] = true
        console.log(i)
        cardVisibleDict[guessingCardTrueName] = true
        break
      }
    }
    return true
  }
  return false
}
/*猜牌成功的情况
 */
oneplayer.prototype.succussJudge = function() {
  showTime = playTime
}
/*猜牌失败的情况
 */
oneplayer.prototype.failJudge = function() {
  for (let i = 0; i < this.cardNum; i++) {
    if (this.cardIndex[i] == this.lastCardIndex) {
      this.cardVisible[i] = true
      cardVisibleDict[cardNameForBind[this.lastCardIndex]] = true
    }
  }
  showTime = 1
}
/*查看是否还有立牌
 */
oneplayer.prototype.haveUnvisibleCard = function() {
  for (let i = 0; i < this.cardNum; i++) {
    if (this.cardVisible[i] == false)
      return true
  }
  return false
}
oneplayer.prototype.aiController = function() {
  if (aiMode == "freshman") {
    //随便找个人随便抽张牌随便猜个数
    do {
      guessPlayerLoc = Math.floor(Math.random() * (4))
    } while (guessPlayerLoc == this.playerLoc)
    guessCardName = cardNameForBind[Math.floor(Math.random() * (24))]
    guessCons = false
    if (guessPlayerLoc == 0) {
      guessCardTrueName = player[0].cardIndexForBind[Math.floor(Math.random() * (player[0].cardNum))]
      guessCons = player[0].guessedJudge(guessCardName, guessCardTrueName)
    } else
    if (guessPlayerLoc == 1) {
      guessCardTrueName = player[1].cardIndexForBind[Math.floor(Math.random() * (player[1].cardNum))]
      guessCons = player[1].guessedJudge(guessCardName, guessCardTrueName)
    } else
    if (guessPlayerLoc == 2) {
      guessCardTrueName = player[2].cardIndexForBind[Math.floor(Math.random() * (player[2].cardNum))]
      guessCons = player[2].guessedJudge(guessCardName, guessCardTrueName)
    } else
    if (guessPlayerLoc == 3) {
      guessCardTrueName = player[3].cardIndexForBind[Math.floor(Math.random() * (player[3].cardNum))]
      guessCons = player[3].guessedJudge(guessCardName, guessCardTrueName)
    }
    if (guessCons == true) {
      this.succussJudge()
    } else {
      this.failJudge()
    }
    guessStatus = 2
    this.guessed = true
  }
}
/*输入一个牌组数组，返回对应的用于数据绑定的数组
 */
function countForBind(oneCardArray) {
  let oneCardArrayForBind = new Array(oneCardArray.length)
  for (let i = 0; i < oneCardArray.length; i++) {
    oneCardArrayForBind[i] = cardNameForBind[oneCardArray[i]]
  }
  return oneCardArrayForBind
}