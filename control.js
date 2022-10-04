import {restartPlaying} from './main.js'
import {main, assetListCarRound1, audio} from './variable.js';
import {countTime} from './time.js';
let audioCoin = audio.coin.src;
let audioGameClear = audio.gameClear.src;
let audioGameOver = audio.gameOver.src;

let elementStart = document.querySelector('.start');
let elementOption = document.querySelector('.option');
let elementBack = document.querySelector('.back');
let elementLevelYes = document.querySelector('.yes-button');
let elementLevelNo = document.querySelector('.no-button');
let elementRestartYes = document.querySelector('.restart-button');
let elementQuitYes = document.querySelector('.quit-button');
let elementQuitGame = document.querySelector('.quit');
let elementResumeQuitShow = document.querySelector('.resume-gaming');
let elementOutQuitShow = document.querySelector('.quit-gaming');
let elementPauseGame = document.querySelector('.pause');
let elementContinueGaming = document.querySelector('.continue-gaming');

let elementAudio = document.querySelector('.audio');

function startingGame(){
    elementStart.addEventListener('click',()=>{
        startGame();
    });
}
function openingOptionView(){
    elementOption.addEventListener('click',()=>{
        openOptionView();
    });
}
function changingLevel(){
    elementBack.addEventListener('click',()=>{
        levelChange();
    })
};
function notAgreeChangeLevel(){
    elementLevelNo.addEventListener('click',()=>{
        noChangeLevel();
    })
}
function agreeChangeLevel(){
    elementLevelYes.addEventListener('click',()=>{
        let checked = document.getElementsByName('radio-option');
        for(let i=0; i < checked.length; i++){
            checked[i].checked ? main.maxScore = Number(checked[i].value) :'';
        }
        yesChangeLevel();
    })
}
function quitGame(){
    elementQuitYes.addEventListener('click',()=>{
        restartPlaying();
        exitGame();
    });
    document.getElementsByClassName('quit-button ')[1].addEventListener('click',()=>{
        restartPlaying();
        exitGame();
    })
}
function restartGame(){
    elementRestartYes.addEventListener('click',()=>{
        restartPlaying();
    })
    document.getElementsByClassName('restart-button')[1].addEventListener('click',()=>{
        restartPlaying();
    })
}
function showQuitGameDialog(){
        elementQuitGame.addEventListener('click',()=>{
            document.getElementById('show-dialog-game').style.display = 'block';
            document.getElementById('show-dialog-pause').style.display = 'none';
            pauseGame();
        })
        elementResumeQuitShow.addEventListener('click',()=>{
            document.getElementById('show-dialog-game').style.display = 'none';
            document.getElementById('hoursglass').src = './image/client/hourglass.gif';
            resumeGame();
            document.getElementById('backgroundMusic').pause();
        })
        elementOutQuitShow.addEventListener('click', ()=>{
            document.getElementById('show-dialog-game').style.display = 'none';
            exitGame();
            restartPlaying();
            document.getElementById('backgroundMusic').pause();
        })
}
function showPauseGamDialog(){
    elementPauseGame.addEventListener('click',()=>{
        document.getElementById('show-dialog-pause').style.display = 'block';
        document.getElementById('show-dialog-game').style.display = 'none';
        pauseGame();
    })
    elementContinueGaming.addEventListener('click', ()=>{
        document.getElementById('show-dialog-pause').style.display = 'none';
        resumeGame();
    })
}
function switchAudio(idMute, idPlay, audioObj){
    document.getElementById(idMute).addEventListener('click', ()=>{
        audio[audioObj].muted = false;
        document.getElementById(idMute).style.display = 'none';
        document.getElementById(idPlay).style.display = 'block';
    });
    document.getElementById(idPlay).addEventListener('click', ()=>{
        audio[audioObj].muted = true;
        document.getElementById(idMute).style.display = 'block';
        document.getElementById(idPlay).style.display = 'none';
    });
}
function showAudioDialog(){
    elementAudio.addEventListener('click', ()=>{
        document.getElementById('show-dialog-audio').style.display = 'block';
        pauseGame();
    })
}
function switchBackGroundAudio(){
    document.getElementById('backgroundPlay').addEventListener('click', ()=>{
        document.getElementById('backgroundMusic').muted = true;
        document.getElementById('backgroundPlay').style.display = 'none';
        document.getElementById('backgroundMute').style.display = 'block';
    })
    document.getElementById('backgroundMute').addEventListener('click', ()=>{
        document.getElementById('backgroundMusic').muted = false;
        document.getElementById('backgroundPlay').style.display = 'block';
        document.getElementById('backgroundMute').style.display = 'none';
    })
}
function showInfoHistory(){
    document.querySelector('.history').addEventListener('click', ()=>{
        document.getElementById('history-view').style.display = 'block';
        document.getElementById('begin-view').style.display = 'none';
    });
    document.querySelector('.cancel-history-dialog').addEventListener('click', ()=>{
        document.getElementById('history-view').style.display = 'none';
        document.getElementById('begin-view').style.display = 'block';
    })

}
function showGuinessScore(){
    document.querySelector('.info').addEventListener('click', ()=>{
        document.getElementById('show-dialog-guiness').style.display = 'block';
        let levels = document.getElementsByName('radio-option');
        for(let i in levels){
            if(levels[i].checked == true){
                let name = levels[i].getAttributeNames()[3];
                let guiness = levels[i].getAttribute(name);
                let dataGuiness = '';
                let stringDialog = '';
                if(localStorage.getItem('guiness'+ guiness) != null){
                    dataGuiness = JSON.parse(localStorage.getItem('guiness'+ guiness));
                    stringDialog = `Guiness Score <br>
                                    ${dataGuiness.timeMinutes < 10 ? '0'+ dataGuiness.timeMinutes:dataGuiness.timeMinutes} -
                                    ${dataGuiness.timeSeconds < 10 ? '0'+ dataGuiness.timeSeconds:dataGuiness.timeSeconds}s
                                    <div style="font-size: 30px">at ${dataGuiness.nowTime}</div>`
                }else{
                    stringDialog = "Let's break record";
                }
                document.querySelector('.title-guiness-dialog').innerHTML = stringDialog;
            }
        }
        pauseGame();
    })
    document.querySelector('.close-guiness').addEventListener('click', ()=>{
        document.getElementById('show-dialog-guiness').style.display = 'none';
        resumeGame();
    })
}
// define function------------------------------------------------------------
function startGame(){
    document.getElementById('begin-view').style.display = 'none';
    document.getElementById('playing-view').style.display = 'block';
    document.querySelector('.score').innerHTML = `: 0/${main.maxScore} `;
    document.getElementById('hoursglass').src = './image/client/hourglass.gif';
    restartPlaying();
    playBackgroundMusic();
}
function openOptionView(){
    document.getElementById('begin-view').style.display = 'none';
    document.getElementById('option-view').style.display = 'block';
}
function levelChange(){
    document.getElementById('level').style.display = 'block';
    document.getElementById('list-button-option').style.display = 'none';
}
function noChangeLevel(){
    document.getElementById('level').style.display = 'none';
    document.getElementById('list-button-option').style.display = 'block';
}
function yesChangeLevel(){
    document.getElementById('begin-view').style.display = 'block';
    document.getElementById('option-view').style.display = 'none';
    document.getElementById('level').style.display = 'none';
    document.getElementById('list-button-option').style.display = 'block';
}
function exitGame(){
    document.getElementById('begin-view').style.display = 'block';
    document.getElementById('playing-view').style.display = 'none';
    document.getElementById('backgroundMusic').pause();
}
function pauseGame(){
    document.getElementById('hoursglass').src = './image/client/hourglass.png';
    document.getElementById('backgroundMusic').pause();
    main.isGameOver = true;
    for(let car of assetListCarRound1){
        car[10] = true;
    }
}
function resumeGame(){
    document.getElementById('hoursglass').src = './image/client/hourglass.gif';
    document.getElementById('backgroundMusic').play();
    main.isGameOver = false;
    for(let car of assetListCarRound1){
        car[10] = false;
    }
}
function disableShowButton(){
    if((main.isGameOver || main.isGameClear)){
        document.getElementById('list-real-button').style.display = 'none';
        document.getElementById('list-fake-button').style.display = 'block';
    }else{
        document.getElementById('list-real-button').style.display = 'block';
        document.getElementById('list-fake-button').style.display = 'none';
    }
}
function controlVolume(){
    document.querySelector('.audio-game').addEventListener('click', ()=>{
        let backgroundMusic = document.getElementById('backgroundMusic');
        let backgroundVolume = Number(document.getElementById('backgroundVolume').value)/100;
        let coinAudio = Number(document.getElementById('coinVolume').value)/100;
        let gameOverAudio = Number(document.getElementById('gameOverVolume').value)/100;
        let gameClearAudio = Number(document.getElementById('gameClearVolume').value)/100;
        backgroundMusic.volume = backgroundVolume;
        audio.coin.volume = coinAudio;
        audio.gameOver.volume = gameOverAudio;
        audio.gameClear.volume = gameClearAudio;
        document.getElementById('show-dialog-audio').style.display = 'none';
        resumeGame();
    })
}
function playBackgroundMusic(){
   document.getElementById('backgroundMusic').play();
};
export {startingGame, openingOptionView, changingLevel, notAgreeChangeLevel, 
        agreeChangeLevel, exitGame, quitGame, restartPlaying, restartGame, showQuitGameDialog, 
        showPauseGamDialog, disableShowButton, switchAudio, showAudioDialog, controlVolume, playBackgroundMusic,
        switchBackGroundAudio, showInfoHistory, showGuinessScore};