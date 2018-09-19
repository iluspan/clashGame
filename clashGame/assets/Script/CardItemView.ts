
import {GameMgr} from "./GameMgr";
const {ccclass, property} = cc._decorator;

@ccclass
export default class CardItemView extends cc.Component {

    private _data:{val,type} = null;
    private _speed:number = -100;
    onDisable() {

    }


    public initUI(data:{val,type}):void {
        this._data = data;
    }


    start () {
        let actionList:any[] = [];
        let action = cc.moveBy(1,0,-120);
        actionList.push(action);
        let finished = cc.callFunc(function () {
            if (this.node.y < -this.node.height/2) {
                cc.director.getActionManager().removeAllActionsFromTarget(this.node, true);
                this.node.parent = null;
                GameMgr.getInstance().recycleItemView(this.node);
            }
        }.bind(this), this);
        actionList.push(finished);
        this.node.runAction(cc.repeatForever(cc.sequence(actionList)));
    }


    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    public onCollisionEnter(other, self) {

    }

    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    public onCollisionStay(other, self) {

    }


    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    public onCollisionExit(other, self) {

    }


}
