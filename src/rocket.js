import { Howl } from 'howler'

export default class Rocket extends PIXI.Container {

    constructor(game) {
        super();

        this.game = game;

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

        TweenMax.to(this.rocket, 4, {
            y: -10,
            ease: Power1.easeIn,
            onComplete: this.enableUserControl.bind(this)
        });

        this.playSound(0, 1.2);
    }

    enableUserControl() {

        console.log('enable hotkeys');

        document.addEventListener('keydown', function(event) {
            if (event.code == 'ArrowLeft' && !this.leftTicker) {
                this.leftTicker = new PIXI.ticker.Ticker();
                this.leftTicker.start();
                this.leftTicker.add(() => {
                    this.rocket.position.x -= 6;
                    if (this.rocket.rotation >= -0.5) {
                        this.rocket.rotation -= 0.05;
                    }
                });
            }
            if (event.code == 'ArrowRight' && !this.rightTicker) {
                this.rightTicker = new PIXI.ticker.Ticker();
                this.rightTicker.start();
                this.rightTicker.add(() => {
                    this.rocket.position.x += 6;
                    if (this.rocket.rotation <= 0.5) {
                        this.rocket.rotation += 0.05;
                    }
                });
            }
        }.bind(this));

        document.addEventListener('keyup', function(event) {
            if (event.code == 'ArrowLeft') {
                this.leftTicker.destroy();
                delete this.leftTicker;
            }
            if (event.code == 'ArrowRight') {
                this.rightTicker.destroy();
                delete this.rightTicker;
            }

            TweenMax.to(this.rocket, 0.4, {
                rotation: 0,
                ease: Power1.easeIn
            });
        }.bind(this));

        this.game.createBonus();

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