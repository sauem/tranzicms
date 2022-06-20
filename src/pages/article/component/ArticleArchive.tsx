import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import {Button, Form, Modal, Popconfirm, Space, Spin, Table} from "antd";
import {productStore} from "../../product/ProductStore";
import {archiveStore} from "../../archive/ArchiveStore";
import BreadPath from "../../../common/BreadPath";
import Helper from "../../../common/Helper";
import PopupFooter from "../../../common/PopupFooter";
import ArchiveForm from "../../archive";

const ArticleArchive = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [isUpdate, setUpdate] = useState<boolean>(false);
    const [form] = Form.useForm();
    const onGetList = async (params?: any) => {
        await archiveStore.getList({
            ...params,
            type: 'ARTICLE'
        });
    }
    const onFinish = async (data: any) => {
        if (!isUpdate) {
            await archiveStore.create(data).finally(() => {
                onClose();
                onGetList();
            })
        } else {
            await archiveStore.update(data.id, data).finally(() => {
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
        <>
            <BreadPath items={[
                {name: 'Tranzi', link: '/'},
                {name: 'Bài viết', link: '/article'},
                {name: 'Danh mục', link: '/article/archive'}
            ]}/>

            <Spin spinning={archiveStore.fetching}>
                <div className={`text-right mb-3`}>
                    <Button onClick={() => setVisible(true)}>Tạo danh mục</Button>
                </div>
                <Table
                    dataSource={archiveStore.list}
                    pagination={archiveStore.page}
                    onChange={({current, pageSize}: any) => onGetList({page: (current - 1), size: pageSize})}
                    columns={[
                        {title: 'Tên danh mục', dataIndex: 'name', key: 'name'},
                        {title: 'Vị trí', dataIndex: 'sortOrder', key: 'sortOrder'},
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
                                    <Popconfirm onConfirm={() => archiveStore.delete(id).finally(onGetList)}
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
                title={`Thêm/sửa danh mục bài viết`}>
                <ArchiveForm
                    type={`ARTICLE`}
                    onFinish={onFinish}
                    form={form}
                />
            </Modal>
        </>
    )
}
export default observer(ArticleArchive);
