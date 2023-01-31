var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 480;
document.appendChild(canvas);

// Основной цикл игры
var lastTime;
function main() {
    var now = Date.now;
    var dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;
    requestAnimationFrame(main);
}

var img = new Image();
img.onload = function() {
    startGame();
};
img.src = url;