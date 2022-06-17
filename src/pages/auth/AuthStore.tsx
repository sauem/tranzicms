import {makeObservable, observable} from "mobx";
import {authService} from "./AuthService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {userStore} from "../user/UserStore";
import StorageService from "../../common/helpers/StorageService";
import {navigatorUtils} from "../../common/helpers/NavigatorUtils";
import {message} from "antd";

class AuthStore {
    @observable acLoad: boolean = false;

    constructor() {
        makeObservable(this);
    }

    async login(data: any) {
        if (this.acLoad) return false;
        this.acLoad = true;
        const response = await authService.login(data);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            userStore.profile = {
                userId: response.body.id,
                userName: response.body.username,
                displayName: response.body.username,
                roles: response.body.roles
            }

            StorageService.setToken(response.body.token);
            navigatorUtils.redirect("/");
        } else {
            message.error(response.body.message);
        }
    }

    async lougout() {
        userStore.profile = null;
        StorageService.removeToken();
        navigatorUtils.redirect('/')
    }
}

export const authStore = new AuthStore();
