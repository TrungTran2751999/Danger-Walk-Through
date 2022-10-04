import * as main from './main.js';
import * as car from './car.js';
import * as coin from './coin.js';
import * as control from './control.js';
import * as trafficLight from './trafficLight.js';
import * as time from './time.js';
import * as score from './score.js';
//controling game

control.changingLevel();
control.notAgreeChangeLevel();
control.agreeChangeLevel();
control.openingOptionView();
control.startingGame();
control.showQuitGameDialog();
control.showPauseGamDialog();
control.switchAudio('coinMute', 'coinPlay', 'coin');
control.switchAudio('gameOverMute', 'gameOverPlay', 'gameOver');
control.switchAudio('gameClearMute', 'gameClearPlay', 'gameClear');
control.switchBackGroundAudio();
control.controlVolume();
control.showAudioDialog();
control.showInfoHistory();
control.showGuinessScore();
import {assetListCarRound1, coinPos, ctx, audio} from './variable.js';

//Phần engine của game
function engine(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    main.mainColissionLimit();
    main.mainCollisionBank();
    main.mainClearGame();
    main.mainMoveLeft();
    main.mainMoveRight();
    main.mainMoveDown();
    main.mainMoveUp();
    main.drawBank();

    time.countTime();

    car.drawCar(assetListCarRound1);
    car.carMove(assetListCarRound1);
    car.carColissionLimit(assetListCarRound1);
    car.carColissionMain(assetListCarRound1);
    car.stopMainCollisionCar(assetListCarRound1);

    coin.coinColissionMain();
    coin.drawCoin(coinPos[0], coinPos[1]);

    trafficLight.drawTrafficLight();
    main.drawMain();

    control.disableShowButton();
    score.updateTimePlay();
    requestAnimationFrame(engine);
}
engine();
function renderHistory(){
    let updating = '';
    if(localStorage.getItem('historyPlaying') != null){
        let history = JSON.parse(localStorage.getItem('historyPlaying'));
        history.map((history, index)=>{
            updating = `<tr>
                            <td>${index+1}</td>
                            <td>
                                ${history.timeMinutes < 10 ?'0'+history.timeMinutes:history.timeMinutes}-
                                ${history.timeSeconds < 10 ?'0'+history.timeSeconds:history.timeSeconds}
                            </td>
                            <td>${history.level}</td>
                            <td>${history.nowTime}</td>
                        </tr>`;
        document.querySelector('#history-view table tbody').insertAdjacentHTML('beforeend', updating)
        })
    }else{
        updating = `<tr>
                        <td>0</td>
                        <td>Empty</td>
                        <td>Empty</td>
                        <td>Empty</td>
                    </tr>`;
        document.querySelector('#history-view table tbody').insertAdjacentHTML('beforeend', updating)
    }
}
renderHistory()
export{renderHistory};


