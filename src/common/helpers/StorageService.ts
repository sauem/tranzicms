import {eraseCookie, getCookie, setCookie} from "./Utils";
import {TOKEN_EXPIRE_DAYS, TOKEN_NAME} from "../Contants";

export default class StorageService {
    public static getToken(): string | null{
        return getCookie(TOKEN_NAME);
    }
    public static removeToken() {
        eraseCookie(TOKEN_NAME);
    }

    public static setToken(token: String) {
        setCookie(TOKEN_NAME, token, TOKEN_EXPIRE_DAYS);
    }

    public static isTokenExits() {
        return StorageService.getToken() !== null;
    }

    public static setLocalStore(key: any, value: any) {
        localStorage.setItem(key, value);
    }

    public static getLocalStore(key: any) {
        return localStorage.getItem(key);
    }

    public static setUUID(uuid: string) {
        const newUserId = uuid.replace("-", "");
        this.setLocalStore("uuid", newUserId);
    }

    public static getUUID() {
        return this.getLocalStore("uuid");
    }
}
