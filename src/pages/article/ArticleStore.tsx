import {action, makeObservable, observable} from "mobx";
import {IPaginate} from "../../common/Contants";
import {articleService} from "./ArticleService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {message} from "antd";
import Helper from "../../common/Helper";
import {ICategory} from "../archive/ArchiveStore";

export interface IArticle {
    id?: string,
    name: string,
    slug: string,
    content: string,
    sortOrder: number,
    imageId: string,
    bannerId: string,
    state: boolean,
    type: string,
    categoryId: string,
    description: string,
    metaTitle: string,
    metaDescription: string,
    metaKeyword: string,
    category?: ICategory
}

class ArticleStore {
    @observable list: Array<IArticle> = [];
    @observable page: IPaginate | undefined;
    @observable detail: IArticle | undefined;
    @observable fetching: boolean = false;
    @observable acLoad: boolean = false;

    constructor() {
        makeObservable(this);
    }

    @action
    async getDetail(articleId: string) {
        this.fetching = true;
        const response = await articleService.getDetail(articleId);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            this.detail = response.body;
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async getList(params?: any) {
        this.fetching = true;
        const response = await articleService.getList(params);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            this.list = response.body.data;
            this.page = Helper.toPage(response.body.metadata);
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async create(article: IArticle) {
        this.acLoad = true;
        const response = await articleService.create(article);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            console.log("R", response)
            message.success("T???o b??i vi???t th??nh c??ng!");
            this.detail = response.body;
        } else {
            message.error(response.body.message);
        }
        return this.detail;
    }

    @action
    async update(articleId: string, article: IArticle) {
        this.fetching = true;
        const response = await articleService.update(articleId, article);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("C???p nh???t b??i vi???t th??nh c??ng!");
            this.detail = response.body;
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async delete(articleId: string) {
        this.fetching = true;
        const response = await articleService.delete(articleId);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("X??a b??i vi???t th??nh c??ng!");
            await this.getList();
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async reset() {
        this.detail = undefined;
    }
}

export const articleStore = new ArticleStore();
