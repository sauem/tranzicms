import {getRequest, postRequest, putRequest} from "../../common/helpers/RequestHelper";
import {ISetting} from "./SettingStore";

class SettingService {
    public getList() {
        return getRequest("/v1/setting")
    }

    public save(settings: Array<ISetting>) {
        return postRequest("/v1/setting", settings);
    }
}

export const settingService = new SettingService();
