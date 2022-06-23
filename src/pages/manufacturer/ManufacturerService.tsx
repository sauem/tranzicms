import {deleteRequest, getRequest, postRequest, putRequest} from "../../common/helpers/RequestHelper";
import {IManufacturer} from "./manufacturerStore";

class ManufacturerService {
    public getList(params?: any) {
        return getRequest("/v1/manufacturer", params)
    }

    public create(data: IManufacturer) {
        return postRequest("/v1/manufacturer", data)
    }

    public update(mId: string, data: IManufacturer) {
        return putRequest(`/v1/manufacturer/${mId}`, data)
    }

    public delete(mId: string) {
        return deleteRequest(`/v1/manufacturer/${mId}`)
    }
}

export const manufacturerService = new ManufacturerService();
