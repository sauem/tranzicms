import {action, observable} from "mobx";

class CommonStore {
    @observable title = "Quản trị Tranzi";

    @action
    public async setTitle(title: string) {
        this.title = title;
    }
}

export const common = new CommonStore();
