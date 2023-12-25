import {action, makeObservable, observable} from "mobx";
import {IPaginate} from "../../common/Contants";
import {articleService} from "../article/ArticleService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {message} from "antd";
import Helper from "../../common/Helper";
import {IArticle} from "../article/ArticleStore";
import {manufacturerService} from "./ManufacturerService";

export interface IManufacturer {
    name: string,
    slug: string,
    sortOrder: number,
    description: string,
    state: string,
    iconId: string,
    logoId: any,
    icon: any,
    logo: any
}

class ManufacturerStore {
    @observable list: any = [];
    @observable page: IPaginate | undefined;
    @observable fetching: boolean = false;
    @observable acLoad: boolean = false;


    constructor() {
        makeObservable(this)
    }

    @action
    async getList(params?: any) {
        this.fetching = true;
        const response = await manufacturerService.getList(params);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            this.list = response.body.data;
            this.page = Helper.toPage(response.body.metadata);
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async create(manufacturer: IManufacturer) {
        this.acLoad = true;
        const response = await manufacturerService.create(manufacturer);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            await this.getList();
            message.success("Tạo nhà sản xuất thành công!");
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async update(mId: string, manufacturer: IManufacturer) {
        this.fetching = true;
        const response = await manufacturerService.update(mId, manufacturer);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            await this.getList();
            message.success("Cập nhật nhà sản xuất thành công!");
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async delete(mId: string) {
        this.fetching = true;
        const response: any = await manufacturerService.delete(mId);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            await this.getList();
            message.success("Xóa nhà sản xuất thành công!");
        } else {
            message.error(response.body.message);
        }
    }
}

export const manufacturerStore = new ManufacturerStore();
