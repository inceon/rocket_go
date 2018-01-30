export default class Rocket extends PIXI.Container {

    constructor() {
        super();

        this.speed = 1;

        this.speedUp = 0.1;
        this.ticker = new PIXI.ticker.Ticker();
        this.ticker.start();

        this.draw();
        this.loadSounds();
    }

    draw() {
        let rocket = new PIXI.Sprite(PIXI.loader.resources['rocket'].texture);

            rocket.name = 'rocket';
            rocket.anchor.set(0.5, 1);
            rocket.position.set(
                app.renderer.width / 2,
                app.renderer.height / 1.3 + 25
            );

        this.rocket = rocket;
        this.addChild(rocket);
    }

    loadSounds() {
        this.sounds = [
            new Howl({
                src: ['assets/audio/rocket_launch.wav'],
                volume: 0.2
            })
        ];
    }

    run() {
        this.addFire();

        this.ticker.add(function () {
            this.rocket.position.y -= this.speed;
            this.speed += this.speedUp;

            if (this.rocket.position.y + this.rocket.height < 0) {
                this.ticker.stop();
            }
        }.bind(this));

        this.playSound(0, 1.2);
    }

    addFire() {
        let fireTextures = [];
        for(let i = 1; i <= 50; i++) {
            let texture = PIXI.Texture.fromFrame('fire1_ ' + i + '.png');
            fireTextures.push(texture);
        }

        let fire = new PIXI.extras.AnimatedSprite(fireTextures);

        fire.name = 'fire';
        fire.anchor.set(0.5, 0.75);
        fire.rotation = 3.1;
        fire.scale.set(0.76);

        this.fire = fire;
        this.fire.play();
        this.rocket.addChild(fire);

    }

    playSound(ind, rate, callback) {
        this.sounds[ind].rate(rate);
        this.sounds[ind].play();

        this.sounds[ind].on('end', callback);
    }
}