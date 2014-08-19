var HelloWorldLayer = cc.Layer.extend({
    menu: null,
    playBtn: null,
    rankBtn: null,
    shareBtn: null,
    godBtn: null,
    musicBtn: null,
    playOnlineBtn: null,
    playLocalBtn: null,
    playDoubleBtn: null,
    playChallengeBtn: null,
    ctor: function () {
        this._super();
        var self = this;
        var size = cc.winSize;
        var width = size.width;
        var height = size.height;
        var centerX = width / 2;
        var centerY = height / 2;

        // bg
        var bgColorLayer = new cc.LayerColor(cc.color(249, 237, 216, 255));
        this.addChild(bgColorLayer);

        // bg lines
        // h-lines
        var maxLinesH = 16;
        var lineSpace = height / maxLinesH;
        for (var i = 0; i < maxLinesH; i++) {
            var line = new cc.Sprite('res/home_bg_line.png');
            line.attr({x: centerX, y: i * lineSpace, scaleX: 3000, scaleY: 1.5, rotation: 0});
            bgColorLayer.addChild(line);
        }
        // v-lines
        // var maxLinesV = width / lineSpace + 1;

        // buttons
        menu = new cc.Menu();
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 100);

        //play button
        this.playBtn = new cc.MenuItemImage('res/play_btn_bg_normal.png', 'res/play_btn_bg_pressed.png',
            function () {
                // 隐藏play按钮和下面四个菜单按钮
                self.playBtn.setVisible(false);
                self.rankBtn.setVisible(false);
                self.shareBtn.setVisible(false);
                self.godBtn.setVisible(false);
                self.musicBtn.setVisible(false);
                // 显示选择PK类型的按钮
                showPKMenusWithAnimByTag(5);
                showPKMenusWithAnimByTag(6);
                showPKMenusWithAnimByTag(7);
                showPKMenusWithAnimByTag(8);
            });
        this.playBtn.attr({x: centerX, y: centerY * 1.15, anchorX: 0.5, anchorY: 0.5});
        menu.addChild(this.playBtn, 0, 0);
        this.playBtn.runAction(
            cc.sequence(cc.scaleTo(0.144, 1.1, 1.1),
                cc.scaleTo(0.1, 0.9, 0.9),
                cc.scaleTo(0.08, 1.05, 1.05),
                cc.scaleTo(0.04, 1, 1)
            ));

        // rank button
        this.rankBtn = new cc.MenuItemImage('res/rank_btn_bg_normal.png', 'res/rank_btn_bg_pressed.png',
            function () {
                cc.director.runScene(new RankScene());
            });
        this.rankBtn.attr({x: centerX - width / 10 * 3, y: centerY - height / 5, anchorX: 0.5, anchorY: 0.5});
        menu.addChild(this.rankBtn, 0, 1);
        this.rankBtn.runAction(cc.scaleTo(0.2, 1.05, 1.05));

        // share button
        this.shareBtn = new cc.MenuItemImage('res/share_btn_bg_normal.png', 'res/share_btn_bg_pressed.png',
            function () {
                // cc.director.runScene(new RankScene());
            });
        this.shareBtn.attr({x: centerX - width / 10, y: centerY - height / 5, anchorX: 0.5, anchorY: 0.5});
        menu.addChild(this.shareBtn, 0, 2);
        this.shareBtn.runAction(cc.scaleTo(0.2, 1.05, 1.05));

        // god button
        this.godBtn = new cc.MenuItemImage('res/god_btn_bg_normal.png', 'res/god_btn_bg_pressed.png',
            function () {
                cc.director.runScene(new GuideScene());
            });
        this.godBtn.attr({x: centerX + width / 10, y: centerY - height / 5, anchorX: 0.5, anchorY: 0.5});
        menu.addChild(this.godBtn, 0, 3);
        this.godBtn.runAction(cc.scaleTo(0.2, 1.05, 1.05));

        // music button
        this.musicBtn = new cc.MenuItemImage('res/music_btn_bg_normal.png', 'res/music_btn_bg_pressed.png',
            function () {
                //cc.director.runScene(new RankScene());
            });
        this.musicBtn.attr({x: centerX + width / 10 * 3, y: centerY - height / 5, anchorX: 0.5, anchorY: 0.5});
        menu.addChild(this.musicBtn, 0, 4);
        this.musicBtn.runAction(cc.scaleTo(0.2, 1.05, 1.05));

        // play online button
        this.playOnlineBtn = new cc.MenuItemImage('res/play_menu_btn_bg_normal.png', 'res/play_menu_btn_bg_pressed.png',
            function () {
                cc.director.runScene(new PkScene());
            });
        this.playOnlineBtn.attr({x: centerX, y: centerY + height / 12 * 3, scale: 0.1, anchorX: 0.5, anchorY: 0.5, visible: false});
        menu.addChild(this.playOnlineBtn, 0, 5);

        // play local button
        this.playLocalBtn = new cc.MenuItemImage('res/play_menu_btn_bg_normal.png', 'res/play_menu_btn_bg_pressed.png',
            function () {
                cc.director.runScene(new PkScene());
            });
        this.playLocalBtn.attr({x: centerX, y: centerY + height / 12, scale: 0.1, anchorX: 0.5, anchorY: 0.5, visible: false});
        menu.addChild(this.playLocalBtn, 0, 6);

        // play double button
        this.playDoubleBtn = new cc.MenuItemImage('res/play_menu_btn_bg_normal.png', 'res/play_menu_btn_bg_pressed.png',
            function () {
                cc.director.runScene(new PkScene());
            });
        this.playDoubleBtn.attr({x: centerX, y: centerY - height / 12, scale: 0.1, anchorX: 0.5, anchorY: 0.5, visible: false});
        menu.addChild(this.playDoubleBtn, 0, 7);

        // play challenge button
        this.playChallengeBtn = new cc.MenuItemImage('res/play_menu_btn_bg_normal.png', 'res/play_menu_btn_bg_pressed.png',
            function () {
                cc.director.runScene(new PkScene());
            });
        this.playChallengeBtn.attr({x: centerX, y: centerY - height / 12 * 3, scale: 0.1, anchorX: 0.5, anchorY: 0.5, visible: false});
        menu.addChild(this.playChallengeBtn, 0, 8);


        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

function showPKMenusWithAnimByTag(tag) {
    var item = menu.getChildByTag(tag);
    item.setVisible(true);
    item.runAction(
        cc.sequence(
            cc.scaleTo(0.144, 0.85, 0.85),
            cc.scaleTo(0.1, 0.7, 0.7),
            cc.scaleTo(0.06, 0.75, 0.75)
        ));

}


function test() {
    var pomelo = window.pomelo;

    var route = 'gate.gateHandler.queryEntry';
    var uid = 'uid';
    var rid = 'rid';
    var username = 'username';

    pomelo.init({
        host: '192.168.1.104',
        port: 3014,
        log: true
    }, function () {
        cc.log(' test() >>>request(enter) ');
        pomelo.request(route, {
            uid: uid
        }, function (data) {
            pomelo.disconnect();
            pomelo.init({
                host: data.host,
                port: data.port,
                log: true
            }, function () {
                var route = 'connector.entryHandler.enter';
                pomelo.request(route, {
                    username: username,
                    rid: rid
                }, function (data) {
                    cc.log(JSON.stringify(data));
                    cc.log(' test() request(enter) >>>chatSend() data=' + JSON.stringify(data));
                    chatSend();
                });
            });
        });
    });

    function chatSend() {
        var route = 'chat.chatHandler.send';
        var target = '*';
        var msg = 'msg ahaha';
        pomelo.request(route, {
            rid: rid,
            content: msg,
            from: username,
            target: target
        }, function (data) {
            cc.log(' test() chatSend() data=' + JSON.stringify(data));
        });
    }
}
