import React, {useEffect, useState} from "react";
import {Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import adminRouters from "../common/Routers";
import {userStore} from "../pages/user/UserStore";
import {Role} from "../common/constants/Role";
import {observer} from "mobx-react";

const Sidebar = () => {
    const {SubMenu} = Menu;
    const [routers, setRouter] = useState<any>([]);
    useEffect(() => {
        setRouter(adminRouters)

    }, [userStore.profile])
    return (
        <Layout.Sider
            style={{
                overflow: 'auto',
                position: 'fixed',
                left: 0,
                top: 80,
                bottom: 0,
            }}
        >
            <Menu style={{height: '100%'}} theme="light" defaultSelectedKeys={['parent_0']} mode="inline">

                {routers && routers.map((router: any, index: number) => {
                    const isSub = router.subs && router.subs.length > 0;
                    return (
                        <>
                            {!isSub ?
                                (<Menu.Item key={`parent_${index}`}>
                                    <Link style={{paddingLeft: 20}} to={router.path}>
                                        <i className={`icon ${router.icon}`}/> {router.name}
                                    </Link>
                                </Menu.Item>) :
                                (<SubMenu key={`sub_${index}`}
                                          title={<div style={{paddingLeft: 20}}><i
                                              className={`icon ${router.icon}`}/> {router.name}</div>}>
                                    {router.subs && router.subs.map((sub: any, key: number) => {
                                        return <Menu.Item key={`sub2_${index}_${key}`}>
                                            <Link style={{paddingLeft: 20}} to={sub.path}>
                                                {sub.name}
                                            </Link>
                                        </Menu.Item>
                                    })}
                                </SubMenu>)
                            }
                        </>
                    )
                })}
            </Menu>
        </Layout.Sider>

    )
}
export default observer(Sidebar);
