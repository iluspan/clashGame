
import {GameMgr} from "./GameMgr";
import CardItemView from "./CardItemView";
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {

    @property(cc.Node)
    player:cc.Node = null;

    @property(cc.Node)
    bg:cc.Node = null;

    @property(cc.Prefab)
    itemViewPrefab:cc.Prefab = null;
    private _tickId:number = null;

    start () {
        GameMgr.getInstance().cardItemPrefab = this.itemViewPrefab;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        GameMgr.getInstance().bgH = this.node.getChildByName("gameBg").height;
        this.initEvent();
        this.produceItemView();
    }

    /**
     * 产生itemView
     */
    produceItemView():void {
        let itemViewNode:cc.Node = this.node.getChildByName("gameBg").getChildByName("itemViewNode");
        let posY:number = this.node.height;
        let dataArr:number[] = GameMgr.getInstance().getRandomItemData();
        for (var i = 0; i < 5; i++) {
            if (dataArr[i]) {
                let node:cc.Node = GameMgr.getInstance().getCardItem();
                node.x = GameMgr.getInstance().getPosX(i);
                node.y = posY;
                itemViewNode.addChild(node);
                let itemView:CardItemView = node.getComponent("CardItemView");
                let data:any = {val:dataArr[i],type:1};
                itemView.initUI(data);
            }
        }

        if (this._tickId) {
            clearTimeout(this._tickId);
            this._tickId = null;
        }

        let interval:number = GameMgr.getInstance().randomNumBoth(1,4);
        this._tickId = setTimeout(this.produceItemView.bind(this),interval * 1000);
    }

    private initEvent():void {
        this.player.on(cc.Node.EventType.TOUCH_START,(event:cc.Event.EventTouch) =>{
            var worldVec2 = event.touch.getLocation();
            let localVec2 = this.node.convertToNodeSpaceAR(worldVec2);
        });
        this.player.on(cc.Node.EventType.TOUCH_MOVE,event=>{
            const {x,y} = event.touch.getDelta();
            this.player.x += x;


            if (this.player.x < 0) {
                this.player.x = 0;
            }

            if (this.player.x > this.bg.width) {
                this.player.x = this.bg.width;
            }

        });

        this.player.on(cc.Node.EventType.TOUCH_END,event=>{
            console.log("touch_end");
        });

        this.player.on(cc.Node.EventType.TOUCH_CANCEL,event=>{
            console.log("touch_cancel");
        });
    }

}
