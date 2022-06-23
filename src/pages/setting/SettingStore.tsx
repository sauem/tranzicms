import {getRequest, putRequest} from "../../common/helpers/RequestHelper";
import {action, makeObservable, observable} from "mobx";
import {settingService} from "./SettingService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {message} from "antd";
import {IMedia} from "../media/MediaStore";

export interface ISetting {
    key: string,
    value: string | undefined,
    thumb: IMedia | undefined
}

class SettingStore {
    @observable settings: Array<ISetting> = [];
    @observable fetching: boolean = false;
    @observable acLoad: boolean = false;

    constructor() {
        makeObservable(this);
    }

    @action
    async getList() {
        this.fetching = true;
        const response = await settingService.getList();
        this.fetching = false;
        if (response.status === HttpStatusCode.SUCCESS) {
            this.settings = response.body;
        } else {
            message.error(response.body.message)
        }
    }

    @action
    async create(data: Array<ISetting>) {
        this.acLoad = true;
        const response = await settingService.save(data);
        this.acLoad = false;
        if (response.status === HttpStatusCode.SUCCESS) {
            message.success("Lưu cài đặt thành công!")
        } else {
            message.error(response.body.message)
        }
    }
}

export const settingStore = new SettingStore();
