var WelcomeLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.winSize;
        var width = size.width;
        var height = size.height;
        var centerX = width / 2;
        var centerY = height / 2;

        // bg
        var bgColorLayer = new cc.LayerColor(cc.color(255, 255, 255, 255));
        this.addChild(bgColorLayer);

        // logo
        var bgLogoSprite = new cc.Sprite('res/zui_logo.png');
        bgLogoSprite.attr({x: centerX, y: centerY * 1.225, scale: 0.7, rotation: 0});
        this.addChild(bgLogoSprite);

        // copyright
        var bgCopyRightSprite = new cc.Sprite('res/zui_copyright.png');
        bgCopyRightSprite.attr({x: centerX, y: height * 0.085, scale: 1, rotation: 0});
        this.addChild(bgCopyRightSprite);


        // delay goto home scene
        this.scheduleOnce(this.gotoHomeScene, 1.5);
        return true;
    },
    gotoHomeScene: function () {
        cc.director.runScene(new HelloWorldScene());
    }
});


var WelcomeScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new WelcomeLayer();
        this.addChild(layer);
    }
});
