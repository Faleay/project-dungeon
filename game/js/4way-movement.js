// Ссылки на элементы
var character = document.querySelector(".character");
var map = document.querySelector(".map");

// Состояние персонажа
var x = 0;
var y = 0;
var held_directions = []; // Состояние нажатия клавиш движения

var speed = 1.2; // Скорость передвижения персонажа по карте

const placeCharacter = () => {

    var pixelSize = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
    );

    const held_direction = held_directions[0];
    if (held_direction) {
        if (held_direction === directions.right) { x += speed; }
        if (held_direction === directions.left) { x -= speed; }
        if (held_direction === directions.down) { y += speed; }
        if (held_direction === directions.up) { y -= speed; }
        character.setAttribute("facing", held_direction)
    }
    character.setAttribute("walking", held_direction ? "true" : "false");

    var camera_left = pixelSize * 66;
    var camera_top = pixelSize * 42;

    map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${-y * pixelSize + camera_top}px, 0)`;
    
    character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize}px, 0)`;
}

// Бесконечный цикл игры
const step = () => {
    placeCharacter();
    window.requestAnimationFrame(() => {
        step();
    })
}
step(); // Первый шаг

const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
}

const keys = {
    38: directions.up,
    37: directions.left,
    39: directions.right,
    40: directions.down,
}
document.addEventListener("keydown", (e) => {
    var dir = keys[e.which];
    if(dir && held_directions.indexOf(dir) === -1) {
        held_directions.unshift(dir)
    }
})

document.addEventListener("keyup", (e) => {
    var dir = keys[e.which];
    var index = held_directions.indexOf(dir);
    if(index > -1) {
        held_directions.splice(index, 1)
    }
})