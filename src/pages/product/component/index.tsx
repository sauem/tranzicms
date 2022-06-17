import {Button, Card, Space, Popconfirm, Image, Table} from "antd";
import {IProduct, productStore} from "../ProductStore";
import {observer} from "mobx-react";
import {useEffect} from "react";

const Product = () => {
    const onGetList = async (params?: any) => {
        await productStore.getList(params);
    }
    useEffect(() => {
        (async () => onGetList())()
    }, [])
    return (
        <Card title={`Sản phẩm`} extra={<Space>
            <Button>Import</Button>
            <Button>Thêm sản phẩm</Button>
        </Space>}>
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
                    {title: 'Danh mục', dataIndex: 'category', key: 'category', render: category => category.name},
                    {
                        title: 'Thao tác',
                        render: raw => {
                            return <Space>
                                <Button size="small">$
                                    Price</Button>
                                <a className="ant-btn ant-btn-sm" href={`/product/update?id=${raw.id}`}
                                   type={`deafault`}><i
                                    className="icon icon-edit mr-1"/> Sửa</a>
                                <Popconfirm title="Xoá sản phẩm này?">
                                    <Button danger
                                            type={`default`} size="small"><i
                                        className="icon icon-trash mr-1"/> Xóa</Button>
                                </Popconfirm>
                            </Space>
                        }
                    }
                ]}
            />
        </Card>
    )
}
export default observer(Product);
