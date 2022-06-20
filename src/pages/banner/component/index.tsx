import {observer} from "mobx-react";
import {Button, Card, Form, Image, Input, InputNumber, Modal, Popconfirm, Select, Space, Table} from "antd";
import {useEffect, useState} from "react";
import PopupFooter from "../../../common/PopupFooter";
import {
    BANNER_DEVICE,
    BANNER_DEVICE_DESKTOP,
    BANNER_HOME_SLIDER,
    BANNER_POSITION,
    BANNER_TYPE_IMAGE,
    BANNER_TYPES,
    STATUS,
    STATUS_ACTIVE
} from "../../../common/Contants";
import {bannerStore, IBanner} from "../BannerStore";
import Helper from "../../../common/Helper";
import {archiveStore} from "../../archive/ArchiveStore";
import MediaButton from "../../media/MediaButton";

const Banner = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [isUpdate, setUpdate] = useState<boolean>(false);
    const [form] = Form.useForm();
    const onGetList = async (params?: any) => {
        await bannerStore.getList(params);
    }
    const onFinish = async (data: any) => {
        if (!isUpdate) {
            await bannerStore.create(data).finally(() => {
                onClose();
                onGetList();
            })
        } else {
            await bannerStore.update(data.id, data).finally(() => {
                onClose();
                onGetList();
            })
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
        <Card title={`Banner / Slider`}
              extra={<Button onClick={() => setVisible(true)}>Thêm banner</Button>}>
            <Table
                dataSource={bannerStore.list}
                pagination={bannerStore.page}
                onChange={({current, pageSize}: any) => onGetList({page: (current - 1), size: pageSize})}
                columns={[
                    {
                        title: 'STT',
                        dataIndex: 'id',
                        render: (id, raw, key) => {
                            return `#${key + 1}`;
                        }
                    },
                    {
                        title: 'Image',
                        dataIndex: 'image',
                        key: 'image',
                        render: (image, raw: IBanner) => {
                            return <Space>
                                <Image
                                    width={80}
                                    height={60}
                                    src={raw.image?.path ?? 'error'}
                                />
                                <Space direction={`vertical`}>
                                    <span>{raw.title}</span>
                                    <span>{raw.subTitle}</span>
                                </Space>
                            </Space>
                        }
                    },
                    {title: 'Thể loại', dataIndex: 'type', key: 'type'},
                    {title: 'Thứ tự', dataIndex: 'sortOrder', key: 'sortOrder'},
                    {title: 'Vị trí', dataIndex: 'position', key: 'position'},
                    {title: 'Trạng thái', dataIndex: 'state', key: 'state', render: stt => Helper.renderStt(stt)},
                    {
                        title: 'Hành động', dataIndex: 'id', key: 'id', render: (id, raw) => {
                            return <Space>
                                <Button onClick={() => {
                                    setUpdate(true);
                                    form.setFieldsValue(raw);
                                    setVisible(true);
                                }} size={`small`}>Sửa</Button>
                                <Popconfirm onConfirm={() => bannerStore.delete(id).finally(onGetList)}
                                            title={`Xoá banner?`}>
                                    <Button size={`small`}>Xóa</Button>
                                </Popconfirm>
                            </Space>
                        }
                    },
                ]}
            />

            <Modal
                visible={visible}
                onCancel={onClose}
                footer={<PopupFooter
                    onClose={onClose}
                    showOk
                    loading={bannerStore.acLoad}
                    formId={`archive-form`}
                />}
                title={`Thêm/sửa banner`}>
                <Form
                    onFinish={onFinish}
                    labelCol={{sm: 8}}
                    labelAlign={`left`}
                    id={`archive-form`}
                    form={form}>
                    <Form.Item
                        hidden
                        name={`id`}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        rules={[{required:true}]}
                        name={`imageId`}
                        label={`Ảnh`}>
                        <MediaButton
                            name={`imageId`}
                            field={`image`}
                            form={form}
                            init={isUpdate}/>
                    </Form.Item>

                    <Form.Item
                        rules={[{required: true}]}
                        label={`Tiêu đề`} name={`title`}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={`Tiêu đề phụ`} name={`subTitle`}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={`Alt`} name={`alt`}>
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={`Link`} name={`href`}>
                        <Input/>
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
                        rules={[{required: true}]}
                        initialValue={BANNER_HOME_SLIDER}
                        label={`Vị trí hiển thị`} name={`position`}>
                        <Select allowClear>
                            {BANNER_POSITION.map(stt => <Select.Option
                                key={stt.value}
                                value={stt.value}>
                                {stt.title}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        initialValue={BANNER_TYPE_IMAGE}
                        label={`Loại banner`} name={`type`}>
                        <Select allowClear>
                            {BANNER_TYPES.map(stt => <Select.Option
                                key={stt.value}
                                value={stt.value}>
                                {stt.title}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        initialValue={BANNER_DEVICE_DESKTOP}
                        label={`Thiết bị`} name={`device`}>
                        <Select allowClear>
                            {BANNER_DEVICE.map(stt => <Select.Option
                                key={stt.value}
                                value={stt.value}>
                                {stt.title}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        initialValue={50}
                        name={`sortOrder`} label={`Vị trí`}>
                        <InputNumber/>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    )
}
export default observer(Banner)
