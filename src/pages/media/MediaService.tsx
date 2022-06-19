import {apiFileRequest, deleteRequest, getRequest, putRequest} from "../../common/helpers/RequestHelper";
import {IMedia} from "./MediaStore";

class MediaService {
    public getList(params?: any) {
        return getRequest("/v1/media", params)
    }

    public update(mediaId: string, media: IMedia) {
        return putRequest(`/v1/media/${mediaId}`, media)
    }

    public upload(formData: any) {
        return apiFileRequest(`/v1/media`, formData)
    }

    public delete(mediaId: string) {
        return deleteRequest(`/v1/media/${mediaId}`)
    }
}

export const mediaService = new MediaService();
