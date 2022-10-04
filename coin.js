
import {coinFrame, ctx, coinPos, main, zoneCoin, assetListCarRound1, audio} from './variable.js';
let i=0;
let j=0;

function increaseScore(){
        main.score += 1;
        document.querySelector('.score').innerHTML = `: ${main.score} / ${main.maxScore}`;
}
function randomPosCoin(){
        coinPos[0] = Math.random()*(zoneCoin[2] - zoneCoin[0]) + zoneCoin[0];
        coinPos[1] = Math.random()*(zoneCoin[3] - zoneCoin[1]) + zoneCoin[1];
}
function increaseVisionCars(){
    for(let i in assetListCarRound1){
        if(i % 2 == 0){
            assetListCarRound1[i][9]-=3/(main.maxScore);   
        }else{
            assetListCarRound1[i][9]+=3/(main.maxScore); 
        }
    }
}
function coinColissionMain(){
    let Xcoin = coinPos[0];
    let Ycoin = coinPos[1];
    let coinWidth = coinPos[0] + coinFrame[9];
    let coinHeight = coinPos[1] + coinFrame[10];
    let Xmain = main.x;
    let Ymain = main.y;
    let widthMain = main.x + main.width;
    let heightMain = main.y + main.height;
    if(Xcoin >= Xmain && Xcoin <= widthMain && Ycoin >= Ymain && Ycoin <= heightMain){
        handleCoinColissionMain();
    }else if(coinWidth >= Xmain && coinWidth <= widthMain && Ycoin >= Ymain && Ycoin <= heightMain){
        handleCoinColissionMain();
    }else if(Xcoin >= Xmain && Xcoin <= widthMain && coinHeight >= Ymain && coinHeight <= heightMain){
        handleCoinColissionMain();
    }else if(Xmain >= Xcoin && Xmain <= coinWidth && coinHeight >= Ymain && coinHeight <= heightMain){
        handleCoinColissionMain();
    }
}
function handleCoinColissionMain(){
    if(main.score < main.maxScore){
        randomPosCoin();
        increaseScore();
        increaseVisionCars();
        if(audio.coin != ''){
            let coinAudio = new Audio(audio.coin.src);
            coinAudio.play();
            coinAudio.volume = audio.coin.volume;
            coinAudio.muted = audio.coin.muted;
        }
    }
}
function drawCoin(x, y){
    j++;
    if(j % 10 == 0){
        i++;
    }else if(i > coinFrame.length-5){
        i = 0;
    }
    if(main.score < main.maxScore){
        ctx.beginPath();
        ctx.drawImage(coinFrame[i][0], coinFrame[i][1], coinFrame[i][2], coinFrame[i][3], coinFrame[i][4], x, y, coinFrame[9], coinFrame[10]);
        ctx.rect(x, y, coinFrame[9], coinFrame[10]);
        ctx.stroke();
        ctx.closePath();
    }
};

export {drawCoin, randomPosCoin, coinColissionMain};