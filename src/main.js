import * as PIXI from 'pixi.js'
import { randomInt } from './helpers'
import Game from './game'

document.addEventListener("DOMContentLoaded", function(event){

    PIXI.utils.skipHello();

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
        .add('cat'	     , 'assets/img/mini_squish_siamese_7_design.png')
        .add('grass'       , 'assets/img/grass.png')
        .add('platform'    , 'assets/img/plataforma.png')
        .add('clouds'      , 'assets/img/clouds.svg')
        .add('rocket'      , 'assets/img/rocket.png')
        .add('runGreen'    , 'assets/img/buttons/Levelgreen-min.png')
        .add('runRed'      , 'assets/img/buttons/Levelreoundred-min.png')
        .add('fireSprites' , 'assets/img/fire/fire.json')
        .load(() => {
            let game = new Game(app);
            console.log('lood');
            app.stage.addChild(game);
        })
        .on('complete', function(e) {
            console.log('complete', e.progress);
        });;
});