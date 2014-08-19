cc.game.onStart = function () {
    if (cc.sys.isNative === true) {
        require('src/pomelo-cocos2d-js-master/index.js');
    }

    cc.log('===== width=' + cc.winSize.width + ' height=' + cc.winSize.height);
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(720, 1280, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    cc.log('===== width=' + cc.winSize.width + ' height=' + cc.winSize.height);


    //load resources
    // cc.LoaderScene.preload(g_resources, function () { cc.director.runScene(new HelloWorldScene()); }, this);
    // 自定义不要上面的加载动画而直接显示主界面(因为主界面没太多东西)
    cc.director.runScene(new WelcomeScene());

};

cc.game.run();