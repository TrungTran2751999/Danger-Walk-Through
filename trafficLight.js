import {trafficLight, ctx, main} from './variable.js';
let frameTrafiicLight =  trafficLight.yellow;
let i=0;
let j=0;

function drawTrafficLight(){
    if(main.score == main.maxScore){
        frameTrafiicLight = trafficLight.green;
    }else{
        if(main.y + main.height <= 70){
            frameTrafiicLight = trafficLight.red;
        }else{
            frameTrafiicLight = trafficLight.yellow;
        }
    }
    j++;
    if(j % 50 == 0){
        i++
    }
    if(i>1){
        i=0;
        j=1;
    }
    ctx.drawImage(trafficLight.img, frameTrafiicLight[i][0], frameTrafiicLight[i][1], frameTrafiicLight[i][2],
        frameTrafiicLight[i][3], trafficLight.x, trafficLight.y, trafficLight.width, trafficLight.height)
    ctx.stroke();
    ctx.closePath();
}
export {drawTrafficLight};