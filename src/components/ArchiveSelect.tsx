import {useEffect} from "react";
import {warehouseStore} from "../pages/warehouse/WarehouseStore";
import {Form, Select} from "antd";
import {archiveStore} from "../pages/archive/ArchiveStore";
import {observer} from "mobx-react";

const ArchiveSelect = (props: { type: string, name: string }) => {
    useEffect(() => {
        (async () => archiveStore.getList({
            page: false,
            type: props.type
        }))()
    }, [])
    return (
        <Form.Item
            noStyle
            name={props.name}>
            <Select
                allowClear
                showSearch
                options={archiveStore.list}
                fieldNames={{label: 'name', value: 'id'}}
            />
        </Form.Item>

    )
}
export default observer(ArchiveSelect);
