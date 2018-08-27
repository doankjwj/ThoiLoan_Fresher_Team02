var RadioButton = ccui.Button.extend({

    _status: null,
    blue: null,

    ctor: function(){
        this._super(folderClan + "Untitled-1.png");
        this._status = false;
        this.blue = cc.Sprite(folderClan + "Untitled-1-selected.png");
        this.blue.visible = this._status;
        this.addChild(this.blue, 1);
        this.blue.setPosition(cc.p(this.width/2+0.3, this.height/2-0.5));
        this.setZoomScale(0.01);
        this.addTouchEventListener(function(sender, type) {
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED :
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    if(!this._status) {
                        this.getParent().getParent().updateButtonStatus();
                    }
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this);

    },

    changeStatus: function() {
        this._status = !this._status;
        this.blue.setVisible(this._status);
    }

});