import {Button, Card, Space, Popconfirm, Image, Table, Modal, Form, Upload, Spin} from "antd";
import {IProduct, productStore} from "../ProductStore";
import {observer} from "mobx-react";
import {Key, useEffect, useState} from "react";
import PopupFooter from "../../../common/PopupFooter";
import ProductArchiveSelect from "../../../common/ProductArchiveSelect";
import BreadPath from "../../../common/BreadPath";
import {Link} from "react-router-dom";
import ArchiveSelect from "../../../components/ArchiveSelect";

const Product = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [importVisible, setVisibleImport] = useState<boolean>(false);
    const [formImport] = Form.useForm();
    const formData = new FormData();
    const onGetList = async (params?: any) => {
        await productStore.getList(params);
    }
    const onClose = () => {
        setVisibleImport(false);
        formImport.resetFields();
    }
    const onFinish = async (data: any) => {
        formData.append("categoryId", data.categoryId);
        formData.append("importType", 'UPLOAD_PRODUCT');
        await productStore.import(formData).finally(onClose)
    }
    useEffect(() => {
        (async () => onGetList())()
    }, [])
    return (
        <>
            <BreadPath items={[
                {name: 'Tranzi', link: '/'},
                {name: 'Sản phẩm', link: '/product'},
            ]}/>
            <Space className={`mb-3 text-right`}>
                <Button onClick={() => setVisibleImport(true)}>Import</Button>
                <Button type={`default`} href={`/product/create`}>Thêm sản phẩm</Button>
                <Popconfirm onConfirm={() => productStore.deleteMultiple(selectedRowKeys)} title={`Xóa sản phẩm đã chọn?`}>
                    <Button type={`default`}>Xoá chọn</Button>
                </Popconfirm>
            </Space>

            <Spin spinning={productStore.fetching}>
                <Table
                    rowKey={`id`}
                    rowSelection={{
                        selectedRowKeys,
                        onChange: (newSelectedRowKeys: Key[]) => {
                            setSelectedRowKeys(newSelectedRowKeys);
                        }
                    }}
                    dataSource={productStore.pList}
                    pagination={productStore.pPage}
                    onChange={({current, pageSize}: any) => onGetList({page: (current - 1), size: pageSize})}
                    columns={[
                        {
                            title: 'Sản phẩm',
                            dataIndex: 'name',
                            key: 'name',
                            render: (name, raw: IProduct) => {
                                return (
                                    <Space size={1}>
                                        <Image
                                            width={80}
                                            height={60}
                                            src={raw.avatar?.path ?? 'error'}
                                        />
                                        <Space className="ml-1" size={1} direction="vertical">
                                            <Link to={`/product/${raw.id}`}>{name}</Link>
                                            <small>MNSX: {raw.orginSku}</small>
                                            <small>SKU: {raw.sku}</small>
                                        </Space>
                                    </Space>
                                )
                            }
                        },
                        {title: 'Nhà sản xuất', dataIndex: 'manufacturer', key: 'manufacturer'},
                        {
                            title: 'Danh mục',
                            dataIndex: 'category',
                            key: 'category',
                            render: category => category?.name
                        },
                        {
                            title: 'Thao tác',
                            dataIndex: 'id',
                            key: 'id',
                            render: (id, raw) => {
                                return <Space>
                                    <a className="ant-btn ant-btn-sm" href={`/product/${id}`}
                                       type={`deafault`}>Sửa</a>
                                    <Popconfirm title="Xoá sản phẩm này?" onConfirm={() => productStore.delete(id)}>
                                        <Button type={`default`} size="small">Xóa</Button>
                                    </Popconfirm>
                                </Space>
                            }
                        }
                    ]}
                />
            </Spin>
            <Modal
                onCancel={onClose}
                visible={importVisible}
                footer={<PopupFooter
                    loading={productStore.acLoad}
                    formId={`import-form`}
                    showOk/>}
                title={`Nhập sản phẩm`}>
                <Form
                    onFinish={onFinish}
                    id={`import-form`}
                    form={formImport}
                    labelCol={{sm: 8}}
                    labelAlign={`left`}>
                    <Form.Item label={`Danh mục`}>
                        <ArchiveSelect type={`PRODUCT`} name={`categoryId`}/>
                    </Form.Item>
                    <Form.Item label={`File sản phẩm`}>
                        <Upload
                            customRequest={({file, onSuccess}: any) => {
                                formData.append("file", file)
                                setTimeout(() => {
                                    onSuccess("ok");
                                }, 1000);
                            }}
                            multiple={false}>
                            <Button>Chọn file</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default observer(Product);
