Array.prototype.choice = function () {
    return this[Math.floor(Math.random() * this.length)]
};

export default function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}