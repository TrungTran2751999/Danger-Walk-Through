import * as control from './control.js';
import {resetTime} from './time.js';
import {canvas, ctx, imageMain, assetListMain, main, imageBackGround, assetListCarRound1, 
        bankPos, coinFrame, coinPos, zoneCoin, zonePos, audio} from './variable.js';
let i=0;
let j=0;
let a=0;
let mainDx = main.dx;
let mainDy = main.dy;
let status = assetListMain.up;
    document.addEventListener('keydown',(event)=>{
            if(event.key =='ArrowLeft'){
                main.isDown = false;
                main.isUp = false;
                main.isRight = false;
                main.isLeft = true;
            }if(event.key =='ArrowRight'){
                main.isDown = false;
                main.isUp = false;
                main.isRight = true;
                main.isLeft = false;
            }if(event.key =='ArrowDown'){
                main.isDown = true;
                main.isUp = false;
                main.isRight = false;
                main.isLeft = false;
            }if(event.key =='ArrowUp'){
                main.isDown = false;
                main.isUp = true;
                main.isRight= false;
                main.isLeft = false;
            }
    });
    document.addEventListener('keyup',(event)=>{
        if(event.key =='ArrowLeft'){
            main.isMove = false;
            main.isLeft = false;
        }if(event.key =='ArrowRight'){
            main.isMove = false;
            main.isRight = false;
        }if(event.key =='ArrowDown'){
            main.isMove = false;
            main.isDown = false;
        }if(event.key =='ArrowUp'){
            main.isMove = false;
            main.isUp = false
        }
    });
