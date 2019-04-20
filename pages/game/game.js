const app = getApp()
Page({
  data: {
    playerInfo_1: {
      // avatarUrl: "https://i.postimg.cc/Hsdbtpbh/blackjoker.jpg",
      avatarUrl: "/images/head.jpg",
      nickname: "玩家一",
    },
    playerInfo_2: {
      avatarUrl: "https://i.postimg.cc/Hsdbtpbh/blackjoker.jpg",
      nickname: "玩家2",
    },
    playerInfo_3: {
      avatarUrl: "https://i.postimg.cc/Hsdbtpbh/blackjoker.jpg",
      nickname: "玩家3",
    },
    playerInfo_4: {
      avatarUrl: "https://i.postimg.cc/Hsdbtpbh/blackjoker.jpg",
      nickname: "玩家4",
    },

    white_wait: ["white0", "white1", "white2", "white3", "white4", "white5", "white6", "white7", "white8", "white9", "white10", "white11"],
    black_left: ["black0", "black5", "black6", "black7", "black8", "black9", "blackjoker"],
    black_wait: ["black0", "black1", "black2", "black3", "black4", "black5", "black6", "black7", "black8", "black9", "black10", "black11"],
    black_left: ["black0", "black1", "black2", "black3", "black4", "black5", "black6", "black7", "black8", "black9", "black10", "black11", "blackjoker", ],

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
    isGameEnd: false,
    gameEndText: "",

    Player_turn: 4,
    Left_time: 10,
  },
  /*刷新牌组显示
   */

  onLoad(option) {
    console.log(app.globalData)
    let that = this
    beginTime = 2 //游戏开始前等待时间
    showTime = 5 //用于显示的当前状态剩余时间
    playTime = 10 //游戏内回合时间
    midTime = 5 //回合间等待时间
    playerNum = 4 //玩家人数
    gameStatus = 0 //游戏进行状态
    guessStatus = 0
    aiMode = "freshman" //ai难度
    playMode = option.playMode //游戏模，sigle是单人模式，multi是好友对战
    roomId = option.roomId
    myLoc = Number(option.myLoc)
    console.log(option)
    if (myLoc == 0) {
      isHost = true
    } else {
      isHost = false
    }
    openId = ["000", "123", "456", "789"]
    nickName = ["me", "player1", "player2", "player3"]
    cardNameForBind = ["white0", "white1", "white2", "white3", "white4", "white5", "white6", "white7", "white8", "white9", "white10", "white11", "black0", "black1", "black2", "black3", "black4", "black5", "black6", "black7", "black8", "black9", "black10", "black11"]
    for (let i = 0; i < cardNameForBind.length; i++) {
      cardVisibleDict[cardNameForBind[i]] = false
    }
    if (isHost || playMode == "single") {
      changeState()
      cardArrayWhite = shuffleSwap(createArray(12)) //洗牌
      cardArrayBlack = shuffleSwap(createArray(12))
      randomArray = shuffleSwap(createArray(48))
      for (let i = 0; i < randomArray.length; i++) {
        randomArray[i] = randomArray[i] % 2 + 1
      }
      console.log(app.globalData, playMode, isHost)
      if (playMode == "multi" && isHost) {
        app.sendSocketMessage({
          "action": "getroominfo",
          "data": {
            "openid": app.globalData.openid,
            "roomid": roomId
          }
        })
      }
      console.log(cardArrayWhite, cardArrayBlack, randomArray)
      if (playMode == "multi") this.sendCardInfo()
      for (let i = 0; i < cardArrayBlack.length; i++) cardArrayBlack[i] += 12
      cardArrayWhiteForBind = countForBind(cardArrayWhite)
      cardArrayBlackForBind = countForBind(cardArrayBlack)
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
      player1_cards: player[(0 + myLoc) % 4].cardIndexForBind,
      player2_cards: player[(1 + myLoc) % 4].cardIndexForBind,
      player3_cards: player[(2 + myLoc) % 4].cardIndexForBind,
      player4_cards: player[(3 + myLoc) % 4].cardIndexForBind,
      white_left: cardArrayWhiteForBind,
      black_left: cardArrayBlackForBind,
      cards_dict: cardVisibleDict,
      Player_turn: gameStatus >= 2 ? (Math.floor(gameStatus / 2) - 1 - myLoc + 4) % 4 + 1 : (-myLoc + 4) % 4 + 1,
      Left_time: showTime
    })
    this.refreshCardBind()
  },
  onLoadAffiliate: function() {
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
      player1_cards: player[(0 + myLoc) % 4].cardIndexForBind,
      player2_cards: player[(1 + myLoc) % 4].cardIndexForBind,
      player3_cards: player[(2 + myLoc) % 4].cardIndexForBind,
      player4_cards: player[(3 + myLoc) % 4].cardIndexForBind,
      white_left: cardArrayWhiteForBind,
      black_left: cardArrayBlackForBind,
      cards_dict: cardVisibleDict,
      Player_turn: gameStatus >= 2 ? (Math.floor(gameStatus / 2) - 1 - myLoc + 4) % 4 + 1 : (-myLoc + 4) % 4 + 1,
      Left_time: showTime
    })
  },
  refreshCardBind: function(e) {
    var that = this
    var i = setInterval(function() {
      that.setData({
        player1_cards: player[(0 + myLoc) % 4].cardIndexForBind,
        player2_cards: player[(1 + myLoc) % 4].cardIndexForBind,
        player3_cards: player[(2 + myLoc) % 4].cardIndexForBind,
        player4_cards: player[(3 + myLoc) % 4].cardIndexForBind,
        white_left: cardArrayWhiteForBind,
        black_left: cardArrayBlackForBind,
        cards_dict: cardVisibleDict,
        Player_turn: gameStatus >= 2 ? (Math.floor(gameStatus / 2) - 1 - myLoc + 4) % 4 + 1 : (-myLoc + 4) % 4 + 1,
        Left_time: showTime
      })
      if (gameStatus == 3 + myLoc * 2) {
        that.setData({
          Ismyturn: true
        })
      } else {
        that.setData({
          Ismyturn: false,
          state_judge: false
        })
      }
      if (gameStatus == 0) {
        that.setData({
          isGameEnd: true
        })
        if (winnerLoc == -1) {
          that.setData({
            gameEndText: "游戏结束"
          })
        } else {
          that.setData({
            gameEndText: "游戏结束，胜者是" + openId[winnerLoc]
          })
        }
      }
      if (isHost) {
        that.sendStateInfo()
      }
    }, 500)
  },
  onReady(e) {

  },
  cardTouchEnd: function(e) { //之后配合前端进行修改
    if (gameStatus != 3 + myLoc * 2) return
    let buttonId = e.target["id"]
    guessPlayerLoc = Number(buttonId[6]) - 1 //分别表示点击的玩家编号的牌的编号
    guessCardTrueName = buttonId.substring(7, buttonId.length) //之后配合前端进行修改
    console.log("cardTouchEnd:")
    console.log(guessPlayerLoc)
    console.log(myLoc)
    if (!player[(guessPlayerLoc + myLoc) % 4].visible(guessCardTrueName)) {
      this.setData({
        Isstandedcardchose: true
      })
    }
  },
  cardArrayTouchEnd: function(e){
    if(gameStatus!=2+myLoc*2)return
    if(player[myLoc].gotCard)return
    if(playMode=="single"){
      console.log(e.target)
      player[myLoc].getCard(e.target.id[5]=='w'?1:2)
    }
  },
  listSelectEnd: function(e) { //之后配合前端进行修改
    if (gameStatus != 3 + myLoc * 2) return
    guessCons = false
    let buttonId = e.target["id"]
    guessCardName = buttonId
    console.log(guessPlayerLoc, guessCardName, guessCardTrueName)
    if (guessPlayerLoc > 3 || guessPlayerLoc < 0) {
      console.error("guessPlayerLoc out of range!")
      return
    }
    guessCons = player[(guessPlayerLoc + myLoc) % 4].guessedJudge(guessCardName, guessCardTrueName) //获取猜牌结果
    if (playMode == "single") { //单人模式直接判断
      if (guessCons == true) {
        player[myLoc].successJudge()
        this.setData({
          Isjudgeright: true
        })
      } else {
        player[myLoc].failJudge()
        this.setData({
          Isjudgeright: false
        })
      }
    } else if (playMode == "multi") { //多人模式将结果发给其他所有玩家
      if (guessCons == true) {
        player[myLoc].successJudge()
        this.setData({
          Isjudgeright: true
        })
      } else {
        player[myLoc].failJudge()
        this.setData({
          Isjudgeright: false
        })
      }
      this.sendGuessInfo()
    }
    console.log(guessCons)
    guessStatus = 2
    player[myLoc].guessed = true
    this.setData({
      Isstandedcardchose: false,
      state_judge: true
    })
  },
  endMyTurn: function(e) {
    showTime = 1
  },
  onShow() {
    var that = this
    wx.onSocketMessage(function(res) {
      var resData = JSON.parse(res.data)
      console.log('mssage: ', resData)
      console.log(resData.action)
      that.solveMessage(resData)
    })
  },
  solveMessage: function(resData) {
    var that = this
    if (resData.action == "getroominfores") { //不知道服务器会不会反复尝试发送直到成功？如果不是的话这种处理手段有接收不到的风险
      let j = 0
      for (let i = 0; i < resData.data.members.length; i++)
        if (resData.data.members[i].openid != app.globalData.openid) {
          openId[j] = resData.data.members[i].openid
          nickName[j] = resData.data.members[i].nickName
          avatarUrl[j] = resData.data.members[i].avatarUrl
          j += 1
        } else {
          openId[j] = app.globalData.userInfo.openid
          nickName[j] = app.globalData.userInfo.nickName
          avatarUrl[j] = app.globalData.userInfo.avatarUrl
          j += 1
        }

    } else if (resData.action == "otherbroadcast") {
      console.log("otherbroadcast loaded in")
      let content = resData.data.content
      console.log("otherbroadcast loaded")
      if (content.type == "cardInfo") {
        console.log("cardinfo loaded")
        cardArrayWhite = content.cardArrayWhite
        cardArrayBlack = content.cardArrayBlack
        randomArray = content.randomArray
        that.onLoadAffiliate()
      } else if (content.type == "guessInfo") {
        let playerLoc = content.playerLoc
        guessPlayerLoc = content.guessPlayerLoc
        guessCardName = content.guessCardName
        guessCardTrueName = content.guessCardTrueName
        guessCons = content.guessCons
        player[guessPlayerLoc].guessedJudge(guessCardName, guessCardTrueName)
        if (guessCons) {
          player[playerLoc].successJudge()
        } else {
          player[playerLoc].failJudge()
        }
      } else if (content.type == "stateInfo") {
        if (!isHost) {
          if (gameStatus != content.gameStatus) solveStateChange()
          gameStatus = content.gameStatus
          showTime = content.showTime
        }
      }
    } else if (resData.action == "loginres") {
      app.globalData.openid = resData.data.openid
    } else {
      console.log("no entry message")
    }
  },
  sendCardInfo: function() { //发送牌堆信息，只有主机可以调用
    if (myLoc != 0) {
      console.error("the cardInfo is not sent by host player!")
      return
    }
    app.sendSocketMessage({
      "action": "broadcast",
      "data": {
        "openid": app.globalData.openid,
        "roomid": roomId,
        "content": {
          "type": "cardInfo",
          "cardArrayWhite": cardArrayWhite,
          "cardArrayBlack": cardArrayBlack,
          "randomArray": randomArray
        }
      }
    })
  },
  sendGuessInfo: function() { //发送猜牌信息
    app.sendSocketMessage({
      "action": "broadcast",
      "data": {
        "openid": app.globalData.openid,
        "roomid": roomId,
        "content": {
          "type": "guessInfo",
          "playerLoc": myLoc,
          "guessPlayerLoc": guessPlayerLoc,
          "guessCardName": guessCardName,
          "guessCardTrueName": guessCardTrueName,
          "guessCons": guessCons,
        }
      }
    })
  },
  sendStateInfo: function() { //发送状态信息
    app.sendSocketMessage({
      "action": "broadcast",
      "data": {
        "openid": app.globalData.openid,
        "roomid": roomId,
        "content": {
          "type": "stateInfo",
          "gameStatus": gameStatus,
          "showTime": showTime
        }
      }
    })
  }
})
let beginTime, showTime //进入时间,倒计时用时间
let playTime, midTime //回合时间，回合中间时间
let playerNum //游戏人数，默认为4
let gameStatus, gameStatus2, guessStatus
let guessPlayerLoc, guessCardName, guessCardTrueName, guessCons //要猜的玩家位置编号,牌的名称,牌的实际名称和结果
let aiMode, playMode, isHost //ai智商,游戏模式
let roomId, myLoc
let openId = new Array(4)
let nickName = new Array(4)
let avatarUrl = new Array(4)
/*gameStatus:当前游戏状态
 **四人时0/1/2/3用于表示自己的状态
 **0表示游戏结束
 **1表示游戏即将开始
 **2表示准备回合
 **3表示游戏回合
 **4/5/6/7/8/9用于表示其他人状态，偶数表示准备回合，奇数表示游戏回合
 **偶数表示正常，奇数表示在猜牌
 */
