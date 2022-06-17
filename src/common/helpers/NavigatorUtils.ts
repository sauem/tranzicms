import history from 'history/browser';

class NavigatorUtils {
    public redirect(router: string) {
        // history.push(router)
        window.location.href = router
        return
    }

    public getPathName(): string {
        return  window.location.pathname;
    }
}

export const  navigatorUtils = new NavigatorUtils();

