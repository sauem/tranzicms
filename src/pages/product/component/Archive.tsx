import BreadPath from "../../../common/BreadPath";
import {Button, Space, Spin, Table} from "antd";
import {productStore} from "../ProductStore";
import {useEffect} from "react";

const ProductArchive = () => {
    const onGetList = async (params?: any) => {
        await productStore.getArchive(params);
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

            <Spin spinning={productStore.fetching}>
                <Table
                    dataSource={productStore.archiveList}
                    pagination={productStore.archivePage}
                    onChange={({current, pageSize}: any) => onGetList({page: (current - 1), size: pageSize})}
                    columns={[
                        {title: 'Tên danh mục', dataIndex: 'name', key: 'name'},
                        {title: 'Vị trí', dataIndex: 'sortOrder', key: 'sortOrder'},
                        {title: 'Hiển thị trang chủ', dataIndex: 'showHome', key: 'showHome'},
                        {
                            title: 'Hành động', dataIndex: 'id', key: 'id', render: (id, raw): any => {
                                return <Space>
                                    <Button size={`small`}>Sửa</Button>
                                    <Button size={`small`}>Xóa</Button>
                                </Space>
                            }
                        }
                    ]}
                />
            </Spin>
        </>
    )
}
export default ProductArchive;
