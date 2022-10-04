import {time, main} from './variable.js';
let i=0;
function resetTime(){
    time.seconds = 0;
    time.minutes = 0;
    time.hours = 0;
    time.timeCount = 0;
    document.querySelector('.time').innerHTML = '00:00:00';
}
function countTime(){
    if(main.isGameClear == false && main.isGameOver == false){
        i++;
        if(i % 60 == 0){
            time.seconds += 1;
            time.timeCount+= 1
            if(time.seconds == 60){
                time.minutes += 1; 
                time.seconds=0;
            }
        }
        document.querySelector('.time').innerHTML =` ${time.minutes < 10 ? '0' + time.minutes : time.minutes}:
                                                     ${time.seconds < 10 ? '0' + time.seconds : time.seconds}<br>
                                                    `;
    }else{
        i=0;
    }
}
export {countTime, resetTime}; 