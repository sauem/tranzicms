import {action, makeObservable, observable} from "mobx";
import {archiveService} from "./ArchiveService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {message} from "antd";
import Helper from "../../common/Helper";
import {IPaginate} from "../../common/Contants";

export interface ICategory {
    id?: string,
    name: string,
    slug: string,
    showHome: boolean,
    sortOrder: number,
    imageId?: string,
    coverId?: string,
    bannerId?: string,
    iconId?: string
    parentId?: string,
    layout?: string,
    type: string
}

class ArchiveStore {
    @observable fetching: boolean = false;
    @observable acLoad: boolean = false;
    @observable list: Array<ICategory> = [];
    @observable page: IPaginate | any;

    constructor() {
        makeObservable(this);
    }

    @action
    async getList(params: any) {
        this.fetching = true;
        const response = await archiveService.getList(params);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            this.list = response.body.data;
            this.page = Helper.toPage(response.body.metadata);
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async delete(category: ICategory) {
        this.acLoad = true;
        const response = await archiveService.delete(category.id);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Xoá danh mục thành công!");
            await this.getList({type: category.type});

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
            await this.getList({type: category.type});
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
            await this.getList({type: category.type});
        } else {
            message.error(response.body.message);
        }
    }
}

export const archiveStore = new ArchiveStore();
