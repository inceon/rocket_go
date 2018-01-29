import * as PIXI from "pixi.js";
import { Howl } from 'howler'
import {randomInt} from "./helpers";

document.addEventListener("DOMContentLoaded", function(event){
	
	let main = document.getElementById('main');
	let width = window.innerWidth;
	let height = window.innerHeight;

	let app = new PIXI.Application({ 
	    width: width, 
	    height: height,
	    antialias: true, 
	    transparent: false, 
	    resolution: 1
	  }
	);

	var sound = new Howl({
	  src: ['assets/audio/rocket_launch.wav'],
	  volume: 0.5
	});

	window.app = app;

	app.renderer.backgroundColor = 0x81c9f9;
	app.renderer.view.style.position = "absolute";
	app.renderer.view.style.display = "block";
	app.renderer.autoResize = true;
	app.renderer.resize(window.innerWidth, window.innerHeight);

	main.appendChild(app.view);

	PIXI.loader
	  .add('cat'	     , 'assets/img/mini_squish_siamese_7_design.png')
	  .add('grass'       , 'assets/img/grass.png')
	  .add('platform'    , 'assets/img/plataforma.png')
	  .add('clouds'      , 'assets/img/clouds.svg')
	  .add('rocket'      , 'assets/img/rocket.png')
	  .add('runGreen'    , 'assets/img/buttons/Levelgreen-min.png')
	  .add('runRed'      , 'assets/img/buttons/Levelreoundred-min.png')
	  .add('fireSprites' , 'assets/img/fire/fire.json')
	  .load(setup);

	function drawClouds() {
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

		let cloudCount = 5;
		for(let i = 0; i < cloudCount; i++) {
			let tempSprite = new PIXI.Sprite(
				cloudsTexture.choice()
			);

			tempSprite.position.set(
				Math.random() * width,
				Math.random() * (height - 400)
			);

			app.stage.addChild(tempSprite);
		}
	}

	function drawGrass() {
		let grassSprite = new PIXI.extras.TilingSprite(
			PIXI.loader.resources['grass'].texture, 
			512, 
			512
		);

		grassSprite.tileScale.set(0.45);
		grassSprite.width = width;
		grassSprite.position.y = height / 1.25;

		app.stage.addChild(grassSprite);
	}

	function startRocket(platform) {
		let rocket = platform.getChildByName('rocket');
		let fire = rocket.getChildByName('fire');
		
		fire.play();
		fire.visible = true;	

		const ticker = new PIXI.ticker.Ticker();
		ticker.stop();
		rocket.speed = 1;
		ticker.add(() => {
		  	rocket.position.y -= rocket.speed;
		  	rocket.speed += 0.1;

		  	if (rocket.position.y + rocket.parent.position.y < 0) {
		  		ticker.destroy();
		  		rocket.destroy();
		  		fire.destroy();

		  		setTimeout(() => {
	  				drawRocket(platform);
		  		}, 1200);
		  	}
		});
		ticker.start();
		sound.rate(1.2);
		sound.play();

	}

	function drawRocket(platform) {
		let rocket = new PIXI.Sprite(PIXI.loader.resources['rocket'].texture);

		rocket.name = 'rocket';
		rocket.anchor.set(0.5, 1);
		rocket.position.set(
			18,
			25
		);
		platform.addChild(rocket);

		let fireTextures = [];
		for(let i = 1; i <= 50; i++) {
			let texture = PIXI.Texture.fromFrame('fire1_ ' + i + '.png');
         	fireTextures.push(texture);
		}

        var fire = new PIXI.extras.AnimatedSprite(fireTextures);

        fire.name = 'fire';
        fire.anchor.set(0.5, 0.75);
        fire.rotation = 3.1;
        fire.scale.set(0.76);
        fire.visible = false;

        rocket.addChild(fire);

		let startButton = platform.getChildByName('button');
        startButton.setTexture(PIXI.loader.resources['runGreen'].texture);
  		startButton.interactive = true;	
	}

	function drawButtons(platform) {
		let buttonRedTexture   = PIXI.loader.resources['runRed'].texture;

		let buttonSprite = new PIXI.Sprite();

		buttonSprite.name = 'button';

		buttonSprite.scale.set(0.25)
		buttonSprite.position.set(
			0,
			42
		);
		buttonSprite.interactive = true;
		buttonSprite.buttonMode  = true;

		buttonSprite.pointerdown = function () {
			this.setTexture(buttonRedTexture);
			this.interactive = false;
			startRocket(platform);
		};
		platform.addChild(buttonSprite);
	}

	function drawPlatform() {
		let platformTexture = PIXI.loader.resources['platform'].texture;
		let platformSprite = new PIXI.Sprite(
			platformTexture
		);

		platformSprite.anchor.x = 0.4;
		platformSprite.position.set(
			width / 2 - 20,
			height / 1.3
		);

		drawButtons(platformSprite);
		drawRocket(platformSprite);

		app.stage.addChild(platformSprite);
	}

	function setup() {

		drawClouds();
		drawGrass();
		drawPlatform();

		//Create the cat sprite
		let cat = new PIXI.Sprite(PIXI.loader.resources['cat'].texture);

		//Add the cat to the stage
		app.stage.addChild(cat);


		cat.scale.set(0.4);
		cat.position.set(500, height - cat.height / 1.55);
		cat.revert = 1;

		app.ticker.add(() => {
			if ( cat.position.x  > width ) {
				cat.revert = -1;
			} else if (cat.position.x < 0) {
				cat.revert = 1;
			}
			cat.position.x += cat.revert * 2;
		});

	}

});