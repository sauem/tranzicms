import {action, makeObservable, observable} from "mobx";
import {IPaginate} from "../../common/Contants";
import {mediaService} from "./MediaService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {message} from "antd";
import Helper from "../../common/Helper";

export interface IMedia {
    id?: string,
    path: string,
    objectType: string,
    name: string,
    mediaType: string,
}

class MediaStore {
    @observable list: Array<IMedia> = []
    @observable page: IPaginate | undefined;
    @observable fetching: boolean = false;
    @observable acLoad: boolean = false;

    constructor() {
        makeObservable(this);
    }

    @action
    async getList(params?: any) {
        this.fetching = true;
        const response = await mediaService.getList({
            ...params,
            size: 56
        });
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            this.list = response.body.data;
            this.page = Helper.toPage(response.body.metadata);
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async upload(formData: any) {
        this.fetching = true;
        const response = await mediaService.upload(formData);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Tải media thành công!")
            await this.getList();
        } else {
            message.error(response.body.message);

        }
    }

    @action
    async update(mediaId: string, params?: any) {
        this.fetching = true;
        const response = await mediaService.update(mediaId, params);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Cập nhật media thành công!");
            await this.getList();
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async delete(mediaIds: any) {
        this.fetching = true;
        const response = await mediaService.delete(mediaIds);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Xoá media thành công!");
            await this.getList();
        } else {
            message.error(response.body.message);
        }
    }
}

export const mediaStore = new MediaStore();
