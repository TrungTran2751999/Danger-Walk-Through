import {main, floor, ground, canvas, ctx, image, imageEnemy, floorList, distanceFloor, enemy} from './variable.js';
let defaultWidthAssetEnemy = enemy.widthAsset;
let enemyDx = enemy.dx;
let mainDy = main.dy;
function enemyMoving(){
    if(enemy.directRight && enemy.isAtack == false){
        enemy.x += enemy.dx;
        enemy.assetImgY = 0;
    }else if(enemy.directLeft && enemy.isAtack == false){
        enemy.x -= enemy.dx;
        enemy.assetImgY = 160;
    }
}
function enemyCollisionLimit(){
    if(enemy.x+ enemy.width >= floorList[1][0] + floorList[1][2]){
        enemy.directLeft = true;
        enemy.directRight = false;
    }else if(enemy.x <= floorList[1][0]){
        enemy.directRight = true;
        enemy.directLeft = false;
    }
}
function enemyDetectMain(){
    if(main.dy == 0){
        if((enemy.directLeft && main.x <= enemy.x) && Math.floor(main.y - enemy.y) == -1 || 
            (enemy.directRight && main.x >= enemy.x && Math.floor(main.y - enemy.y) == -1)){
            enemy.isFury = true;
        }else{
            enemy.isFury = false;
        }
    }
}
function enemyAttackMain(){
    if(main.dy == 0){
        if(enemy.directLeft && enemy.x > main.x && enemy.x < main.x + main.width/1.5-50 && Math.abs(Math.floor(main.y - enemy.y)) == 1 ){
            enemy.isAtack = true;
            main.isDeath = true;
        }
        if(enemy.directRight && main.x < enemy.x + enemy.width -50 && main.x > enemy.x && Math.abs(Math.floor(main.y - enemy.y)) == 1){
            enemy.isAtack = true;
            main.isDeath = true;
        }
    }
}
function enemyFury(){
    if(enemy.isFury){
        enemy.dx = enemyDx * 2;
    }
}
function enemyAttack(){
    if(enemy.isAtack){
        enemy.dx = 0;
        if(enemy.directRight){
            enemy.assetImgY = 320;
        }else if(enemy.directLeft){
            enemy.assetImgY = 320 + 160;
        }
    }else{
        enemy.dx = enemyDx;
        if(enemy.directRight){
            enemy.assetImgY = 0;
        }else if(enemy.directLeft){
            enemy.assetImgY = 160;
        }
    }
}
function enemyDead(){
    if(enemy.isDeath == true && enemy.directRight == true){
        enemy.assetImgY = 650;
        enemy.widthAsset = 209;
        enemy.heightAsset = 190;
        enemy.width = enemy.widthAsset/1.5;
        enemy.height = enemy.heightAsset/1.5;
        enemy.dx = 0;
    }else if(enemy.isDeath == true && enemy.directLeft == true){
        enemy.assetImgY = 840; 
        enemy.widthAsset = 209;
        enemy.heightAsset = 190;
        enemy.width = enemy.widthAsset/1.5;
        enemy.height = enemy.heightAsset/1.5;
        enemy.dx = 0;
    }
}
function drawEnemyMale(){
    ctx.beginPath();
    ctx.drawImage(imageEnemy, enemy.assetImgX, enemy.assetImgY, enemy.widthAsset, enemy.heightAsset, enemy.x, enemy.y, enemy.width, enemy.height);
    ctx.closePath();
};
function statusEnemy(){
    let i=0;
    let v=100;
    if(enemy.isDeath){
        v=150;
    }
    setInterval(()=>{
        enemy.assetImgX  = enemy.widthAsset * i;
        i++;
        if(i >=10){
            if(enemy.isDeath == false){
                i = 0;
            }else{
                i = 9;
            }
        }
    },v);

};
requestAnimationFrame(statusEnemy);
export {drawEnemyMale, enemyMoving, statusEnemy, enemyDead, enemyCollisionLimit, enemyAttack, enemyFury, enemyDetectMain, enemyAttackMain};