import React from "react";
import {Form, Select} from "antd";


const ProductArchiveSelect = (props: { name: string }) => {

    return (
        <Form.Item name={props.name} noStyle>
            <Select/>
        </Form.Item>
    )
}
export default ProductArchiveSelect;
