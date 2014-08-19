var GuideLayer = cc.Layer.extend({
    backBtn: null,
    ctor: function () {
        this._super();
        var size = cc.winSize;
        var width = size.width;
        var height = size.height;
        var centerX = width / 2;
        var centerY = height / 2;


        // bg
        var bgColorLayer = new cc.LayerColor(cc.color(249, 237, 216,255));
        this.addChild(bgColorLayer);

        // buttons
        var menu = new cc.Menu();
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 100);

        //back button
        this.backBtn = new cc.MenuItemImage('res/back_btn_bg_normal.png', 'res/back_btn_bg_pressed.png', function () {
            cc.director.runScene(new HelloWorldLayer())
        });
        this.backBtn.attr({x: width / 12, y: height - height / 20, scale: 0.175, anchorX: 0.5, anchorY: 0.5});
        menu.addChild(this.backBtn);


        return true;
    }
});

var GuideScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GuideLayer();
        this.addChild(layer);
    }
});
