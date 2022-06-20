import {action, computed, makeAutoObservable, makeObservable, observable} from "mobx";
import {userService} from "./UserService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import {message} from "antd";
import Helper from "../../common/Helper";
import {Role} from "../../common/constants/Role";
import {inject} from "mobx-react";
import StorageService from "../../common/helpers/StorageService";
import {navigatorUtils} from "../../common/helpers/NavigatorUtils";

export interface IUser {
    "fullName": string,
    "username": string,
    "password": string,
    "expire"?: string,
    "status": boolean,
    "email": string,
    "groupId": string,
    "vehicleGroupIds": any,
    "phone": string,
    "role": any
}

class UserStore {
    @observable fetching: boolean = false;
    @observable acLoad: boolean = false;
    @observable list: any = [];
    @observable listAssign: any = [];
    @observable assignPage: any = {};
    @observable activities: any = [];
    @observable activityPage: any = {};
    @observable groupList: any = [];
    @observable groupPage: any = null;
    @observable page: any = null;
    @observable profile: any = null;
    @observable userGroup: any = [];
    @observable userGroupPage: any = null;
    @observable _ROLE: Role | undefined;
    @observable _AGENT: string | undefined;

    //  @observable userRole: Role | undefined;

    constructor() {
        makeObservable(this);
    }

    @action
    async getList(params = {}) {
        this.fetching = true;
        await this.getProfile();
        const response = await userService.getList({
            ...params,
        });
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            this.list = response.body.data;
            this.page = Helper.toPage(response.body.metadata);
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async getProfile() {
        this.fetching = true
        const response = await userService.getProfile();
        this.fetching = false
        if (response.status === HttpStatusCode.SUCCESS) {
            this.profile = {
                userId: response.body.id,
                userName: response.body.username,
                displayName: response.body.fullName,
                agent: response.body.agent,
                roles: response.body.roles,
            }
        } else {
            userStore.profile = null;
            StorageService.removeToken();
            navigatorUtils.redirect('/')
        }
    }

    @action
    async create(user: IUser) {
        this.acLoad = true;
        const response = await userService.create(user);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Tạo thài khoản thành công!")
            await this.getList();
        } else if (response.status === HttpStatusCode.FOUNDED) {
            message.error('Tài khoản đã tồn tại!');
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async resetPassword(username: string, data: any) {
        this.acLoad = true;
        const response = await userService.reset(username, data);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Đặt lại mật khẩu thành công!")
            await this.getList();
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async delete(userId: any) {
        this.acLoad = true;
        const response = await userService.delete(userId);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Xoá tài khoản thành công!")
            await this.getList();
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async update(username: string, user: IUser) {
        this.acLoad = true;
        const response = await userService.update(username, user);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Cập nhật thài khoản thành công!")
            await this.getList();
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async getGroups(params = {}) {
        this.fetching = true;
        const response = await userService.getGroup(params);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            this.groupList = response.body.data;
            this.groupPage = Helper.toPage(response.body.metadata);
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async getGroupUsers(groupId: any, params = {}) {
        this.fetching = true;
        const response = await userService.getGroupUsers(groupId, params);
        this.fetching = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            this.userGroup = response.body.data;
            this.userGroupPage = Helper.toPage(response.body.metadata);
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async createGroup(group: any) {
        this.acLoad = true;
        const response = await userService.createGroup(group);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Tạo nhóm tài khoản thành công!")
            await this.getGroups({isParent: true});
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async updateGroup(groupId: string, group: any) {
        this.acLoad = true;
        const response = await userService.updateGroup(groupId, group);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Cập nhật nhóm tài khoản thành công!")
            await this.getGroups({isParent: true});
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async deleteGroup(groupId: string) {
        this.acLoad = true;
        const response = await userService.deleteGroup(groupId);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Xóa nhóm tài khoản thành công!")
            await this.getGroups({isParent: true});
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async exportUser(params = {}) {
        this.acLoad = true;
        await userService.exportUser(params);
        this.acLoad = false;
    }

    @action
    async getVehicleAssign(username: string | undefined, params?: any) {
        this.acLoad = true;
        const response = await userService.getVehicleAssign(username, params);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            this.listAssign = response.body.data;
            this.assignPage = Helper.toPage(response.body.metadata)
        } else {
            message.error(response.body.message);
        }
    }

    @action
    async getActivities(username: string | undefined, params?: any) {
        this.acLoad = true;
        const response = await userService.getActivities(username, params);
        this.acLoad = false;
        if (response.status == HttpStatusCode.SUCCESS) {
            this.activities = response.body.data;
            this.activityPage = Helper.toPage(response.body.metadata)
        } else {
            message.error(response.body.message);
        }
    }
}

export const userStore = new UserStore();
