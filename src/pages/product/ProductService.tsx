import {deleteRequest, getRequest, postRequest, putRequest} from "../../common/helpers/RequestHelper";
import {IProduct} from "./ProductStore";

class ProductService {
    public getList(params?: any) {
        return getRequest("/v1/product", params)
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
}

export const productService = new ProductService();
