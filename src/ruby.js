export default class Ruby extends PIXI.Container {
    constructor(x = 0) {
        super();

        this.speed = 1;
        this.ticker = new PIXI.ticker.Ticker();
        this.ticker.start();

        this.draw(x);
    }

    draw(x) {
        let ruby = new PIXI.Sprite(PIXI.loader.resources['ruby'].texture);

        ruby.name = 'ruby';
        ruby.scale.set(0.2);
        ruby.anchor.set(0.5, 1);
        ruby.position.set(
            x,
            0
        );

        this.ruby = ruby;
        this.addChild(ruby);

        this.ticker.add(() => {
            this.ruby.position.y += this.speed;
        })

    }
}