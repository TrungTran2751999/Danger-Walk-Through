let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let image = document.getElementById('source');
let imageEnemy = document.getElementById('source-enemy');
let main = {
    width: 132,
    height: 148,
    x: 0,
    y: 0,
    imgX: 0,
    imgY: 0,
    dx: 4,
    dy:2,
    moveRight: false,
    moveLeft: false,
    directRight: true,
    directLeft: false,
    isAtack: false,
    isDeath: false,
    isGround: true,
};
let floor = {
    width: canvas.width/2,
    height: 28.44,
}
let ground = {
    x: 0,
    y: 480,
    width: canvas.width,
    height:20,
};
let distanceFloor = main.height/1.5;
let floorList = [
    [0, distanceFloor, floor.width, floor.height],
    [floor.width, distanceFloor*2 + floor.height  ,floor.width, floor.height],
    [0, distanceFloor*3 + floor.height*2, floor.width, floor.height],
];
let enemy = {
    assetImgX: 0,
    assetImgY: 0,
    widthAsset: 144,
    heightAsset: 160,
    x: canvas.width-146/1.5,
    y: 160/1.5 + 20,
    width: 144/1.5,
    height: 160/1.5,
    directLeft: false,
    directRight: true,
    isDeath: false,
    isFury: false,
    isAtack: false,
    dx: 1,
    dy: 2
    
};
export {main, floor, ground, canvas, ctx, image, imageEnemy, floorList, distanceFloor, enemy}