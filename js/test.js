(function() {

    function createAnimation() {
        var data = {
            images: ['img/sample.png'], // スプライト画像のパス
            frames: {
                width: 82, // 幅
                height: 109, // 高さ
                regX:41, // 水平基準点
                regY:55 // 垂直基準点
            },
            animations: {
                walk: {
                    frames: [0, 0, 1, 2, 2, 3], // 再生するコマの順番
                    speed: 0.5 // アニメーションの速度（値が大きいほど早くなる）
                }
            }
        };
        var spriteSheet = new createjs.SpriteSheet(data);
        var animation = new createjs.Sprite(spriteSheet);
        return animation;
    }

    function init() {
        var canvasElement = document.getElementById("demoCanvas");
        var stageWidth = canvasElement.width;
        var stageHeight = canvasElement.height;
        var stage = new createjs.Stage(canvasElement);

        var animation = createAnimation();
        animation.x = stageWidth / 2;
        animation.y = stageHeight / 2;
        animation.gotoAndPlay('walk');
        stage.addChild(animation);

        createjs.Ticker.addEventListener('tick', function() {
            stage.update();
        });
    }

    init();

})();