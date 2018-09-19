
import {GameMgr} from "./GameMgr";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    @property(cc.Integer)
    ySpeed:number = 1;
    @property(cc.Integer)
    maxInterval:number = 10;
    private _tickId:number = null;

    onDisable() {
        if (this._tickId) {
            clearInterval(this._tickId);
            this._tickId = null;
        }
    }
    start () {
        let action = cc.moveBy(0.02,0,100);
        this._tickId = setInterval(function () {
            this.node.runAction(action);
            if (this.node.y > GameMgr.getInstance().bgH + this.node.height/2) {
                this.node.removeFromParent(true);
                GameMgr.getInstance().recycleBullet(this.node);
            }
        }.bind(this),20)
    }

}
