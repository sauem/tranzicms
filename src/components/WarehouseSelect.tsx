import {Form, Select} from "antd";
import {useEffect} from "react";
import {warehouseStore} from "../pages/warehouse/WarehouseStore";

const WarehouseSelect = (props: {name: string}) => {

    useEffect(() => {
        (async () => warehouseStore.getList({page: false}))()
    }, [])
    return (
        <Form.Item
            noStyle
            rules={[{required: true}]}
            name={props.name}>
            <Select
                allowClear
                showSearch
                options={warehouseStore.whList}
                fieldNames={{label: 'name', value: 'code'}}
            />
        </Form.Item>

    )
}
export default WarehouseSelect;
