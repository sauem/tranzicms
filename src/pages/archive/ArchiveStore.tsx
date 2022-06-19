import {action, makeObservable, observable} from "mobx";
import {archiveService} from "./ArchiveService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {message} from "antd";

export interface ICategory {
    name: string,
    slug: string,
    showHome: boolean,
    sortOrder: number,
    imageId?: string,
    coverId?: string,
    bannerId?: string,
    iconId?: string
    parentId?: string
}

class ArchiveStore {
    @observable fetching: boolean = false;
    @observable acLoad: boolean = false;

    constructor() {
        makeObservable(this);
    }

    @action
    async delete(categoryId: string) {
        this.acLoad = true;
        const response = await archiveService.delete(categoryId);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Xoá danh mục thành công!");
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async create(category: ICategory) {
        this.acLoad = true;
        const response = await archiveService.create(category);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Tạo danh mục thành công!");
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async update(categoryId: string, category: ICategory) {
        this.acLoad = true;
        const response = await archiveService.update(categoryId, category);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Cập nhật danh mục thành công!");
        } else {
            message.error(response.body.message);
        }
    }
}

export const archiveStore = new ArchiveStore();
