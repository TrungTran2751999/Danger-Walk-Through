let canvas = document.getElementById('canvas');
let imageMain = document.getElementById('main-image');
let imageBackGround = document.getElementById('background');
let coin = document.getElementById('coin');
let car1 = document.getElementById('car1');
let car2 = document.getElementById('car2');
let car3 = document.getElementById('car3');
let car4 = document.getElementById('car4');
let car5 = document.getElementById('car5');
let imgTrafficLight = document.getElementById('traffic-light');
let ctx = canvas.getContext('2d');
let trafficLight = {
   img: imgTrafficLight,
   red: [[0, 2, 51, 270], [67, 1, 52, 271]],
   green: [[271, 0, 53, 272], [339, 0, 52, 273]],
   yellow: [[136, 1, 53, 272], [203, 1, 53, 272]],
   x: 327,
   y:15,
   width: 53/4.4,
   height: 272/4.4
}

let assetListMain = {
    down: [[11, 15, 39, 49], [74, 11, 40, 53], [139, 14, 40, 50], [202, 12, 42, 51]],
    left: [[10, 76, 39, 52], [77, 76, 38, 51], [141, 76, 38, 51], [204, 77, 41, 50]],
    right:[[11, 138, 37, 54], [78, 139, 37, 52], [141, 138, 38, 53], [205, 138, 40, 53]],
    up: [[12, 203, 38, 54], [78, 202, 36, 56], [142, 203, 37, 55], [207, 203, 37, 54]]
}
let zonePos = [
    [canvas.width, 100],
    [canvas.width, 163],
    [canvas.width, 221],
    [canvas.width, 286],
    [canvas.width, 348],
];
let bankPos = [
    [3, 2, 173, 78],
    [325, 0, 173, 78],
    [1, 437, 173, 78],
    [324, 440, 175, 59]
];
let zoneCoin = [21, 102, 457, 316];
let coinPos = [Math.random()*(zoneCoin[2] - zoneCoin[0]) + zoneCoin[0], Math.random()*(zoneCoin[3] - zoneCoin[1]) + zoneCoin[1]]
let coinFrame=[
    [coin, 23, 25, 145, 147],
    [coin, 183, 23, 156, 150],
    [coin, 352, 22, 145, 150],
    [coin, 482, 22, 144, 152],
    [coin, 591, 20, 121, 156],
    [coin, 684, 18, 137, 158],
    [coin, 796, 15, 173, 159],
    [coin, 945, 14, 189, 160],
    [coin,1121, 15, 168, 159],
    25,25
];
let dx = 1;
let ratio = 1.15;
let isStop;
let assetListCarRound1 = [
    [car1, 0, 0, car1.width, car1.height, zonePos[0][0], zonePos[0][1], car1.width/ratio, car1.height/ratio, -dx, isStop = false],
    [car2, 0, 0, car2.width, car2.height, zonePos[1][0], zonePos[1][1], car2.width/ratio, car2.height/ratio, dx, isStop = false],
    [car3, 0, 0, car3.width, car3.height, zonePos[2][0], zonePos[2][1], car3.width/ratio, car3.height/ratio, -dx, isStop = false],
    [car4, 0, 0, car4.width, car4.height, zonePos[3][0], zonePos[3][1], car4.width/ratio, car4.height/ratio, dx, isStop = false],
    [car5, 0, 0, car5.width, car5.height, zonePos[4][0], zonePos[4][1], car5.width/ratio, car5.height/ratio, -dx, isStop = false],
];
let main = {
    x: 250,
    y: 440,
    width: 38.5/1.25,
    height: 50/1.25,
    isLeft: false,
    isDown: false,
    isUp: false,
    isRight: false,
    isDeath: false,
    dx: 2,
    dy: 2,
    isMove: false,
    isGameOver : false,
    isGameClear: false,
    score: 0,
    maxScore: Number(document.getElementsByName('radio-option')[0].value),
}
let time = {
    minutes: 0,
    seconds: 0,
    timeCount:0,
    
}
let audio = {
    coin:{
        src: './audio/coin.mp3',
        volume: 1,
        muted: false,
    },
    gameClear:{
        src: './audio/gameClear.mp3',
        volume: 1,
        muted: false,
    },
    gameOver: {
        src: './audio/gameOver.mp3',
        volume: 1,
        muted: false,
    },
}
export {canvas, ctx, imageMain, assetListMain, 
        main, imageBackGround, assetListCarRound1, zonePos, bankPos, 
        coinFrame, coinPos, zoneCoin, trafficLight, time, audio};