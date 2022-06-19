import {observer} from "mobx-react";
import BreadPath from "../../../common/BreadPath";
import {Button, Card, Form, Input, InputNumber, Modal, Popconfirm, Space, Table, Tabs, Upload} from "antd";
import {useEffect, useState} from "react";
import PopupFooter from "../../../common/PopupFooter";
import {IProductStock, IWarehouse, warehouseStore} from "../WarehouseStore";
import WarehouseSelect from "../../../components/WarehouseSelect";

const Warehouse = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [whImport, setWhImport] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [formKey, setFormKey] = useState<string>('formId1');
    const [form] = Form.useForm();
    const formData = new FormData();

    const onClose = () => {
        setVisible(false);
        setIsUpdate(false);
        setWhImport(false);
        form.resetFields();
    }
    const onGetList = async (params?: any) => {
        await warehouseStore.getList(params);
    }
    const onSubmit = async (data: IWarehouse) => {

        if (isUpdate) {
            await warehouseStore.update(data.id, data).finally(onClose);
        } else {
            await warehouseStore.create(data).finally(onClose)
        }
    }
    const submitSingle = async (data: IProductStock) => {
        await warehouseStore.importSingleProduct(data.warehouseCode, data);
    }
    const onImport = async (data: any) => {
        formData.append("categoryId", data.warehouseId);
        formData.append("importType", 'UPLOAD_STOCK');
        await warehouseStore.importListProduct(data.warehouseId, formData);
    }
    useEffect(() => {
        (async () => onGetList())()
    }, [])
    return (
        <>
            <BreadPath/>
            <Card extra={<Space>
                <Button onClick={() => setVisible(true)}>Thêm kho</Button>
                <Button onClick={() => setWhImport(true)}>Nhập kho</Button>
            </Space>}
                  title={`Danh sách kho`}>
                <Table
                    dataSource={warehouseStore.whList}
                    pagination={warehouseStore.whPage}
                    onChange={({current, pageSize}: any) => onGetList({page: (current - 1), size: pageSize})}
                    columns={[
                        {title: 'Tên kho', dataIndex: 'name', key: 'name'},
                        {title: 'Mô tả', dataIndex: 'description', key: 'description'},
                        {title: 'Điện thoại', dataIndex: 'phone', key: 'phone'},
                        {title: 'Địa chỉ', dataIndex: 'address', key: 'address'},
                        {
                            title: 'Hành động',
                            dataIndex: 'id', key: 'action',
                            render: (id, raw) => {
                                return (
                                    <Space>
                                        <Popconfirm onConfirm={() => warehouseStore.delete(id)} title={`Xóa kho này?`}>
                                            <Button size={`small`} type={`default`}>Xoá</Button>
                                        </Popconfirm>
                                        <Button onClick={() => {
                                            form.setFieldsValue(raw);
                                            setIsUpdate(true);
                                            setVisible(true);
                                        }} size={`small`} type={`default`}>Sửa</Button>
                                    </Space>
                                )
                            }
                        }
                    ]}
                />
                <Modal
                    onCancel={onClose}
                    visible={visible}
                    footer={
                        <PopupFooter
                            onClose={onClose}
                            formId={`warehouseForm`}
                        />}
                    title={`Thêm/sửa kho`}>
                    <Form
                        labelCol={{sm: 8}}
                        labelAlign={`left`}
                        onFinish={onSubmit}
                        id={`warehouseForm`}
                        form={form}>
                        <Form.Item
                            rules={[{required: true}]}
                            name={`name`} label={`Tên kho`}>
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            rules={[{required: true}]}
                            name={`code`} label={`Mã kho`}>
                            <Input disabled={isUpdate && form.getFieldValue("code") != null}/>
                        </Form.Item>
                        <Form.Item
                            hidden
                            name={`id`}>
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name={`phone`} label={`Điện thoại`}>
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name={`address`} label={`Địa chỉ`}>
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name={`description`} label={`Mô tả ngắn`}>
                            <Input.TextArea/>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    onCancel={onClose}
                    visible={whImport}
                    footer={
                        <PopupFooter
                            loading={warehouseStore.acLoad}
                            onClose={onClose}
                            formId={`form-import`}
                        />}
                    title={`Nhập kho sản phẩm`}>


                    <Tabs onChange={(tabKey) => {
                        setFormKey(`formId${tabKey}`)
                    }} defaultActiveKey={"1"}>
                        <Tabs.TabPane key="1" tab={"Nhập theo mã"}>
                            {formKey === 'formId1' && <Form
                                labelCol={{sm: 8}}
                                labelAlign={`left`}
                                onFinish={submitSingle}
                                id={`form-import`}
                                form={form}>
                                <Form.Item
                                    label={`Chọn kho`}>
                                    <WarehouseSelect name={`warehouseCode`}/>
                                </Form.Item>
                                <Form.Item
                                    rules={[{required: true}]}
                                    name={`sku`} label={`Mã sản phẩm`}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    rules={[{required: true}]}
                                    name={`committed`} label={`Số lượng`}>
                                    <InputNumber style={{width: '100%'}}/>
                                </Form.Item>
                                <Form.Item
                                    name={`note`} label={`Ghi chú`}>
                                    <Input.TextArea/>
                                </Form.Item>
                            </Form>}

                        </Tabs.TabPane>
                        <Tabs.TabPane key="2" tab={"Nhập theo danh sách"}>
                            {formKey == `formId2` && <Form
                                labelCol={{sm: 8}}
                                labelAlign={`left`}
                                onFinish={onImport}
                                id={`form-import`}
                                form={form}>
                                <Form.Item
                                    label={`Chọn kho`}>
                                    <WarehouseSelect name={`warehouseCode`}/>
                                </Form.Item>
                                <Form.Item
                                    rules={[{required: true}]}
                                    name={`file`} label={`File upload`}>
                                    <Input type={`file`} onChange={(evt: any) => {
                                        if (evt.target.files.length > 0) {
                                            formData.append("file", evt.target.files[0])
                                        }
                                    }}/>
                                </Form.Item>
                                <div>
                                    <i className={`icon icon-upload mr-2`}/>
                                    <a href={`/data/warehouse.xlsx`}>File nhập mẫu</a>
                                </div>
                            </Form>}
                        </Tabs.TabPane>
                    </Tabs>
                </Modal>

            </Card>
        </>
    )
}
export default observer(Warehouse);
