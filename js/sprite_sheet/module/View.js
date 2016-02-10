var Animation = require('./Animation');

module.exports = (function(){

    function View() {
        this.animation = new Animation();
        this.animation.loadImage();
    }

    return View;

})();