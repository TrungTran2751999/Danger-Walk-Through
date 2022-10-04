import {main, time} from './variable.js';
let stopCount=0;
let arrRadio = document.getElementsByName('radio-option');
class newHistory{
    constructor(timeCount, timeMinutes, timeSeconds, nowTime, level){
        this.timeCount = timeCount;
        this.timeMinutes = timeMinutes;
        this.timeSeconds = timeSeconds;
        this.nowTime = nowTime;
        this.level = level;
    }
}

function convertSingleTime(time){
    if(time < 10){
        return `0${time}`;
    }else{
        return `${time}`;
    }
}
function guinessScore(level){
    if(level == 'Easy'){
        return 'guinessEasy';
    }else if(level == 'Hard'){
        return 'guinessHard';
    }else{
        return 'guinessDifficult';
    }
}
function updateTimePlay(){
    if(main.isGameClear){
        stopCount++;
        if(stopCount == 1){
            let level ='';
            for(let i in arrRadio){
                if(arrRadio[i].checked == true){
                    console.log(arrRadio[i])
                    let name = arrRadio[i].getAttributeNames()[3];
                    console.log(name)
                    level = (arrRadio[i].getAttribute(name));
                }
            }
            let date = new Date();
            let nowTime = `${date.getDate()+'-'+ (date.getMonth()+1)+'-'+date.getFullYear()+'-'
                            +convertSingleTime(date.getHours())+':'+convertSingleTime(date.getMinutes())+':'+convertSingleTime(date.getSeconds())}`;
            let listTime = new newHistory(time.timeCount, time.minutes, time.seconds, nowTime, level);

            if(localStorage.getItem('historyPlaying') == null){
                localStorage.setItem('historyPlaying', JSON.stringify([listTime]));
                localStorage.setItem(guinessScore(level), JSON.stringify(listTime));
            }else{
                let arr = JSON.parse(localStorage.getItem('historyPlaying'));
                let updateGuiness = JSON.parse(localStorage.getItem(guinessScore(level)));

                arr.unshift(listTime);
                if(localStorage.getItem(guinessScore(level))!=null){
                    if(time.timeCount < updateGuiness.timeSeconds){
                        localStorage.setItem(guinessScore(level), JSON.stringify(listTime));
                    }
                    if(arr.length > 8){
                        arr.splice(arr.length-1, 1);
                    }
                    localStorage.setItem('historyPlaying', JSON.stringify(arr));
                }else{
                    localStorage.setItem(guinessScore(level), JSON.stringify(listTime));
                }
            }
            document.querySelector('.alert-score').innerHTML = `Time playing: 
                                                              ${time.minutes < 10 ? '0'+time.minutes : time.minutes}:
                                                              ${time.seconds < 10 ? '0'+time.seconds : time.seconds}`;
            renderHistory();
        }
    }else{
        stopCount = 0;
    }
}
function renderHistory(){
    document.querySelector('#history-view table tbody').innerHTML = ''
    if(localStorage.getItem('historyPlaying') != null){
        let history = JSON.parse(localStorage.getItem('historyPlaying'));
        history.map((history, index)=>{
            let updating = `<tr>
                                <td>${index+1}</td>
                                <td>
                                    ${history.timeMinutes < 10 ?'0'+history.timeMinutes:history.timeMinutes} -
                                    ${history.timeSeconds < 10 ?'0'+history.timeSeconds+'s':history.timeSeconds +'s'}
                                </td>
                                <td>${history.level}</td>
                                <td>${history.nowTime}</td>
                            </tr>`;
        document.querySelector('#history-view table tbody').insertAdjacentHTML('beforeend', updating)
        })
    }
}
export {updateTimePlay};