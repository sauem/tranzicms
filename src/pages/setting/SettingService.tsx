import {getRequest, postRequest, putRequest} from "../../common/helpers/RequestHelper";
import {ISetting} from "./SettingStore";

class SettingService {
    public getList(params?: any) {
        return getRequest("/v1/setting", params)
    }

    public getSetting(key: string) {
        return getRequest(`/v1/setting/${key}`)
    }

    public save(settings: Array<ISetting>) {
        return postRequest("/v1/setting", settings);
    }
}

export const settingService = new SettingService();
