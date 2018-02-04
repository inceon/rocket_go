Array.prototype.choice = function () {
    return this[Math.floor(Math.random() * this.length)]
};

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function randomFloat(min, max) {
    return Math.random() * (max - min + 1) + min;
}

export {
    randomInt,
    randomFloat
}