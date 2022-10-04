import * as player from './main.js';
import {zonePos, assetListCarRound1, ctx, main} from './variable.js';
let mainDy = main.dy;
let mainDx = main.dx;
function drawCar(assetListCar){
    for(let i=0; i<assetListCar.length; i++){
        ctx.beginPath();
        ctx.drawImage(assetListCar[i][0], assetListCar[i][1], assetListCar[i][2], assetListCar[i][3],
                    assetListCar[i][4], assetListCar[i][5], assetListCar[i][6], assetListCar[i][7],
                    assetListCar[i][8]);
        ctx.closePath();
    }
}
function carMove(assetListCar){
    for(let i=0; i<assetListCar.length; i++){
        if(assetListCar[i][10] == false){
            assetListCar[i][5]+=assetListCar[i][9];
        }else{
            assetListCar[i][5]+=0;
        }
    }
}
function stopMainCollisionCar(assetListCar){
    for(let i in assetListCar){
        let footCar = assetListCar[i][6] + assetListCar[i][8];
        let headCar = assetListCar[i][6];
        let leftCar = assetListCar[i][5];
        let rightCar = assetListCar[i][5] + assetListCar[i][7];
        let dk1 =  (main.x >= leftCar && main.x <= rightCar);
        let dk2 = main.x + main.width >= leftCar && main.x + main.width <= rightCar;
        let dk3 = main.y - 8 <= footCar && main.y - 8 >= headCar;
        let dk4 = main.y + main.height + 8 >= headCar && main.y + main.height + 8 <= footCar;
        if((dk1 && dk3 && main.isUp) || (dk2 && dk3 && main.isUp)){
            main.dy = 0;
            break;
        }else{
            main.dy = mainDy;
        }
        if((dk1 && dk4 && main.isDown) || (dk2 && dk4 && main.isDown)){
            main.dy = 0;
            break;
        }else{
            main.dy = mainDy;
        }
    }
}   
function carColissionMain(assetListCar){
    for(let i in assetListCar){
        let footerBodyMain =  main.y + main.height;
        let footerBodyCar = assetListCar[i][6] + assetListCar[i][8];
        let dkX1 = assetListCar[i][5] + assetListCar[i][7] >= main.x && assetListCar[i][5] + assetListCar[i][7] <= main.x +main.width;
        let dkX2 = assetListCar[i][5] >= main.x && assetListCar[i][5] <= main.x +main.width;
        let dkY = footerBodyMain < footerBodyCar && footerBodyMain > assetListCar[i][6];
        if((dkX1 && dkY) || (dkX2 && dkY)){
                assetListCar[i][10] = true;
                player.mainGameOver();
           }
        }
}
function carColissionLimit(assetListCar){
    for(let i in assetListCar){
        if(i % 2 ==0 ){
            if(assetListCar[i][5] + assetListCar[i][7] <= 0){
                assetListCar[i][5] = zonePos[i][0];
            }
        }else{
            if(assetListCar[i][5] >= zonePos[i][0]){
                assetListCar[i][5] = -assetListCar[i][7];
            }
        }

    }
}
export {drawCar, carMove, carColissionLimit, carColissionMain, stopMainCollisionCar};