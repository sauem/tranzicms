import {apiFileRequest, deleteRequest, getRequest, postRequest, putRequest} from "../../common/helpers/RequestHelper";
import {IProduct} from "./ProductStore";

class ProductService {
    public getListArchive(params?: any) {
        return getRequest("/v1/category", params)
    }

    public getList(params?: any) {
        return getRequest("/v1/product", params)
    }

    public searchKey(key?: any) {
        return getRequest(`/v1/product/searchKey?key=${key}`)
    }

    public getDetail(productId: any) {
        return getRequest(`/v1/product/${productId}`)
    }

    public create(data: IProduct) {
        return postRequest("/v1/product", data);
    }

    public update(productId: string, data: IProduct) {
        return putRequest(`/v1/product/${productId}`, data);
    }

    public delete(productId: string) {
        return deleteRequest(`/v1/product/${productId}`);
    }

    public deleteMultiple(ids: any) {
        return deleteRequest(`/v1/product/multiple`, ids);
    }

    public import(data: any) {
        return apiFileRequest(`/v1/upload`, data);
    }
}

export const productService = new ProductService();
