import {action, makeObservable, observable} from "mobx";
import {IPaginate} from "../../common/Contants";
import {mediaService} from "./MediaService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {message} from "antd";

export interface IMedia {

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
        const response = await mediaService.getList(params);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {

        } else {

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
    async delete(mediaId: string) {
        this.fetching = true;
        const response = await mediaService.delete(mediaId);
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
