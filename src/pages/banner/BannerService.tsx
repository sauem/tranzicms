import {deleteRequest, getRequest, postRequest, putRequest} from "../../common/helpers/RequestHelper";

class BannerService {
    public getList(params?: any) {
        return getRequest('/v1/banner', params)
    }

    public create(banner?: any) {
        return postRequest('/v1/banner', banner)
    }

    public update(bannerId: string, banner?: any) {
        return putRequest(`/v1/banner/${bannerId}`, banner)
    }

    public delete(bannerId: string) {
        return deleteRequest(`/v1/banner/${bannerId}`)
    }
}

export const bannerService = new BannerService();
