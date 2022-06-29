import {ICategory} from "./ArchiveStore";
import {deleteRequest, getRequest, postRequest, putRequest} from "../../common/helpers/RequestHelper";

class ArchiveService {
    public getList(params?: any) {
        return getRequest("/v1/category", params);
    }

    public create(category: ICategory) {
        return postRequest("/v1/category", category);
    }

    public update(categoryId: string, category: ICategory) {
        return putRequest(`/v1/category/${categoryId}`, category);
    }

    public delete(categoryId: any) {
        return deleteRequest(`/v1/category/${categoryId}`);
    }
}

export const archiveService = new ArchiveService();
