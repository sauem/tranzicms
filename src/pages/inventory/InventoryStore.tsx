import {action, makeObservable, observable, observe} from "mobx";
import {IPaginate} from "../../common/Contants";
import {inventoryService} from "./InventoryService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import Helper from "../../common/Helper";
import {message} from "antd";

class InventoryStore {
    @observable list: any = [];
    @observable page: IPaginate | undefined;
    @observable fetching: boolean = false;
    @observable acLoad: boolean = false;

    constructor() {
        makeObservable(this);
    }

    @action
    async getList(params?: any) {
        this.fetching = true;
        const response = await inventoryService.getList(params);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            this.list = response.body.data;
            this.page = Helper.toPage(response.body.metadata);
        } else {
            message.error(response.body.message);
        }
    }

}

export const inventoryStore = new InventoryStore();
