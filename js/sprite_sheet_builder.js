(function() {

    var stage;

    var images = [];

    // manifestを生成
    function createManifest() {
        var manifest = [];
        for (var n = 0; n < 4; n++) {
            manifest.push({
                src: '../img/sample' + (n + 1) + '.png',
                id: 'sample' + (n + 1)
            });
        }
        return manifest;
    }

    // ファイルが1つ読み込まれたとき
    function handleFileload(event) {
        // event.resultを配列にして保持
        images[event.item.id] = event.result;
    }

    // ファイルがすべて読み込まれたとき
    function handleFileComplete(event) {
        // イベントを取り除く
        event.target.removeEventListener('fileload', handleFileload);
        event.target.removeEventListener('complete', handleFileComplete);

        // アニメーション実行
        initialize();
    }

    // ステージを更新
    function tickEvent(event) {
        stage.update();
    }

    // preload
    function loadImage(manifest) {
        var preload = new createjs.LoadQueue(false);
        preload.addEventListener('fileload', handleFileload);
        preload.addEventListener('complete', handleFileComplete);
        preload.loadManifest(manifest);
    }

    // スプライトシートを生成
    function createSpriteSheet () {
        var builder = new createjs.SpriteSheetBuilder();
        builder.maxWidth = 328;

        var frames = [];
        for (var n = 0; n < 4; n++) {
            var image = images['sample' + (n + 1)];
            var index = builder.addFrame(new createjs.Bitmap(image));
            frames.push(index);
        }
        builder.addAnimation('sample', frames, false, 0.5);

        var spriteSheet = builder.build();

        return spriteSheet;
    }

    // アニメーションを表示
    function showAnimation (spriteSheet) {
        var canvasElement = document.getElementById("demoCanvas");
        var stageWidth = canvasElement.width;
        var stageHeight = canvasElement.height;

        // ステージを作成
        stage = new createjs.Stage(canvasElement);

        var animation = new createjs.Sprite(spriteSheet, 0);
        animation.x = stageWidth / 2;
        animation.y = stageHeight / 2;
        animation.regX = 41;
        animation.regY = 55;
        animation.gotoAndPlay('sample');
        console.log(animation);
        // animation.play();

        // アニメーションをステージに加える
        stage.addChild(animation);

        createjs.Ticker.addEventListener('tick', tickEvent);
    }

    // 画像を読み込んだ後の作業をまとめた関数（アニメーション実行）
    function initialize() {
        var spriteSheet = createSpriteSheet();
        showAnimation(spriteSheet);
    }


    var manifest = createManifest();
    loadImage(manifest);


})();