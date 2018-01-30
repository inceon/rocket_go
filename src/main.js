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

	let game = new Game(app);

	app.stage.addChild(game);

});