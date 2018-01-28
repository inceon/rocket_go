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

	window.app = app;

	app.renderer.backgroundColor = 0x81c9f9;
	app.renderer.view.style.position = "absolute";
	app.renderer.view.style.display = "block";
	app.renderer.autoResize = true;
	app.renderer.resize(window.innerWidth, window.innerHeight);

	main.appendChild(app.view);

	PIXI.loader
	  .add('cat'	   , 'img/mini_squish_siamese_7_design.png')
	  .add('grass'     , 'img/grass.png')
	  .add('platform'  , 'img/plataforma.png')
	  .add('clouds'    , 'img/clouds.svg')
	  .add('rocket'    , 'img/rocket.png')
	  .add('runGreen'  , 'img/buttons/Levelgreen-min.png')
	  .add('runRed'    , 'img/buttons/Levelreoundred-min.png')
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
			200
		);

		grassSprite.tileScale.set(0.35);
		grassSprite.width = width;
		grassSprite.position.y = height - grassSprite.height;

		app.stage.addChild(grassSprite);
	}

	function runRocket(platform) {
		let rocket = new PIXI.Sprite(PIXI.loader.resources['rocket'].texture);

		rocket.anchor.set(0.5, 1);
		rocket.position.set(
			platform.width / 2 - 15,
			10
		);
		platform.addChild(rocket);
	}

	function drawButtons(platform) {
		let buttonGreenTexture = PIXI.loader.resources['runGreen'].texture;
		let buttonRedTexture   = PIXI.loader.resources['runRed'].texture;

		let buttonSprite = new PIXI.Sprite(
			buttonGreenTexture
		);

		buttonSprite.scale.set(0.25)
		buttonSprite.position.set(
			134,
			42
		);
		buttonSprite.interactive = true;
		buttonSprite.buttonMode  = true;

		runRocket(platform);
		buttonSprite.pointerdown = function () {
			this.setTexture(buttonRedTexture);
		};

		buttonSprite.pointerup = function () {
			this.setTexture(buttonGreenTexture);
		};

		platform.addChild(buttonSprite);
	}

	function drawPlatform() {
		let platformTexture = PIXI.loader.resources['platform'].texture;
		let platformSprite = new PIXI.Sprite(
			platformTexture
		);

		platformSprite.position.set(
			width / 2 - platformTexture.width / 2,
			420
		);

		drawButtons(platformSprite);

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