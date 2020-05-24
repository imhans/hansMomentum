const body = document.querySelector("body");

const IMG_NUMBER = 5;

function showBackground(imgNumber) {
    const img = new Image();
    img.classList.add("bgImage");
    img.src = `/images/${imgNumber + 1}.jpg`;
    body.prepend(img);
}

function init() {
    const number = getRandomInt(IMG_NUMBER);
    showBackground(number);
}
init();

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}