import {useEffect} from "react";
import {warehouseStore} from "../pages/warehouse/WarehouseStore";
import {Form, Select, TreeSelect} from "antd";
import {archiveStore} from "../pages/archive/ArchiveStore";
import {observer} from "mobx-react";

const ArchiveSelect = (props: { type: string, name: string, fields?: any, rules?: any }) => {
    useEffect(() => {
        (async () => archiveStore.getList({
            page: false,
            type: props.type
        }))()
    }, [])
    return (
        <Form.Item
            noStyle
            rules={props.rules}
            name={props.name}>
            {/*<Select*/}
            {/*    style={{minWidth: 200, width: '100%'}}*/}
            {/*    allowClear*/}
            {/*    showSearch*/}
            {/*    options={archiveStore.list}*/}
            {/*    fieldNames={props.fields ?? {label: 'name', value: 'id'}}*/}
            {/*/>*/}
            <TreeSelect
                allowClear
                showSearch
                style={{width: '100%'}}
                treeData={archiveStore.list}
                fieldNames={props.fields ?? {label: 'name', value: 'id', children: 'children'}}
                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                placeholder="Chọn danh mục"
                treeDefaultExpandAll
            />
        </Form.Item>

    )
}
export default observer(ArchiveSelect);