let cardArrayWhite = new Array() //总牌组
let cardArrayBlack = new Array() //总牌组
let cardArrayWhiteForBind = new Array()
let cardArrayBlackForBind = new Array()
let randomArray = new Array() //随机数数组
let player = new Array(4)
player[0] = new oneplayer()
player[1] = new oneplayer()
player[2] = new oneplayer()
player[3] = new oneplayer()
let cardNameForBind = new Array(24)
let cardVisibleDict = new Object()
let winnerLoc //赢家的位置
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
  console.log(showTime, gameStatus)
  if (gameStatus < 0 || gameStatus > 9) {
    console.error("gameStatus out of range in ChangeState()")
  }
  if (gameStatus != 0 && gameStatus != 1 && ifGameEnd()) { //判断游戏是否结束，若结束，进入游戏结束处理
    gameStatus = 0
    wx.navigateTo({
      url: '../gameover/gameover',
    })
    return
  }
  if (guessStatus > 0) {
    guessStatus -= 1
  } else {
    if (playMode == "single") { //单机模式对于其他位置使用ai控制
      if (playerNum == 4) {
        if (gameStatus == 3) {
          if (myLoc != 0) player[0].aiController()
        } else if (gameStatus == 5) {
          if (myLoc != 1) player[1].aiController()
        } else if (gameStatus == 7) {
          if (myLoc != 2) player[2].aiController()
        } else if (gameStatus == 9) {
          if (myLoc != 3) player[3].aiController()
        }
      } else if(playMode=="multi"){
        if (gameStatus == 3) {
          if(!player[0].haveUnvisibleCard()){
            player[0].endMyTurn()
          }
        } else if (gameStatus == 5) {
          if (!player[1].haveUnvisibleCard()) {
            player[1].endMyTurn()
          }
        } else if (gameStatus == 7) {
          if (!player[2].haveUnvisibleCard()) {
            player[2].endMyTurn()
          }
        } else if (gameStatus == 9) {
          if (!player[3].haveUnvisibleCard()) {
            player[3].endMyTurn()
          }
        }
      }
    }
  }
  if (showTime <= 0) { //每调用一次，计时器减1
    solveStateChange()
    gameStatus += 1
    if (gameStatus == 10) {
      gameStatus = 2
    }
  }
  let timer = setTimeout(changeState, 1000) //定时器，每隔左面那个数的毫秒执行一次
}

