import React, {useEffect} from "react";
import {Form, Select} from "antd";
import {productStore} from "../pages/product/ProductStore";
import {observer} from "mobx-react";


const ProductArchiveSelect = (props: { name: string }) => {
    const onGetList = async (params?: any) => {
        await productStore.getArchive(params);
    }
    useEffect(() => {
        (async () => onGetList())();
    }, [])
    return (
        <Form.Item name={props.name} noStyle>
            <Select
                showSearch
                allowClear
                fieldNames={{label: `name`, value: 'id'}}
                options={productStore.archiveList}
            />
        </Form.Item>
    )
}
export default observer(ProductArchiveSelect);
