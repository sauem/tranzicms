import {observer} from "mobx-react";
import BreadPath from "../../common/BreadPath";
import {SortableContainer, arrayMove, SortableHandle, SortableElement} from 'react-sortable-hoc';

import {Button, Card, Col, Collapse, Form, Input, Row, Select, Space} from "antd";
import {useState} from "react";
import MediaButton from "../media/MediaButton";


const DragHandle = SortableHandle(() => <i className={`icon icon-menu`}/>);


export interface IMenuItem {
    name: string,
    slug: string,
    type: string,
    key: any,
    children?: any
}

const MenuSetting = () => {
    const [formItem] = Form.useForm();
    const [menuItems, setMenuItems] = useState<Array<IMenuItem>>([
        {key: 2, name: 'Liên hệ', slug: "/", type: 'CUSTOM'},
        {key: 3, name: 'Giới thiệu', slug: "/", type: 'CUSTOM'},
    ]);

    const SortableItem = SortableElement(({value}: any) => {
        return (
            <Collapse className={`sort-item`}>
                <Collapse.Panel
                    showArrow={false}
                    key={value.key}
                    extra={<Button onClick={() => setMenuItems(menuItems.filter(m => m.key != value.key))}
                                   size={`small`}><i className={`icon icon-trash`}/></Button>}
                    header={<Space><DragHandle/> <strong>{value.name}</strong></Space>}>
                    <Form form={formItem} labelCol={{sm: 8}} labelAlign={`left`}>
                        <Form.Item className={`mb-2`} label={`Label`}>
                            <Input/>
                        </Form.Item>
                        <Form.Item className={`mb-2`} label={`Url`}>
                            <Input/>
                        </Form.Item>
                        <Form.Item className={`mb-2`} label={`Icon url`}>
                            <Space>
                                <Input/>
                                <MediaButton
                                    hideView={true}
                                    name={`iconUrl`}
                                    form={formItem}
                                />
                            </Space>
                        </Form.Item>
                    </Form>
                </Collapse.Panel>
            </Collapse>

        )
    });
    const SortableList = SortableContainer(({items}: any) => {
        return (
            <div>
                {items.map((value: any, index: number) => (
                    <SortableItem key={`item-${value}`} index={index} value={value}/>
                ))}
            </div>
        );
    });
    const onSortEnd = ({oldIndex, newIndex}: any) => {

    };
    return (
        <>
            <BreadPath items={[
                {name: 'Tranzi', link: '/'},
                {name: 'Sản phẩm', link: '/product'},
            ]}/>
            <Row gutter={[8, 8]}>
                <Col sm={12}>
                    <Card>

                    </Card>
                </Col>
                <Col sm={12}>
                    <Card extra={<Space>
                        <Select style={{width: 150}}>
                            <Select.Option value={`main`}>Main</Select.Option>
                            <Select.Option value={`footer`}>Footer</Select.Option>
                            <Select.Option value={`sidebar`}>Sidebar</Select.Option>
                            <Select.Option value={`top`}>Header top</Select.Option>
                        </Select>
                        <Button>Lưu menu</Button>
                    </Space>} className={`sort-area`}>
                        <SortableList
                            distance={8}
                            useDragHandle
                            items={menuItems} onSortEnd={onSortEnd}/>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default observer(MenuSetting)
