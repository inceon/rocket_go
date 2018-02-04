import * as PIXI from "pixi.js"
import Rocket from "./rocket";

export default class Game extends PIXI.Container {
    constructor(app) {
        super();
        this.app = app;
        this.ticker = new PIXI.ticker.Ticker();
        this.ticker.start();

        this.setup();

    }

    setup() {
        this.drawClouds();
        this.drawGrass();
        this.drawPlatform();

        this.addChild(
            this.clouds,
            this.grass,
            this.platform
        );

        setTimeout(() => {
            this.rocket = new Rocket();
            this.addChild(this.rocket);
        }, 500);

        let { app } = this;

        //Create the cat sprite
        let cat = new PIXI.Sprite(PIXI.loader.resources['cat'].texture);

        //Add the cat to the stage
        this.addChild(cat);

        cat.scale.set(0.3);
        cat.position.set(0, app.renderer.height - cat.height / 1.55);
        cat.revert = 1;

        TweenMax.to(cat, 12, {
            x: app.renderer.width - cat.width,
            repeat: -1,
            yoyo: true,
            ease: Power2.easeInOut
        });
    }

    drawClouds() {
        let cloudsTexture = [
            new PIXI.Texture(
                PIXI.loader.resources['clouds'].texture,
                new PIXI.Rectangle(165, 150, 215, 105)
            ),
            new PIXI.Texture(
                PIXI.loader.resources['clouds'].texture,
                new PIXI.Rectangle(390, 150, 220, 95)
            ),
            new PIXI.Texture(
                PIXI.loader.resources['clouds'].texture,
                new PIXI.Rectangle(185, 265, 375, 60)
            ),
        ];

        this.clouds = new PIXI.Container();

        let cloudCount = 5;
        for(let i = 0; i < cloudCount; i++) {
            let tempSprite = new PIXI.Sprite(
                cloudsTexture.choice()
            );

            tempSprite.position.set(
                Math.random() * app.renderer.width,
                Math.random() * (app.renderer.height - 400)
            );

            this.clouds.addChild(tempSprite);
        }

    }

    drawGrass() {
        let grass = new PIXI.extras.TilingSprite(
            PIXI.loader.resources['grass'].texture,
            512,
            512
        );

        grass.tileScale.set(0.45);
        grass.width = app.renderer.width;
        grass.position.y = app.renderer.height / 1.25;

        this.grass = grass;
    }

    drawPlatform() {
        let platformTexture = PIXI.loader.resources['platform'].texture;
        let platform = new PIXI.Sprite(
            platformTexture
        );

        platform.anchor.x = 0.4;
        platform.position.set(
            app.renderer.width / 2 - 20,
            app.renderer.height / 1.3
        );

        this.platform = platform;

        this.drawButtons();
    }

    drawButtons() {
        let startButton = new PIXI.Sprite(
            PIXI.loader.resources['runGreen'].texture
        );

        startButton.name = 'button';
        startButton.scale.set(0.25);
        startButton.position.set(
            0,
            42
        );
        startButton.interactive = true;
        startButton.buttonMode  = true;

        startButton.pointerdown = function () {
            let buttonRedTexture = PIXI.loader.resources['runRed'].texture;

            this.startButton.setTexture(buttonRedTexture);
            this.startButton.interactive = false;
            this.rocket.run();

            TweenMax.to(this, 5, {
                y: app.renderer.height
            });

        }.bind(this);

        this.platform.addChild(startButton);
        this.startButton = startButton;
    }

}