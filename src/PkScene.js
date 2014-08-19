var PkLayer = cc.Layer.extend({
    pauseBtn: null,
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
        this.pauseBtn = new cc.MenuItemImage('res/pause_btn_normal.png', 'res/pause_btn_pressed.png', function () {
            cc.director.runScene(new HelloWorldLayer())
        });
        this.pauseBtn.attr({x: width / 16 * 15, y: height / 30 * 29, scale: 0.85, anchorX: 0.5, anchorY: 0.5});
        menu.addChild(this.pauseBtn);


        return true;
    }
});

var PkScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new PkLayer();
        this.addChild(layer);
    }
});
