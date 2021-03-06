import BreadPath from "../../../common/BreadPath";
import {Button, Checkbox, Form, Input, InputNumber, Modal, Popconfirm, Select, Space, Spin, Table} from "antd";
import {productStore} from "../ProductStore";
import React, {useEffect, useState} from "react";
import {archiveStore} from "../../archive/ArchiveStore";
import PopupFooter from "../../../common/PopupFooter";
import Product from "./index";
import ProductArchiveSelect from "../../../common/ProductArchiveSelect";
import {STATUS, STATUS_ACTIVE} from "../../../common/Contants";
import {observer} from "mobx-react";
import {toNumber, toSlug} from "../../../common/helpers/Utils";
import Helper from "../../../common/Helper";
import ArchiveSelect from "../../../components/ArchiveSelect";
import MediaButton from "../../media/MediaButton";

const ProductArchive = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [isUpdate, setUpdate] = useState<boolean>(false);
    const [form] = Form.useForm();
    const onGetList = async (params?: any) => {
        await archiveStore.getList({
            ...params,
            type: 'PRODUCT'
        });
    }
    const onFinish = async (data: any) => {
        if (!isUpdate) {
            await archiveStore.create(data).finally(onClose)
        } else {
            await archiveStore.update(data.id, data).finally(onClose)
        }
    }
    const onClose = () => {
        setUpdate(false)
        setVisible(false)
        form.resetFields();
    }
    useEffect(() => {
        (async () => onGetList())();
    }, [])
    return (
        <>
            <BreadPath items={[
                {name: 'Tranzi', link: '/'},
                {name: 'Sản phẩm', link: '/product'},
                {name: 'Danh mục', link: '/product/archive'}
            ]}/>

            <Spin spinning={archiveStore.fetching}>
                <div className={`text-right mb-3`}>
                    <Button onClick={() => setVisible(true)}>Tạo danh mục</Button>
                </div>
                <Table
                    rowKey={'id'}
                    dataSource={archiveStore.list}
                    pagination={archiveStore.page}
                    onChange={({current, pageSize}: any) => onGetList({page: (current - 1), size: pageSize})}
                    columns={[
                        {title: 'Tên danh mục', dataIndex: 'name', key: 'name'},
                        {title: 'Vị trí', dataIndex: 'sortOrder', key: 'sortOrder'},
                        {
                            title: 'Tổng sản phẩm',
                            dataIndex: 'totalCount',
                            key: 'totalCount',
                            render: num => toNumber(num)
                        },
                        {
                            title: 'Hiển thị trang chủ',
                            dataIndex: 'showHome',
                            key: 'showHome',
                            render: showHome => Helper.renderStt(showHome)
                        },
                        {
                            title: 'Hành động', dataIndex: 'id', key: 'id', render: (id, raw): any => {
                                return <Space>
                                    <Button onClick={() => {
                                        setUpdate(true);
                                        form.setFieldsValue(raw);
                                        setVisible(true);
                                    }} size={`small`}>Sửa</Button>
                                    <Popconfirm onConfirm={() => archiveStore.delete(raw).finally(onGetList)}
                                                title={`Xoá danh mục?`}>
                                        <Button size={`small`}>Xóa</Button>
                                    </Popconfirm>
                                </Space>
                            }
                        }
                    ]}
                />
            </Spin>
            <Modal
                visible={visible}
                onCancel={onClose}
                footer={<PopupFooter
                    onClose={onClose}
                    showOk
                    loading={archiveStore.acLoad}
                    formId={`archive-form`}
                />}
                title={`Thêm/sửa danh mục sản phẩm`}>
                <Form
                    onFinish={onFinish}
                    labelCol={{sm: 8}}
                    labelAlign={`left`}
                    id={`archive-form`}
                    form={form}>
                    <Form.Item
                        rules={[{required: true}]}
                        label={`name`} name={`name`}>
                        <Input onChange={(event) => {
                            const value = event.target.value;
                            form.setFieldsValue({slug: toSlug(value)})
                        }}/>
                    </Form.Item>

                    <Form.Item
                        hidden
                        name={`id`}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        initialValue={`PRODUCT`}
                        hidden
                        name={`type`}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        rules={[{required: true}]}
                        label={`Slug`} name={`slug`}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        rules={[{required: true}]}
                        label={`Danh mục cha`}>
                        <ArchiveSelect type={`PRODUCT`} name={`parentId`}/>
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
                        initialValue={50}
                        name={`sortOrder`} label={`Vị trí ( Z-A )`}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item
                        initialValue={false}
                        valuePropName={`checked`}
                        name={`showHome`} label={`Hiển thị trang chủ`}>
                        <Checkbox>Kích hoạt</Checkbox>
                    </Form.Item>

                    <Form.Item
                        label={`Ảnh Icon`}>
                        <MediaButton
                            init={isUpdate}
                            field={`icon`}
                            name={`iconId`}
                            form={form}
                        />
                    </Form.Item>
                    <Form.Item
                        label={`Ảnh cover`}>
                        <MediaButton
                            init={isUpdate}
                            field={`cover`}
                            name={`coverId`}
                            form={form}
                        />
                    </Form.Item>
                    <Form.Item
                        label={`Ảnh banner`}>
                        <MediaButton
                            init={isUpdate}
                            field={`banner`}
                            name={`bannerId`}
                            form={form}
                        />
                    </Form.Item>
                    <Form.Item
                        label={`Ảnh avatar`}>
                        <MediaButton
                            init={isUpdate}
                            field={`image`}
                            name={`imageId`}
                            form={form}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default observer(ProductArchive);
