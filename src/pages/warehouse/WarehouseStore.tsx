import {action, makeObservable, observable} from "mobx";
import {IPaginate} from "../../common/Contants";
import {warehouseService} from "./WarehouseService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import Helper from "../../common/Helper";
import {message} from "antd";

export interface IProductStock {
    sku: string,
    warehouseId: string,
    productId: string,
    committed: number,
    description?: string
}

export interface IWarehouse {
    id?: string | null,
    name: string,
    code: string,
    description?: string,
    phone?: string,
    address?: string
}

class WarehouseStore {
    @observable fetching: boolean = false;
    @observable acLoad: boolean = false;
    @observable whList: any = [];
    @observable whPage: IPaginate | undefined;


    constructor() {
        makeObservable(this);
    }

    @action
    async getList(params?: any) {
        this.fetching = true;
        const response = await warehouseService.getList(params);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            this.whList = response.body.data;
            this.whPage = Helper.toPage(response.body.metadata);
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async create(data: IWarehouse) {
        this.acLoad = true;
        const response = await warehouseService.create(data);
        this.acLoad = false;

        if (response.status == HttpStatusCode.SUCCESS) {
            await this.getList();
            message.success("Tạo kho thành công!")
        } else {
            message.error(response.body.message)
        }
    }

    @action
    async update(warehouseId: any, data: IWarehouse) {
        this.acLoad = true;
        const response = await warehouseService.update(warehouseId, data);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            await this.getList();
            message.success("Cập nhập kho thành công!");
        } else {
            message.error(response.body.message)
        }
    }

    @action
    async delete(warehouseId: string) {
        this.acLoad = true;
        const response = await warehouseService.delete(warehouseId);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            await this.getList();
            message.success("Xóa kho thành công!");
        } else {
            message.error(response.body.message)
        }
    }

    @action
    async importSingleProduct(warehouseId: string, stock: IProductStock) {
        this.acLoad = true;
        const response = await warehouseService.singleProductImport(warehouseId, stock);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            await this.getList();
            message.success("Nhập kho thành công!");
        } else {
            message.error(response.body.message)
        }
    }

    @action
    async importListProduct(warehouseId: string, stock: any) {
        this.acLoad = true;
        const response = await warehouseService.multiProductImport(warehouseId, stock);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            await this.getList();
            message.success("Nhập kho thành công!");
        } else {
            message.error(response.body.message)
        }
    }
}

export const warehouseStore = new WarehouseStore();
