(function() {

    var stage;

    // アニメーションを作る
    function createAnimation(file) {
        var data = {
            images: [file], // スプライト画像のパス
            frames: {
                width: 82, // 幅
                height: 109, // 高さ
                regX:41, // 水平基準点
                regY:55 // 垂直基準点
            },
            animations: {
                walk: {
                    frames: [0, 0, 1, 2, 2, 3], // 再生するコマの順番
                    speed: 0.5, // アニメーションの速度（値が大きいほど早くなる）
                    next: false // ループさせない
                }
            }
        };

        var spriteSheet = new createjs.SpriteSheet(data);
        var animation = new createjs.Sprite(spriteSheet);

        return animation;
    }

    // ステージを更新
    function handleTick(event) {
        stage.update();
    }

    // アニメーションを表示する
    function showAnimation(file) {
        var canvasElement = document.getElementById("demoCanvas");
        var stageWidth = canvasElement.width;
        var stageHeight = canvasElement.height;

        // ステージを作成
        stage = new createjs.Stage(canvasElement);

        var animation = createAnimation(file);
        animation.x = stageWidth / 2;
        animation.y = stageHeight / 2;
        animation.gotoAndPlay('walk');

        // アニメーションをステージに加える
        stage.addChild(animation);

        createjs.Ticker.addEventListener('tick', handleTick);
    }

    // 画像のパスを取得して、アニメーションを表示する関数に引数として渡す
    function handleFileComplete(event) {
        var image = event.item.src;
        showAnimation(image);
    }

    // 画像を読み込む
    function loadImage() {
        var queue = new createjs.LoadQueue(true);

        // 画像が一つ読み込まれたとき
        queue.addEventListener('fileload', handleFileComplete);

        queue.loadFile('img/sample.png');
    }

    loadImage();

})();