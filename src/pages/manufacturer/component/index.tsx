import {observer} from "mobx-react";
import BreadPath from "../../../common/BreadPath";
import {Button, Card, Form, Image, Input, InputNumber, Modal, Popconfirm, Select, Space, Spin, Table} from "antd";
import {manufacturerStore} from "../manufacturerStore";
import React, {useEffect, useState} from "react";
import PopupFooter from "../../../common/PopupFooter";
import {toSlug} from "../../../common/helpers/Utils";
import MediaButton from "../../media/MediaButton";
import {STATUS, STATUS_ACTIVE} from "../../../common/Contants";

const Manufacturer = () => {
    const [visible, setVisible] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [form] = Form.useForm();
    const onGetList = async (params?: any) => {
        await manufacturerStore.getList(params);
    }
    const onFinish = async (data: any) => {
        if (isUpdate) {
            await manufacturerStore.update(data.id, data).finally(onClose)
        } else {
            await manufacturerStore.create(data).finally(onClose)
        }
    }
    const onClose = () => {
        setVisible(false);
        setIsUpdate(false);
        form.resetFields();
    }
    useEffect(() => {
        (async () => onGetList())()
    }, [])
    return (
        <>
            <BreadPath items={[
                {name: 'Tranzi', link: '/'},
                {name: 'Sản phẩm', link: '/product'},
                {name: 'Nhà sản xuất'},
            ]}/>
            <Spin spinning={manufacturerStore.fetching}>
                <Card extra={<Button onClick={() => setVisible(true)}>Nhà sản xuất</Button>} title={`Nhà sản xuất`}>
                    <Table
                        onChange={({current, pageSize}: any) => onGetList({page: (current - 1), size: pageSize})}
                        pagination={manufacturerStore.page}
                        dataSource={manufacturerStore.list}
                        columns={[
                            {title: 'STT', dataIndex: 'id', key: 'index', render: (id, raw, index) => `#${index + 1}`},
                            {
                                title: 'Logo',
                                dataIndex: 'logo',
                                key: 'logo',
                                render: logo => <Image width={60} src={logo?.path} height={40}/>
                            },
                            {title: 'Tên', dataIndex: 'name', key: 'name'},
                            {title: 'Thứ tự', dataIndex: 'sort', key: 'sort'},
                            {
                                title: 'Mô tả',
                                dataIndex: 'description',
                                key: 'description'
                            },
                            {
                                title: 'Hành động', dataIndex: 'id', key: 'action', render: (id, raw, index) => {
                                    return <Space>
                                        <Button size={`small`}>Sửa</Button>
                                        <Popconfirm title={`Xóa nhà sản xuất này?`}>
                                            <Button size={`small`}>Xóa</Button>
                                        </Popconfirm>
                                    </Space>
                                }
                            },
                        ]}
                    />
                </Card>
            </Spin>
            <Modal
                onCancel={onClose}
                visible={visible}
                footer={<PopupFooter
                    loading={manufacturerStore.acLoad}
                    showOk onClose={onClose}
                    formId={`manufacturer-form`}/>}
                title={`Thêm/Sửa nhà sản xuất`}>
                <Form labelCol={{sm: 8}}
                      labelAlign={`left`}
                      onFinish={onFinish}
                      form={form}
                      id={`manufacturer-form`}>
                    <Form.Item hidden name={`id`}><Input/></Form.Item>
                    <Form.Item
                        rules={[{required: true}]}
                        label={`Tên nhàn sản xuất`} name={`name`}>
                        <Input onChange={event => form.setFieldsValue({slug: toSlug(event.target.value)})}/>
                    </Form.Item>
                    <Form.Item
                        rules={[{required: true}]}
                        label={`Slug`} name={`slug`}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={`Mô tả`} name={`description`}>
                        <Input.TextArea/>
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
                        label={`Vị trí`} name={`sort`}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item
                        label={`Ảnh Logo`}>
                        <MediaButton
                            init={isUpdate}
                            field={`logo`}
                            name={`logoId`}
                            form={form}
                        />
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
                </Form>
            </Modal>
        </>
    )
}
export default observer(Manufacturer);