function solveStateChange() {
  if (gameStatus == 2 || gameStatus == 4 || gameStatus == 6 || gameStatus == 8) { //玩家游戏回合，摸牌
    if (!player[Math.floor(gameStatus / 2) - 1].gotCard) { /* 若玩家自己未抽牌，系统帮着抽一张*/
      player[Math.floor(gameStatus / 2) - 1].getCard(0)
    }
    player[Math.floor(gameStatus / 2) - 1].gotCard = false /*回复状态*/
    player[Math.floor(gameStatus / 2) - 1].guessed = false
    showTime = playTime
  } else {
    if (gameStatus == 1 || gameStatus == 3 || gameStatus == 5 || gameStatus == 7 || gameStatus == 9) { //1为游戏开始，其他为玩家中间回合，修复状态
      if (gameStatus == 1) { //游戏开始
        player[0].setGotCard(false)
        player[1].setGotCard(false)
        player[2].setGotCard(false)
        player[3].setGotCard(false)
      } else {
        if (!player[Math.floor(gameStatus / 2) - 1].guessed) { /*若没猜牌，视为猜牌失败 */
          player[Math.floor(gameStatus / 2) - 1].failJudge()
        }        
      }
      showTime = midTime
    }
  }
}

function ifGameEnd() {
  let emptyPlayerNum = 0
  let leftPlayer
  for (let i = 0; i < playerNum; i++) {
    if (!player[i].haveUnvisibleCard()) {
      emptyPlayerNum += 1
    } else {
      leftPlayer = i
    }
  }
  if (emptyPlayerNum > playerNum - 1) {
    console.error("emptyPLayerNum more than expected!")
  }
  if (emptyPlayerNum == playerNum - 1) {
    winnerLoc = leftPlayer
    return true
  }
  return false
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
 * 自己的猜牌判定结果和收到猜牌判定结果后处理后转发给其他玩家
 *从机：   
 * 与单人模式类似
 * 在接收到主机的牌堆情况后进行牌堆相关的初始化
 * 接收主机发送的showTime和gameStatus来完成changestate中的功能（这个方案比较好写且稳定，但由于延迟游戏体验会有一定影响）
 * 自己的猜牌判定结果和收到猜牌判定结果后处理后转发给其他玩家
 * 
 * 尽量保证发送方在发送前已经对信息针对接收方进行处理
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
    getCardMod = randomArray.pop()
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
  console.log("getcard",this.lastCardIndex)
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
      if (this.cardIndexForBind[i] == guessingCardTrueName) {
        this.cardVisible[i] = true
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
oneplayer.prototype.successJudge = function() {
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
/*查看某张牌是否已经明牌 
 */
oneplayer.prototype.visible = function(cardTrueName) {
  for (let i = 0; i < this.cardNum; i++) {
    if (this.cardIndexForBind[i] == cardTrueName)
      return this.cardVisible[i]
  }
  console.error("not find assigned cardName in oneplayer.visible!")
}
oneplayer.prototype.aiController = function() {
  if(!this.haveUnvisibleCard){//已经没有立牌，则直接结束回合
    this.endMyTurn()
    return
  }
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
      this.successJudge()
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