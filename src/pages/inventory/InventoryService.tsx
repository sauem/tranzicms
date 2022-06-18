import {getRequest} from "../../common/helpers/RequestHelper";

class InventoryService {
    public getList(params?: any) {
        return getRequest("/v1/inventory/products", params)
    }

    public changeConfirmImport(invId: string) {
        return getRequest(`/v1/inventory/${invId}`)
    }
}

export const inventoryService = new InventoryService();
