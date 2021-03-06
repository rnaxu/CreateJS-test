(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = (function(){

    function Animation() {
        _this = this;
        this.canvasElement = document.getElementById("demoCanvas");
        this.stageWidth = this.canvasElement.width;
        this.stageHeight = this.canvasElement.height;
        this.loadImage();
    }

    // preload
    Animation.prototype.loadImage = function() {
        var preload = new createjs.LoadQueue(true);

        // 画像が一つ読み込まれたとき
        preload.addEventListener('fileload', this.handleFileload);

        // 読み込むファイル
        preload.loadFile('../img/sample.png');
    };

    // 画像のパスを取得して、アニメーションを表示する関数に引数として渡す
    Animation.prototype.handleFileload = function(event) {
        var imagePath = event.item.src;
        _this.setAnimation(imagePath);
    };

    // アニメーションを定義する
    Animation.prototype.setAnimation = function(imagePath) {
        var animation = this.defineAnimation(imagePath);
        this.setStage(animation);
        createjs.Ticker.addEventListener('tick', this.handleTick);
    };

    // スプライトを作成して、animationを定義
    Animation.prototype.defineAnimation = function(imagePath) {
        var data = {
            images: [imagePath], // スプライト画像のパス
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

        animation.x = this.stageWidth / 2;
        animation.y = this.stageHeight / 2;
        animation.gotoAndPlay('walk');

        return animation;
    };

    // ステージを作成
    Animation.prototype.setStage = function(animation) {
        this.stage = new createjs.Stage(this.canvasElement);
        // アニメーションをステージに加える
        this.stage.addChild(animation);
    };

    // ステージを更新
    Animation.prototype.handleTick = function(event) {
        _this.stage.update();
    };

    return Animation;

})();
},{}],2:[function(require,module,exports){
var Animation = require('./Animation');

module.exports = (function(){

    function View() {
        this.animation = new Animation();
        this.animation.loadImage();
    }

    return View;

})();
},{"./Animation":1}],3:[function(require,module,exports){
var View = require('./module/View');

var sprite_sheet = new View();
},{"./module/View":2}]},{},[3]);
