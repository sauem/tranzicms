import {Col, Form, Input, Row, Space} from "antd";
import {toSlug} from "../../../common/helpers/Utils";
import SwingEditor from "../../../components/SwingEditor";
import React from "react";

const TabInfo = (props: { form: any }) => {
    return (
        <Row gutter={[8, 8]}>
            <Col sm={12}>
                <Form.Item
                    hidden name={`id`}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    rules={[{required: true}]}
                    label={`Tên`} name={`name`}>
                    <Input
                        onChange={event => props.form.setFieldsValue({slug: toSlug(event.target.value)})}/>
                </Form.Item>
            </Col>
            <Col sm={12}>
                <Form.Item
                    rules={[{required: true}]}
                    label={`Slug`} name={`slug`}>
                    <Input/>
                </Form.Item>
            </Col>
            <Col sm={6}>
                <Form.Item
                    rules={[{required: true}]}
                    label={`Mã Tranzi`} name={`sku`}>
                    <Input/>
                </Form.Item>
            </Col>
            <Col sm={6}>
                <Form.Item
                    rules={[{required: true}]}
                    label={`Mã nhà sản xuất`} name={`orginSku`}>
                    <Input/>
                </Form.Item>
            </Col>
            <Col sm={12}>
                <Form.Item
                    label={`Data sheet`} name={`dataSheet`}>
                    <Input/>
                </Form.Item>
            </Col>
            <Col sm={24}>
                <Form.Item
                    label={`Mô tả`} name={`description`}>
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item
                    rules={[{required: true}]}
                    label={`Nội dung`} name={`content`}>
                    <SwingEditor
                        fieldName={`content`}
                        form={props.form}/>
                </Form.Item>

                <Form.Item
                    label={`Meta title`} name={`metaTitle`}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    label={`Meta description`} name={`metaDescription`}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    label={`Meta keywords`} name={`metaKeyword`}>
                    <Input/>
                </Form.Item>
            </Col>
        </Row>
    )
}
export default TabInfo;
