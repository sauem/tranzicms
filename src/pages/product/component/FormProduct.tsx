import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import BreadPath from "../../../common/BreadPath";
import {Button, Card, Checkbox, Col, Form, Input, InputNumber, Row, Select, Space, Tabs} from "antd";
import {STATUS, STATUS_ACTIVE} from "../../../common/Contants";
import ArchiveSelect from "../../../components/ArchiveSelect";
import MediaButton from "../../media/MediaButton";
import Helper from "../../../common/Helper";
import TabPrice from "./_TabPrice";
import TabAttribute from "./_TabAttribute";
import TabInfo from "./_TabInfo";
import TabType from "./_TabType";
import {IProduct, productStore} from "../ProductStore";
import TabDocument from "./_TabDocument";
import TabReferProduct from "./_TabReferProduct";
import TabSameProduct from "./_TabSameProduct";
import {useParams} from "react-router-dom";

const FormProduct = () => {
    const router: any = useParams();

    const [form] = Form.useForm();
    const [isUpdate, setUpdate] = useState(false);
    const onFinish = async (data: IProduct) => {
        console.log("P", data)
        if (isUpdate) {
            await productStore.update(data.id, data);
        } else {
            await productStore.create(data);
        }
    }
    useEffect(() => {
        if (productStore.product != undefined) {
            form.setFieldsValue({
                ...productStore.product,
                categoryId: productStore.product?.category?.id
            });
            setUpdate(true)
        }
    }, [productStore.product])
    useEffect(() => {
        (async () => {
            await productStore.getDetail(router.id);
        })()
    }, [])
    return (
        <>
            <BreadPath items={[
                {name: 'Tranzi', link: '/'},
                {name: 'Danh sách sản phẩm', link: '/product'},
                {name: 'Thêm/sửa sản phẩm'}
            ]}/>
            <Form onFinish={onFinish} layout={`vertical`} form={form}>
                <Row gutter={[8, 8]}>

                    <Col sm={16}>
                        <Card>
                            <Tabs defaultActiveKey={"1"}>
                                <Tabs.TabPane key={"1"} tab={`Thông tin`}>
                                    <TabInfo form={form}/>
                                </Tabs.TabPane>
                                <Tabs.TabPane key={"2"} tab={`Thuộc tính`}>
                                    <TabAttribute/>
                                </Tabs.TabPane>
                                <Tabs.TabPane key={"3"} tab={`Tài liệu`}>
                                    <TabDocument/>
                                </Tabs.TabPane>
                                <Tabs.TabPane key={"4"} tab={`Bảng giá`}>
                                    <TabPrice/>
                                </Tabs.TabPane>
                                <Tabs.TabPane key={"5"} tab={`Phân loại`}>
                                    <TabType/>
                                </Tabs.TabPane>
                                <Tabs.TabPane key={"6"} tab={`Sản phẩm gợi ý`}>
                                    <TabReferProduct form={form}/>
                                </Tabs.TabPane>
                                <Tabs.TabPane key={"7"} tab={`Sản phẩm tương tự`}>
                                    <TabSameProduct form={form}/>
                                </Tabs.TabPane>
                            </Tabs>
                        </Card>
                    </Col>
                    <Col sm={8}>
                        <Card extra={<Button loading={productStore.acLoad} htmlType={`submit`}
                                             type={`primary`}>Lưu</Button>} title={`Thiết lập`}>
                            <Form.Item name={`categoryId`} rules={[{required: true}]}
                                       label={`Danh mục`}>
                                <ArchiveSelect
                                    type={`PRODUCT`} name={`categoryId`}/>
                            </Form.Item>
                            <Form.Item
                                rules={[{required: true}]}
                                initialValue={STATUS_ACTIVE}
                                label={`Trạng thái`} name={`state`}>
                                <Select allowClear>
                                    {STATUS.map(stt => <Select.Option
                                        key={stt.value}
                                        value={stt.value}>
                                        {stt.title}</Select.Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                noStyle
                                valuePropName={`checked`}
                                initialValue={false}
                                name={`isPopular`}
                                label={false}>
                                <Checkbox>Sản phẩm phổ biến</Checkbox>
                            </Form.Item>
                            <Form.Item
                                noStyle
                                valuePropName={`checked`}
                                initialValue={false}
                                name={`isNew`}
                                label={false}>
                                <Checkbox>Sản phẩm mới</Checkbox>
                            </Form.Item>
                            <Form.Item
                                valuePropName={`checked`}
                                initialValue={false}
                                name={`isHot`}
                                label={false}>
                                <Checkbox>Sản bán chạy</Checkbox>
                            </Form.Item>

                            <Space>
                                <Form.Item
                                    rules={[{required: true}]}
                                    initialValue={0}
                                    label={`Giá mặc định`} name={`price`}>
                                    <InputNumber
                                        formatter={Helper.replaceNum}
                                        parser={Helper.parser}
                                        addonAfter={`đ`}/>
                                </Form.Item>
                                <Form.Item
                                    rules={[{required: true}]}
                                    initialValue={0}
                                    label={`Giá giảm`} name={`salePrice`}>
                                    <InputNumber
                                        formatter={Helper.replaceNum}
                                        parser={Helper.parser}
                                        addonAfter={`đ`}/>
                                </Form.Item>
                            </Space>

                            <Form.Item
                                label={`Ảnh đại diện`}>
                                <MediaButton
                                    init={isUpdate}
                                    field={`avatar`}
                                    name={`imageId`}
                                    form={form}
                                />
                            </Form.Item>
                            <Form.Item
                                label={`Ảnh thumbs`}>
                                <MediaButton
                                    init={isUpdate}
                                    field={`thumbs`}
                                    name={`thumbsId`}
                                    form={form}
                                />
                            </Form.Item>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
export default observer(FormProduct)
