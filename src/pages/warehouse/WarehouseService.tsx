import {apiFileRequest, deleteRequest, getRequest, postRequest, putRequest} from "../../common/helpers/RequestHelper";
import {IProductStock, IWarehouse} from "./WarehouseStore";

class WarehouseService {
    public getList(params?: any) {
        return getRequest("/v1/warehouse", params)
    }

    public create(data: IWarehouse) {
        return postRequest("/v1/warehouse", data);
    }

    public update(warehouseId: string, data: IWarehouse) {
        return putRequest(`/v1/warehouse/${warehouseId}`, data);
    }

    public delete(warehouseId: string) {
        return deleteRequest(`/v1/warehouse/${warehouseId}`);
    }

    public singleProductImport(warehouseId: string, stock: IProductStock) {
        return postRequest(`/v1/warehouse/${warehouseId}/import`, stock)
    }

    public multiProductImport(warehouseId: string, data: any) {
        return apiFileRequest(`/v1/upload`, data)
    }
}

export const warehouseService = new WarehouseService();
