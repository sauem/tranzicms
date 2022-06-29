import {action, makeObservable, observable} from "mobx";
import {observer} from "mobx-react";
import {IPaginate} from "../../common/Contants";
import {productService} from "./ProductService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {message} from "antd";
import Helper from "../../common/Helper";
import {ICategory} from "../archive/ArchiveStore";

export interface IAttribute {
    _id: string,
    sort: number,
    vi: string,
    en: string,
    value: string,
}

export interface IListPrice {
    quantity: number,
    price: number,
    salePrice: number
}

export interface IDocument {
    name: string,
    items: Array<{ title: string, link: string }> | []

}

export interface IExportType {
    name: string,
    description: string,
    order: number | 0
}

export interface IProductInclude {
    name: string,
    slug: string,
    sku: string,
    orginSku: string,
    image: string,
    manufacturer: string
}

export interface IProduct {
    id?: string | undefined,
    name: string,
    slug: string,
    sku: string,
    orginSku: string,
    avatar: any,
    description: string,
    dataSheet: string,
    content: string,
    metaTitle: string,
    metaDescription: string,
    metaKeyword: string,
    price: number,
    categoryId: string,
    state: string,
    isHot: boolean,
    isNew: boolean,
    isPopular: boolean,
    imageId: string,
    thumbs: Array<string> | [],
    regularPrice: number,
    category: ICategory | undefined,
    attribute: Array<IAttribute> | [],
    documents: Array<IDocument> | [],
    classifications: Array<IExportType> | [],
    listPrice: Array<IListPrice> | [],
    sameProductIds: Array<string> | [],
    relatedProductIds: Array<string> | [],


}

class ProductStore {
    @observable pList: Array<IProduct> = [];
    @observable pPage: IPaginate | undefined;
    @observable archiveList: any = [];
    @observable archivePage: IPaginate | undefined;
    @observable fetching: boolean = false;
    @observable acLoad: boolean = false;
    @observable product: IProduct | undefined;

    constructor() {
        makeObservable(this);
    }

    @action
    async getArchive(params: any) {
        this.fetching = true;
        const response = await productService.getListArchive({
            ...params,
            type: 'PRODUCT'
        });
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            this.archiveList = response.body.data;
            this.archivePage = Helper.toPage(response.body.metadata);
        } else {
            message.error(response.body.message);
        }
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
    async getDetail(productId: string) {
        this.fetching = true;
        const response = await productService.getDetail(productId);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            this.product = response.body;
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
    async update(productId: any, product: IProduct) {
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

    @action
    async import(data: any) {
        this.acLoad = true;
        const response = await productService.import(data);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Nhập sản phẩm thành công!");
            await this.getList();
        } else {
            message.error(response.body.message);
        }
    }
}

export const productStore = new ProductStore();
