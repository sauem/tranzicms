import {
    deleteRequest,
    getFileDownload,
    getRequest,
    IApiResponse,
    postRequest,
    putRequest
} from "../../common/helpers/RequestHelper";
import {IUser} from "./UserStore";

class UserService {

    public getList(params = {}) {
        return getRequest(`/v1/users`, params);
    }

    public getActivities(username: string | undefined, params: any) {
        return getRequest(`/v1/activity/${username}`, params);
    }

    public getVehicleAssign(username: string | undefined, params?: any) {
        return getRequest(`/v1/vehicles/${username}/vehicles`, params);
    }

    public create(user: IUser) {
        return postRequest(`/v1/users`, user);
    }

    public update(username: string, user: IUser) {
        return putRequest(`/v1/users/${username}`, user);
    }

    public delete(userId: any) {
        return deleteRequest(`/v1/users/${userId}`);
    }

    public getProfile(): Promise<IApiResponse> {
        return getRequest(`/v1/users/_me`)
    }

    public getGroup(params = {}) {
        return getRequest(`/v1/users/groups`, params);
    }

    public getGroupUsers(groupIds: any, params = {}) {
        return getRequest(`/v1/users/groups/users`, {
            ids: groupIds
        });
    }

    public createGroup(user: IUser) {
        return postRequest(`/v1/users/groups`, user);
    }

    public updateGroup(groupId: string, group: any) {
        return putRequest(`/v1/users/groups/${groupId}`, group);
    }

    public deleteGroup(groupId: any) {
        return deleteRequest(`/v1/users/groups/${groupId}`);
    }

    public exportUser(params: any) {
        return getFileDownload(`/v1/users/export`, params);
    }

    public reset(username: string, data: any) {
        return putRequest(`/v1/users/reset/${username}`, data);
    }
}

export const userService = new UserService();
