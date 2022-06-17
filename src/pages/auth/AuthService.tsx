import {postRequest} from "../../common/helpers/RequestHelper";

class AuthService {


    public login(user: any) {
        return postRequest("/v1/auth/signin", user);
    }
}

export const authService = new AuthService();
