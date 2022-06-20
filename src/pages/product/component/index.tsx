import {Button, Card, Space, Popconfirm, Image, Table, Modal, Form, Upload, Spin} from "antd";
import {IProduct, productStore} from "../ProductStore";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import PopupFooter from "../../../common/PopupFooter";
import ProductArchiveSelect from "../../../common/ProductArchiveSelect";
import BreadPath from "../../../common/BreadPath";

const Product = () => {
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
            <div className={`mb-3 text-right`}>
                <Button onClick={() => setVisibleImport(true)}>Import</Button>
                <Button>Thêm sản phẩm</Button>
            </div>

            <Spin spinning={productStore.fetching}>
                <Table
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
                                            <a href="">{name}</a>
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
                                    <Button size="small">$
                                        Price</Button>
                                    <a className="ant-btn ant-btn-sm" href={`/product/update?id=${id}`}
                                       type={`deafault`}><i
                                        className="icon icon-edit mr-1"/> Sửa</a>
                                    <Popconfirm title="Xoá sản phẩm này?" onConfirm={() => productStore.delete(id)}>
                                        <Button danger
                                                type={`default`} size="small"><i
                                            className="icon icon-trash mr-1"/> Xóa</Button>
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
                        <ProductArchiveSelect name={`categoryId`}/>
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
