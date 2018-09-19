/**
 * Created 2018/9/18.
 */

export class GameMgr {

    private static _instance: GameMgr;
    public speed:number = 0.1;
    public bgH:number = 0;//舞台的高
    private _bulletPool:any[] = [];//子弹对象池
    public bulletPrefab:cc.Prefab = null;
    public cardItemPrefab:cc.Prefab = null;
    private _cardItemPool:cc.NodePool = new cc.NodePool();
    constructor() {

    }

    public static getInstance(): GameMgr {
        if (!this._instance) {
            this._instance = new GameMgr();
        }
        return this._instance;
    }


    public getBullet():cc.Node {
        let node:cc.Node = this._bulletPool.pop();
        if (!node) {
            node = cc.instantiate(this.bulletPrefab);
        }
        return node;
    }

    public recycleBullet(bullet:cc.Node):void {
        if (bullet) {
            this._bulletPool.push(bullet);
        }
    }




    /**
     * type 1表示为不移动，2表示为移动
     * @returns {any[]}
     */
    public getRandomItemData():any[] {
        let arr:any[] = [{val:0,type:0},{val:0,type:0},{val:0,type:0},{val:0,type:0},{val:0,type:0}];
        let type:number = this.getRandomType();
        if (type == 1) {
            let num:number = this.randomNumBoth(1,7);
            let index:number = this.randomNumBoth(0,4);
            let isMove:number = this.randomNumBoth(0,1);
            arr[index]["val"] = num;
            if (isMove) {
                arr[index]["type"] = 2;
            }else {
                arr[index]["type"] = 1;
            }
        }else if (type == 2) {

            let isMove:number = this.randomNumBoth(0,1);
            if (isMove) {

            }else {

            }
        }else if (type == 3) {

        }else if (type == 4) {

        }else if (type == 5) {
            for (var i = 0; i < 5; i++) {
                let num:number = this.randomNumBoth(1,7);
                arr[i]["val"] = num;
                arr[i]["type"] = 1;
            }
        }
        return arr;
    }

    /**
     * 1表示五个格子都填满，2表示四个格子都填满，3表示三个格子填满，4表示两个格子填满，5表示1个格子填满
     */
    public getRandomType():number {

        let type:number = this.randomNumBoth(1,5);
        // return type;
        return 5;
    }


    /**
     * 范围随机数
     * @param min
     * @param max
     * @returns {any}
     */
    public randomNumBoth(min,max):number {
        var Range = max - min;
        var Rand = Math.random();
        var num = min + Math.round(Rand * Range); //四舍五入
        return num;
    }


    public getPosX(index):number {
        let num:number = 60 + index * 120;
        return num;
    }



    public recycleItemView(itemView:cc.Node):void {
        if (itemView) {
            this._cardItemPool.put(itemView);
        }
    }

    public getCardItem():cc.Node {
        let node:cc.Node;
        node = cc.instantiate(this.cardItemPrefab);
        // if (this._cardItemPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
        //     node = this._cardItemPool.get();
        // } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
        //     node = cc.instantiate(this.cardItemPrefab);
        // }
        return node;
    }
}
