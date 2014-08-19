var mCurTouchX = 0;
var mCurTouchY = 0;
var mPreTouchX = 0;
var mPreTouchY = 0;
var mIsTouchMoved = false;
var mChesses = [];

var linesMaxCountHV = 26;
var mOffsetX = 0;
var mOffsetY = 0;
var mMinOffsetX = 0;
var mMaxOffsetX = 0;
var mMinOffsetY = 0;
var mMaxOffsetY = 0;

var mGridLayer;


var PkLayer = cc.Layer.extend({
    pauseBtn: null,
    ctor: function () {
        this._super();
        var self = this;

        var size = cc.winSize;
        var width = size.width;
        var height = size.height;
        var centerX = width / 2;
        var centerY = height / 2;


        // bg
        var bgLayer = new cc.LayerColor(cc.color(248, 221, 174, 255));
        this.addChild(bgLayer);

        // grid layer
        mGridLayer = new cc.LayerColor(cc.color(248, 221, 174, 255));
        this.addChild(mGridLayer);

        // bg lines
        var gridsMaxSize = height * 1.5;
        var lineSpace = gridsMaxSize / linesMaxCountHV;

        mOffsetX = (width - gridsMaxSize) / 2;
        mOffsetY = (height - gridsMaxSize) / 2;
        mMinOffsetX = width * 0.8 - gridsMaxSize;
        mMaxOffsetX = width * 0.2;
        mMinOffsetY = height * 0.9 - gridsMaxSize;
        mMaxOffsetY = height * 0.1;
        mGridLayer.setPositionX(mOffsetX);
        mGridLayer.setPositionY(mOffsetY);

        // self.scheduleOnce(addLines(centerX, centerY, lineSpace, gridsMaxSize), 3);
        addLines(centerX, centerY, lineSpace, gridsMaxSize);


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


        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: self.onTouchBegan,
            onTouchMoved: self.onTouchMoved,
            onTouchEnded: self.onTouchEnded
        }, this);

        return true;
    },
    onTouchBegan: function (touch, event) {
        // cc.log('onTouchBegan');
        var touchPoint = touch.getLocation();
        mIsTouchMoved = false;
        mPreTouchX = mCurTouchX;
        mPreTouchY = mCurTouchY;
        mCurTouchX = touchPoint.x;
        mCurTouchY = touchPoint.y;

        return true;
    },
    onTouchMoved: function (touch, event) {
        // cc.log('onTouchMoved');
        var touchPoint = touch.getLocation();
        // mIsTouchMoved = true;

        mPreTouchX = mCurTouchX;
        mPreTouchY = mCurTouchY;
        mCurTouchX = touchPoint.x;
        mCurTouchY = touchPoint.y;

        var disX = mCurTouchX - mPreTouchX;
        var disY = mCurTouchY - mPreTouchY;
        var uDisX = Math.abs(disX);
        var uDisY = Math.abs(disY);
        // cc.log(' uDisX=' + uDisX + ' uDisY=' + uDisY);

        // 触摸移动
        if (uDisX >= uDisY) {
            // 水平移动
            if (uDisX > 3) {
                mIsTouchMoved = true;
                mOffsetX += disX * 3;
                if (mOffsetX <= mMinOffsetX) {
                    mOffsetX = mMinOffsetX;
                } else if (mOffsetX >= mMaxOffsetX) {
                    mOffsetX = mMaxOffsetX;
                }

            }

        } else {
            // 垂直移动
            if (uDisY > 3) {
                mIsTouchMoved = true;
                mOffsetY += disY * 3;
                if (mOffsetY <= mMinOffsetY) {
                    mOffsetY = mMinOffsetY;
                } else if (mOffsetY >= mMaxOffsetY) {
                    mOffsetY = mMaxOffsetY;
                }


            }

        }

        // 若移动了，则刷新页面显示
        if (mIsTouchMoved) {
            //refreshBgAndChesses();
        }

    },
    onTouchEnded: function (touch, event) {
        // cc.log('onTouchEnded');
        var touchPoint = touch.getLocation();
        // 若没有touchmove，则进行摆放棋子
        if (!mIsTouchMoved) {
            checkAddChess(touchPoint);
        }

    }
});

var PkScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new PkLayer();
        this.addChild(layer);
    }
});

function addLines(centerX, centerY, lineSpace, gridsMaxSize) {
    // h-lines
    for (var i = 0; i <= linesMaxCountHV; i++) {
        var line = new cc.Sprite('res/pk_bg_line.png');
        line.attr({x: centerX - mOffsetX, y: i * lineSpace, scaleX: gridsMaxSize, scaleY: 1, rotation: 0});
        mGridLayer.addChild(line, 1000 + i);
    }
    // v-lines
    for (var i = 0; i <= linesMaxCountHV; i++) {
        var line = new cc.Sprite('res/pk_bg_line.png');
        line.attr({x: i * lineSpace, y: centerY - mOffsetY, scaleX: 1, scaleY: gridsMaxSize, rotation: 0});
        mGridLayer.addChild(line, 2000 + i);
    }
}

function refreshBgAndChesses() {
    cc.log('refreshBgAndChesses');

    mGridLayer.setPositionX(mOffsetX);
    mGridLayer.setPositionY(mOffsetY);

}
function checkAddChess(touchPoint) {
    var gridX = touchPoint.x - mOffsetX;
    var gridY = touchPoint.y - mOffsetY;
    cc.log('checkAddChess gridX=' + gridX + ' gridY=' + gridY);

    if (gridX > 0 && gridY > 0
        && gridX < linesMaxCountHV && gridY < linesMaxCountHV) {
        // 检查此位置是否已放置有棋子

    }

}