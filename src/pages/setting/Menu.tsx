import {observer} from "mobx-react";
import BreadPath from "../../common/BreadPath";
import {SortableContainer, arrayMove, SortableHandle, SortableElement} from 'react-sortable-hoc';

import {Button, Card, Col, Collapse, Form, Input, message, Row, Select, Space} from "antd";
import {useEffect, useRef, useState} from "react";
import MediaButton from "../media/MediaButton";
import Nestable from 'antd-nestable';
import {v4 as uuidv4} from 'uuid';
import {ISetting, settingStore} from "./SettingStore";
import {settingService} from "./SettingService";
import HttpStatusCode from "../../common/constants/HttpErrorCode";

export interface IMenuItem {
    name: string,
    slug: string,
    type: string,
    id: any,
    children?: any
}

const MenuSetting = () => {
    const [fetching, setFetching] = useState(false);
    const [formItem] = Form.useForm();
    const [formMenu] = Form.useForm();
    const [menuItems, setMenuItems] = useState<Array<IMenuItem>>([]);

    const renderItem = (props: { item: IMenuItem, callback: any }) => {
        const value: IMenuItem = props.item;
        return <Collapse className={`sort-item`}>
            <Collapse.Panel
                showArrow={false}
                key={value.id}
                extra={<Button onClick={() => setMenuItems(menuItems.filter(m => m.id != value.id))}
                               size={`small`}><i className={`icon icon-trash`}/></Button>}
                header={<Space><strong>{value.name}</strong></Space>}>
                <Form labelCol={{sm: 8}} labelAlign={`left`}>
                    <Form.Item initialValue={value.name} name={`name`} className={`mb-2`} label={`Tiêu đề`}>
                        <Input onChange={(event => props.callback(value.id, 'name', event.target.value))}/>
                    </Form.Item>
                    <Form.Item initialValue={value.slug} name={`value`} className={`mb-2`} label={`Url`}>
                        <Input onChange={(event => props.callback(value.id, 'slug', event.target.value))}/>
                    </Form.Item>
                    <Form.Item className={`mb-2`} label={`Icon`}>
                        <Space>
                            <Form.Item noStyle name={`icon`}>
                                <Input onChange={(event => props.callback(value.id, 'iconUrl', event.target.value))}/>
                            </Form.Item>
                            <MediaButton
                                hideView={true}
                                name={`icon`}
                                form={formItem}
                            />
                        </Space>
                    </Form.Item>
                </Form>
            </Collapse.Panel>
        </Collapse>
    }
    const callback = (uid: string, key: string, value: any) => {
        let menuItemIndex = menuItems.findIndex(item => item.id == uid);
        menuItems[menuItemIndex] = {
            ...menuItems[menuItemIndex],
            [key]: value,
        }

        setMenuItems([...menuItems]);
    }
    const onSaveMenu = async (menu: any) => {
        await settingStore.create([{
            key: menu.position,
            value: JSON.stringify(menuItems)
        }])
    }
    const addStaticPage = (menu: any) => {
        setMenuItems([...menuItems, {
            name: menu.title,
            slug: menu.value,
            type: 'STATIC_PAGE',
            id: uuidv4()
        }])
    }
    const addCustomPage = (menu: any) => {
        setMenuItems([...menuItems, {
            name: menu.title,
            slug: menu.value,
            type: 'CUSTOM_PAGE',
            id: uuidv4()
        }])
    }
    const onGetMenu = async (key = 'main') => {
        setFetching(true);
        const response = await settingService.getSetting(key);
        setFetching(false);
        if (response.status == HttpStatusCode.SUCCESS) {
            if (response.body.value) {
                setMenuItems(JSON.parse(response.body.value))
            } else {
                setMenuItems([])
            }
        } else {
            message.error(response.body.message)
        }
    }
    useEffect(() => {
        (async () => {
            await onGetMenu()
        })()
    }, []);
    useEffect(() => {
    }, [])
    return (
        <>
            <BreadPath items={[
                {name: 'Tranzi', link: '/'},
                {name: 'Sản phẩm', link: '/product'},
            ]}/>
            <Row gutter={[8, 8]}>
                <Col sm={12}>
                    <Card>
                        <Collapse accordion defaultActiveKey={`1`}>
                            <Collapse.Panel key={`1`} header={`Trang tĩnh`}>
                                <Form onFinish={addStaticPage} labelCol={{sm: 8}}
                                      labelAlign={`left`}>
                                    <Form.Item
                                        rules={[{required: true}]}
                                        name={`title`} label={`Tiêu đề`}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{required: true}]}
                                        name={`value`} label={`Trang`}>
                                        <Select
                                            options={[
                                                {label: 'Trang chủ', value: '/home'},
                                                {label: 'Liên hệ', value: '/contact'},
                                                {label: 'Giới thiệu', value: '/about'},
                                                {label: 'BOM', value: '/bom'},
                                            ]}
                                        />
                                    </Form.Item>
                                    <div className={`text-right`}>
                                        <Button htmlType={`submit`} type={`primary`}>Lưu</Button>
                                    </div>
                                </Form>
                            </Collapse.Panel>
                            <Collapse.Panel key={`2`} header={`Danh mục bài viết`}>
                                <Form className={`text-right`} labelCol={{sm: 8}} labelAlign={`left`}>
                                    <Form.Item label={`Tiêu đề`}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item label={`Url`}>
                                        <Input/>
                                    </Form.Item>
                                    <Button htmlType={`submit`} type={`primary`}>Lưu</Button>
                                </Form>
                            </Collapse.Panel>
                            <Collapse.Panel key={`3`} header={`Danh mục sản phẩm`}>
                                <Form className={`text-right`} labelCol={{sm: 8}} labelAlign={`left`}>
                                    <Form.Item label={`Tiêu đề`}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item label={`Url`}>
                                        <Input/>
                                    </Form.Item>
                                    <Button type={`primary`}>Lưu</Button>
                                </Form>
                            </Collapse.Panel>
                            <Collapse.Panel key={`4`} header={`Tùy chỉnh`}>
                                <Form onFinish={addCustomPage} labelCol={{sm: 8}} labelAlign={`left`}>
                                    <Form.Item
                                        rules={[{required: true}]}
                                        name={`title`} label={`Tiêu đề`}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{required: true}]}
                                        name={`value`} label={`Url`}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item label={`Icon url`}>
                                        <Space>
                                            <Input name={`iconUrl`}/>
                                            <MediaButton
                                                hideView={true}
                                                name={`icon`}
                                                form={formItem}
                                            />
                                        </Space>
                                    </Form.Item>
                                    <div className={`text-right`}>
                                        <Button htmlType={`submit`} type={`primary`}>Lưu</Button>
                                    </div>
                                </Form>
                            </Collapse.Panel>
                        </Collapse>
                    </Card>
                </Col>
                <Col sm={12}>
                    <Form onFinish={onSaveMenu} form={formMenu}>
                        <Card extra={<Space>
                            <Form.Item initialValue={`main`} noStyle name={`position`}>
                                <Select onChange={value => onGetMenu(value)} style={{width: 150}}>
                                    <Select.Option value={`main`}>Main</Select.Option>
                                    <Select.Option value={`footer`}>Footer</Select.Option>
                                    <Select.Option value={`sidebar`}>Sidebar</Select.Option>
                                    <Select.Option value={`top`}>Header top</Select.Option>
                                </Select>
                            </Form.Item>
                            <Button loading={settingStore.acLoad} htmlType={`submit`}>Lưu menu</Button>
                        </Space>} className={`sort-area`}>
                            <Nestable
                                onChange={async (value: []) => {
                                    setMenuItems(value)
                                }}
                                maxDepth={3}
                                items={menuItems} renderItem={(props: any) => renderItem({...props, callback})}/>
                        </Card>
                    </Form>

                </Col>
            </Row>
        </>
    )
}
export default observer(MenuSetting)
