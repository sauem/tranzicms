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
import ArchiveSelect from "../../components/ArchiveSelect";

export interface IMenuItem {
    name: string,
    slug: string,
    type: string,
    icon: any,
    id: any,
    children?: any
}

const MenuSetting = () => {
    const [fetching, setFetching] = useState(false);
    const [formItem] = Form.useForm();
    const [formArchiveArticle] = Form.useForm();
    const [formArchiveProduct] = Form.useForm();
    const [formCustom] = Form.useForm();
    const [formMenu] = Form.useForm();
    const [menuItems, setMenuItems] = useState<Array<IMenuItem>>([]);
    const onRemove = (item: IMenuItem, list: Array<IMenuItem>) => {
        const newList: any = list.filter((m, index) => {
            if (m.children) {
                m.children = onRemove(item, m.children)
                // return true;
            }
            return m.id != item.id;
        });
        return newList;
    }
    const renderItem = (props: { item: IMenuItem, callback: any }) => {
        const value: IMenuItem = props.item;
        return <Collapse className={`sort-item`}>
            <Collapse.Panel
                showArrow={false}
                key={value.id}
                extra={<Button onClick={() => {
                    const list = onRemove(value, menuItems);
                    setMenuItems(list)
                }}
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
                        <MediaButton
                            default={value.icon ? [value.icon] : []}
                            callback={(medias: any) => {
                                if (medias.length > 0) {
                                    const media = medias[0];
                                    props.callback(value.id, 'icon', media)
                                }
                            }}
                            name={`icon`}
                            form={formItem}
                        />
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

    const addMenuItem = (menu: any) => {
        let item = {
            name: menu.title,
            slug: menu.value,
            type: menu.type,
            icon: menu.icon,
            id: uuidv4()
        };
        // switch (item.type) {
        //     case "ARCHIVE_PRODUCT":
        //         item = {...item, slug: `/san-pham/${item.slug}`}
        //         break;
        //     case "ARCHIVE_ARTICLE":
        //         break;
        // }
        setMenuItems([...menuItems, item])
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
                                <Form onFinish={addMenuItem} labelCol={{sm: 8}}
                                      labelAlign={`left`}>
                                    <Form.Item
                                        rules={[{required: true}]}
                                        name={`title`} label={`Tiêu đề`}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item initialValue={`STATIC_PAGE`} name={`type`} label={false} hidden>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{required: true}]}
                                        name={`value`} label={`Trang`}>
                                        <Select
                                            options={[
                                                {label: 'Trang chủ', value: ''},
                                                {label: 'Sản phẩm', value: 'san-pham'},
                                                {label: 'Liên hệ', value: 'contact'},
                                                {label: 'Giới thiệu', value: 'about'},
                                                {label: 'BOM', value: 'bom'},
                                            ]}
                                        />
                                    </Form.Item>
                                    <div className={`text-right`}>
                                        <Button htmlType={`submit`} type={`primary`}>Lưu</Button>
                                    </div>
                                </Form>
                            </Collapse.Panel>
                            <Collapse.Panel key={`2`} header={`Danh mục bài viết`}>
                                <Form form={formArchiveArticle} onFinish={addMenuItem} labelCol={{sm: 8}}
                                      labelAlign={`left`}>
                                    <Form.Item name={`title`} label={`Tiêu đề`}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item label={`Danh mục`}>
                                        <ArchiveSelect
                                            fields={{label: 'name', value: 'slug', children: 'children'}}
                                            type={`ARTICLE`}
                                            name={`value`}/>
                                    </Form.Item>
                                    <Form.Item initialValue={`ARCHIVE_ARTICLE`} name={`type`} label={false} hidden>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item label={`Icon`}>
                                        <MediaButton
                                            returnField={`object`}
                                            name={`icon`}
                                            form={formArchiveArticle}
                                        />
                                    </Form.Item>
                                    <div className={`text-right`}>
                                        <Button htmlType={`submit`} type={`primary`}>Lưu</Button>
                                    </div>
                                </Form>
                            </Collapse.Panel>
                            <Collapse.Panel key={`3`} header={`Danh mục sản phẩm`}>
                                <Form form={formArchiveProduct} onFinish={addMenuItem} labelCol={{sm: 8}}
                                      labelAlign={`left`}>
                                    <Form.Item name={`title`} label={`Tiêu đề`}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item label={`Danh mục`}>
                                        <ArchiveSelect
                                            fields={{label: 'name', value: 'slug', children: 'children'}}
                                            type={`PRODUCT`}
                                            name={`value`}/>
                                    </Form.Item>
                                    <Form.Item initialValue={`ARCHIVE_PRODUCT`} name={`type`} label={false} hidden>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item label={`Icon`}>
                                        <MediaButton
                                            returnField={`object`}
                                            name={`icon`}
                                            form={formArchiveProduct}
                                        />
                                    </Form.Item>
                                    <div className={`text-right`}>
                                        <Button htmlType={`submit`} type={`primary`}>Lưu</Button>
                                    </div>
                                </Form>
                            </Collapse.Panel>
                            <Collapse.Panel key={`4`} header={`Tùy chỉnh`}>
                                <Form form={formCustom} onFinish={addMenuItem} labelCol={{sm: 8}} labelAlign={`left`}>
                                    <Form.Item
                                        rules={[{required: true}]}
                                        name={`title`} label={`Tiêu đề`}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item initialValue={`CUSTOM_PAGE`} name={`type`} label={false} hidden>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        rules={[{required: true}]}
                                        name={`value`} label={`Url`}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item label={`Icon`}>
                                        <MediaButton
                                            returnField={`object`}
                                            name={`icon`}
                                            form={formCustom}
                                        />
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
