import {deleteRequest, getRequest, postRequest, putRequest} from "../../common/helpers/RequestHelper";
import {IArticle} from "./ArticleStore";

class ArticleService {
    public getList(params?: any) {
        return getRequest("/v1/article", params)
    }

    public getDetail(articleId: string) {
        return getRequest(`/v1/article/${articleId}`)
    }

    public create(article: IArticle) {
        return postRequest("/v1/article", article);
    }

    public update(articleId: string, article: IArticle) {
        return putRequest(`/v1/article/${articleId}`, article)
    }

    public delete(articleId: string) {
        return deleteRequest(`/v1/article/${articleId}`);
    }

}

export const articleService = new ArticleService();
