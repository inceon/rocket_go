import * as PIXI from "pixi.js"
import Rocket from "./rocket";

export default class Game extends PIXI.Container {
    constructor(app) {
        super();
        this.app = app;
        this.ticker = new PIXI.ticker.Ticker();
        this.ticker.start();

        this.loadSprites();

    }

    loadSprites() {
        PIXI.loader
            .add('cat'	     , 'assets/img/mini_squish_siamese_7_design.png')
            .add('grass'       , 'assets/img/grass.png')
            .add('platform'    , 'assets/img/plataforma.png')
            .add('clouds'      , 'assets/img/clouds.svg')
            .add('rocket'      , 'assets/img/rocket.png')
            .add('runGreen'    , 'assets/img/buttons/Levelgreen-min.png')
            .add('runRed'      , 'assets/img/buttons/Levelreoundred-min.png')
            .add('fireSprites' , 'assets/img/fire/fire.json')
            .load(this.setup.bind(this));
    }

    setup() {
        this.drawClouds();
        this.drawGrass();
        this.drawPlatform();

        this.rocket = new Rocket();
        this.addChild(
            this.clouds,
            this.grass,
            this.platform,
            this.rocket
        );

        let { app } = this;

        //Create the cat sprite
        let cat = new PIXI.Sprite(PIXI.loader.resources['cat'].texture);

        //Add the cat to the stage
        this.addChild(cat);

        cat.scale.set(0.4);
        cat.position.set(500, app.renderer.height - cat.height / 1.55);
        cat.revert = 1;

        this.ticker.add(() => {
            if ( cat.position.x  > app.renderer.width ) {
                cat.revert = -1;
            } else if (cat.position.x < 0) {
                cat.revert = 1;
            }
            cat.position.x += cat.revert * 2;
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
        }.bind(this);

        this.platform.addChild(startButton);
        this.startButton = startButton;
    }

}