

var gv = gv || {};

cc.game.onStart = function(){
    cc.view.enableRetina(false);
    // Adjust viewport meta
    cc.view.adjustViewPort(true);
    // Set up the resolution policy and design resolution size
    cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.SHOW_ALL);
    // The game will be resized when browser size changes
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_preload, function () {
        fr.clientConfig.init();
        fr.clientConfig.detectResourceFromScreenSize();
        if (sys.isNative)
        {
            cc.view.setContentScaleFactor(fr.clientConfig.getResourceScale());
        };
        fr.clientConfig.updateResourceSearchPath();

        gv.gameClient = new GameClient();
        gv.poolObjects  = new PoolObject();
        testnetwork.connector = new testnetwork.Connector(gv.gameClient);

        fr.view(MainLayer)
        // cc.director.runScene(new MainLayer.scene());
        // gv.gameClient.connect();
    }, this);
};

cc.game.run();