import {observer} from "mobx-react";
import BreadPath from "../../../common/BreadPath";
import {Card, Spin, Table} from "antd";
import {inventoryStore} from "../InventoryStore";
import {useEffect} from "react";
import {toNumber} from "../../../common/helpers/Utils";

const Inventory = () => {
    const onGetList = async (params?: any) => {
        await inventoryStore.getList(params);
    }
    useEffect(() => {
        (async () => onGetList())();
    }, [])
    return (
        <>
            <BreadPath items={[
                {name: 'Tranzi', link: '/'},
                {name: 'Kho', link: '/warehouse'},
                {name: 'Vận đơn'}
            ]}/>

            <Spin spinning={inventoryStore.fetching}>
                <Card title={`Danh sách tồn kho`}>
                    <Table
                        dataSource={inventoryStore.list}
                        pagination={inventoryStore.page}
                        onChange={({current, pageSize}: any) => onGetList({page: (current - 1), size: pageSize})}
                        columns={[
                            {title: 'Sản phẩm', dataIndex: 'product', key: 'product', render: p => p.name},
                            {title: 'Kho', dataIndex: 'warehouse', key: 'warehouse', render: w => w.name},
                            {
                                title: 'Khả dụng',
                                dataIndex: 'handInStock',
                                key: 'handInStock',
                                render: n => toNumber(n)
                            },
                            {
                                title: 'Không Khả dụng',
                                dataIndex: 'committed',
                                key: 'committed',
                                render: n => toNumber(n)
                            },
                            {
                                title: 'Khản dụng',
                                dataIndex: 'waitImport',
                                key: 'waitImport',
                                render: n => toNumber(n)
                            },
                        ]}
                    />
                </Card>
            </Spin>
        </>
    )
}
export default observer(Inventory);
