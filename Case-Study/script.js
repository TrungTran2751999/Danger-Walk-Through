import * as ground from './ground.js';
import * as main from './main.js';
import * as floor from './floor.js';
import * as enemy from './enemy.js'
import {canvas, ctx} from './variable.js'
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    main.drawMain();
    main.mainMoving();
    main.mainAttack();
    main.mainDeath();
    main.mainCollisionFloor();
    main.mainCollisionLimit();
    main.checkMainOnGround();
    main.mainAttackEnemy();

    enemy.drawEnemyMale();
    enemy.enemyMoving();
    enemy.enemyDead();
    enemy.enemyCollisionLimit();
    enemy.enemyAttack();
    enemy.enemyFury();
    enemy.enemyDetectMain();
    enemy.enemyAttackMain();

    floor.drawFloor();
    ground.drawGround();
    
    requestAnimationFrame(draw);
}
draw()

