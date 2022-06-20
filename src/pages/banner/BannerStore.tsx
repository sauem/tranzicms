import {action, makeObservable, observable} from "mobx";
import {mediaService} from "../media/MediaService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {message} from "antd";
import {IPaginate} from "../../common/Contants";
import Helper from "../../common/Helper";
import {bannerService} from "./BannerService";

export interface IBanner {
    title: string,
    subTitle: string,
    description: string,
    alt: string,
    position: any,
    sortOrder: number,
    state: any,
    device: any,
    type: any,
    image: any
}

class BannerStore {
    @observable list: Array<IBanner> = [];
    @observable page: IPaginate | undefined;
    @observable fetching: boolean = false;
    @observable acLoad: boolean = false;

    constructor() {
        makeObservable(this);
    }

    @action
    async getList(params?: any) {
        this.fetching = true;
        const response = await bannerService.getList(params);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            this.list = response.body.data;
            this.page = Helper.toPage(response.body.metadata)
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async create(banner: IBanner) {
        this.fetching = true;
        const response = await bannerService.create(banner);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Tạo banner thành công!")
            await this.getList();
        } else {
            message.error(response.body.message);

        }
    }

    @action
    async update(bannerId: string, banner: IBanner) {
        this.fetching = true;
        const response = await bannerService.update(bannerId, banner);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Cập nhật banner thành công!");
            await this.getList();
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async delete(bannerId: string) {
        this.fetching = true;
        const response = await bannerService.delete(bannerId);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Xoá banner thành công!");
            await this.getList();
        } else {
            message.error(response.body.message);
        }
    }
}

export const bannerStore = new BannerStore;
