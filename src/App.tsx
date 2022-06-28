import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import './App.css';
import './index.scss';
import 'leaflet/dist/leaflet.css';
import {Image, Layout, Menu, Modal} from 'antd';
import Sidebar from "./components/Sidebar";
import ContentRouter from "./routers/ContentRouter";
import StorageService from "./common/helpers/StorageService";
import PublicRouter from "./routers/PublicRouter";
import {IProfile, IUser, userStore} from "./pages/user/UserStore";
import {navigatorUtils} from "./common/helpers/NavigatorUtils";
import {authStore} from "./pages/auth/AuthStore";
import {common} from "./common/CommonStore";

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const {Header, Content, Footer, Sider} = Layout;
    const [user, setUser] = useState<IProfile | undefined>(undefined);
    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    };
    useEffect(() => {
        document.title = common.title;
        (async () => {
                if (StorageService.isTokenExits()) {
                    await userStore.getProfile();
                    await setUser(userStore.profile)
                } else {
                    if (navigatorUtils.getPathName() !== "/") {
                        navigatorUtils.redirect("/")
                    }
                }
            }
        )();
    }, [])
    return (
        <>
            {StorageService.isTokenExits() ? <Layout id={`components-layout-demo-side`} style={{minHeight: '100vh'}}>
                <Sider
                    trigger={null}
                    style={{
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        height: '100%'
                    }}
                    theme={`light`} collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className={`logo`}>
                        <Image
                            preview={false}
                            height={`auto`}
                            width={200}
                            src={"/img/tranzi.png"}
                        />
                    </div>
                    <Sidebar/>
                </Sider>

                <Layout
                    style={{
                        marginLeft: 200
                    }}
                    className="site-layout"
                >
                    <Header className="site-layout-background"
                            style={{
                                padding: 0,
                                position: "fixed",
                                right: 0,
                                zIndex: 99,
                                top: 0,
                                display: 'flex',
                                justifyContent: 'flex-end',
                                width: 'calc(100% - 200px)'
                            }}>
                        <div className={`actions`}>
                            <span className={`mr-3`}>Xin chào <strong>{user?.userName}</strong></span>
                            <a onClick={() => {
                                Modal.confirm({
                                    okText: 'Đồng ý',
                                    cancelText: 'Hủy',
                                    title: 'Đăng xuất khỏi hệ thống?',
                                    onOk: () => authStore.lougout()
                                })
                            }}>Đăng xuất</a>
                        </div>
                    </Header>
                    <Content style={{margin: '80px 0 0 16px', overflowX: 'hidden'}}>
                        <div className={`container-fluid`}>
                            <ContentRouter/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout> : <PublicRouter/>}
        </>

    );
}

export default App;
