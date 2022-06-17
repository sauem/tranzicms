import {action, makeObservable, observable} from "mobx";
import {observer} from "mobx-react";
import {IPaginate} from "../../common/Contants";
import {productService} from "./ProductService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {message} from "antd";
import Helper from "../../common/Helper";

export interface IProduct {
    name: string,
    sku: string,
    orginSku: string,
    avatar: any
}

class ProductStore {
    @observable pList: Array<IProduct> = [];
    @observable pPage: IPaginate | undefined;
    @observable fetching: boolean = false;
    @observable acLoad: boolean = false;

    constructor() {
        makeObservable(this);
    }

    @action
    async getList(params?: any) {
        this.fetching = true;
        const response = await productService.getList(params);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            this.pList = response.body.data;
            this.pPage = Helper.toPage(response.body.metadata);
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async create(product: IProduct) {
        this.acLoad = true;
        const response = await productService.create(product);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Tạo sản phẩm thành công!");
            await this.getList();
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async update(productId: string, product: IProduct) {
        this.acLoad = true;
        const response = await productService.update(productId, product);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Cập nhật sản phẩm thành công!");
            await this.getList();
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async delete(productId: string) {
        this.acLoad = true;
        const response = await productService.delete(productId);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Xóa sản phẩm thành công!");
            await this.getList();
        } else {
            message.error(response.body.message);
        }
    }
}

export const productStore = new ProductStore();
