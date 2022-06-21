import {apiFileRequest, deleteRequest, getRequest, postRequest, putRequest} from "../../common/helpers/RequestHelper";
import {IMedia} from "./MediaStore";

class MediaService {
    public getList(params?: any) {
        return getRequest("/v1/media", params)
    }

    public update(mediaId: string, media: IMedia) {
        return putRequest(`/v1/media/${mediaId}`, media)
    }

    public upload(formData: any) {
        return apiFileRequest(`/v1/media/upload`, formData)
    }

    public delete(mediaIds: any) {
        return deleteRequest(`/v1/media`, mediaIds)
    }

    public createFolder(data: any) {
        return postRequest("/v1/media/createFolder", data);
    }
}

export const mediaService = new MediaService();
