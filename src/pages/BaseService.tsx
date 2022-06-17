import {makeObservable, observable} from "mobx";
import {Role} from "../common/constants/Role";
import {userStore} from "./user/UserStore";

export class BaseService {
    @observable userRole: Role | undefined;

    constructor() {
        makeObservable(this);
    }
}
