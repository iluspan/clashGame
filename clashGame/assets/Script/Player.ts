
import {GameMgr} from "./GameMgr";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Prefab)
    bullet:cc.Prefab = null;
    private _count:number = 0;
    private _times:number = 1;
    private _len:number = 10;
    // onLoad () {}
    onDestroy() {
        this.unschedule(this.produceBullet.bind(this));
    }


    start () {
        GameMgr.getInstance().bulletPrefab = this.bullet;
        // this.schedule(this.produceBullet.bind(this),GameMgr.getInstance().speed);
        this.produceBullet();
    }

    private produceBullet():void {
        let bullet3:cc.Node = GameMgr.getInstance().getBullet();
        this.node.parent.addChild(bullet3);
        bullet3.x = this.node.x;
        bullet3.y = this.node.y;

    }

    update (dt) {
        this._count ++;
        this._times++;

        if (this._count > 10) {
            this.produceBullet();
            this._count = 0;
        }
    }
}