function mainMoveLeft(){
    if(main.isLeft && main.isGameOver == false && main.isGameClear == false){
        main.x -= main.dx;
        main.isMove = true;
        status = assetListMain.left;
    }
}
function mainMoveRight(){
    if(main.isRight && main.isGameOver == false && main.isGameClear == false){
        main.x += main.dx;
        main.isMove = true;
        status = assetListMain.right;
    }
}
function mainMoveUp(){
    if(main.isUp && main.isGameOver == false && main.isGameClear == false){
        main.isRight = false;
        main.isLeft = false;
        main.y -= mainDy;
        main.isMove = true;
        status = assetListMain.up;
    }
}
function mainMoveDown(){
    if(main.isDown && main.isGameOver == false && main.isGameClear == false){
        main.y += mainDy;
        main.isMove = true;
        status = assetListMain.down;
    }
}
function restartPlaying(){
        main.x = 250;
        main.y = 440;
        main.score = 0;
        main.isGameOver = false;
        main.isGameClear = false;
        main.isMove = false;
        document.querySelector('.score').innerHTML = ` :${main.score}/${main.maxScore} `
        for(let i in assetListCarRound1){
            assetListCarRound1[i][10] = false;
            assetListCarRound1[i][5] = zonePos[i][0];
            assetListCarRound1[i][6] = zonePos[i][1];
            if(i % 2 == 0){
                assetListCarRound1[i][9] = -1;
            }else{
                assetListCarRound1[i][9] = 1;
            } 
        }
        status = assetListMain.up;
        main.isUp = false;
        main.isLeft = false;
        main.isRight = false;
        main.isDown = false;

        document.getElementById('dialog-game-over').style.display = 'none';
        document.getElementsByClassName('imgGameOver')[0].classList.remove('showOver');
        document.getElementsByClassName('dialog-over')[0].style.display = 'none';

        document.getElementById('dialog-game-clear').style.display = 'none';
        document.getElementsByClassName('imgGameClear')[0].classList.remove('showClear');
        document.getElementsByClassName('dialog-clear')[0].style.display = 'none';

        resetTime();
        a=0;
        document.getElementById('backgroundMusic').play(); 
}   
function mainClearGame(){
    if(main.y + main.height <= 70 && main.score == main.maxScore){
            a++;
            main.isGameClear = true;
            if(main.isGameClear && a==1){
            document.getElementById('dialog-game-clear').style.display = 'block';
            setTimeout(()=>{
                document.getElementsByClassName('imgGameClear')[0].classList.add('showClear'); 
            },400);
            setTimeout(()=>{
                document.getElementsByClassName('dialog-clear')[0].style.display = 'block';
            },4000)
                let gameClearAudio = new Audio(audio.gameClear.src);
                gameClearAudio.play();
                gameClearAudio.volume = audio.gameClear.volume;
                gameClearAudio.muted = audio.gameClear.muted;
            control.quitGame();
            control.restartGame();
            document.getElementById('backgroundMusic').pause();
        }
    }
}
function mainGameOver(){
    a++;
    main.isGameOver = true;
    if(main.isGameOver && a==1){
        document.getElementById('dialog-game-over').style.display = 'block';
        setTimeout(()=>{
            document.getElementsByClassName('imgGameOver')[0].classList.add('showOver'); 
        },50);
        setTimeout(()=>{
            document.getElementsByClassName('dialog-over')[0].style.display = 'block';
        },4000);
            let gameOverAudio = new Audio(audio.gameOver.src);
            gameOverAudio.play();
            gameOverAudio.volume = audio.gameOver.volume;
            gameOverAudio.muted = audio.gameOver.muted;
        control.quitGame();
        control.restartGame();
        document.getElementById('backgroundMusic').pause(); 
    };
}
function mainCollisionBank(){
    for(let i in bankPos){
        let widthMain = main.x + main.width;
        let heightMain = main.y + main.height;
        let widthBank = bankPos[i][0] + bankPos[i][2];
        let heightBank = bankPos[i][1] + bankPos[i][3];

        if((widthBank > widthMain && bankPos[i][0] < widthMain) && heightBank > heightMain && bankPos[i][1] < heightMain  && main.isRight){
            mainDx = 0;
            do{
                main.x -=2;
            }while(widthBank < widthMain && bankPos[i][0] > widthMain);
            break;
        }
        else if((main.x < widthBank && main.x > bankPos[i][0]) && heightBank > heightMain && bankPos[i][1] < heightMain  && main.isLeft){
            mainDx = 0;
            do{
                main.x +=2;
            }while(main.x > widthBank && main.x < bankPos[i][0]);
            break;
        }
        else if((heightMain > bankPos[i][1] && heightMain < heightBank) && (widthBank > widthMain && bankPos[i][0] < widthMain) && main.isDown){
            mainDy = 0;
            do{
                main.y -=2;
            }while(heightMain < bankPos[i][1] && heightMain > heightBank);
            break;
        }
        else if((main.y < heightBank && main.y > bankPos[i][1]) && (widthBank > widthMain && bankPos[i][0] < widthMain) && main.isUp){
            mainDy = 0;
            do{
                main.y +=2;
            }while(main.y > heightBank && main.y < bankPos[i][1]);
            break;
        }
    }
}
function mainColissionLimit(){
    if(main.x <= 0 && main.isLeft){
        mainDx = 0;
        do{
            main.x += 4;
        }while(main.x + main.width >= canvas.width);
    }else{
        mainDx = main.dx;
    }
    if(main.x + main.width >= canvas.width && main.isRight){
        mainDx = 0;
        do{
            main.x -= 4;
        }while(main.x <= 0);
    }else{
        mainDx = main.dx;
    }
    if(main.y + main.height >= canvas.height && main.isDown){
        mainDy = 0;
        do{
            main.y-=4;
        }while(main.y <= 0);
    }else{
        mainDy = main.dy;
    }
    if((main.y <= 0 && main.isUp)){
        mainDy = 0;
        do{
            main.y+=4;
        }while(main.y + main.height >= canvas.height)
    }
}
function drawMain(){
    j = j + 1
    if(j % 10 == 0){
        if(main.isMove == true){
            i++;
            if(i > 3){
                i= 0;
            }
        }else{
            i=0;
        }
    }
    ctx.beginPath();
        ctx.drawImage(imageMain, status[i][0], status[i][1], status[i][2], status[i][3], main.x, main.y, main.width, main.height);
    ctx.closePath();
}
function drawBank(){
    for(let i=0; i<bankPos.length; i++){
        ctx.beginPath();
        ctx.rect(bankPos[i][0], bankPos[i][1], bankPos[i][2], bankPos[i][3]);
    }
}
requestAnimationFrame(drawMain)
export {drawMain, mainColissionLimit, mainCollisionBank, mainClearGame, mainGameOver, 
        mainMoveLeft, mainMoveRight, mainMoveUp, mainMoveDown, drawBank, restartPlaying}