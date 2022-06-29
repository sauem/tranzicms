import {Button, Col, Form, Input, InputNumber, Row, Space} from "antd";
import Helper from "../../../common/Helper";
import React from "react";

const TabType = () => {

    return (
        <>
            <Row>
                <Col sm={4}>Thứ tự</Col>
                <Col sm={8}>Thuộc tính</Col>
                <Col sm={8}>Miêu tả</Col>
            </Row>
            <Form.List name={`classifications`}>
                {(fields, {add, remove}) => (
                    <Row gutter={[4, 0]}>
                        {fields.map(field => {
                            return (
                                <>
                                    <Col sm={4}>
                                        <Form.Item name={[field.name, 'order']} className={`mb-2`}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col sm={8}>
                                        <Form.Item name={[field.name, 'name']} className={`mb-2`}>
                                            <Input/>

                                        </Form.Item>
                                    </Col>
                                    <Col sm={8}>
                                        <Form.Item name={[field.name, 'description']} className={`mb-2`}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col sm={2}>
                                        <Button
                                            htmlType={`button`}
                                            className={`p-1 d-flex align-items-center justify-content-center`}
                                            onClick={() => remove(field.name)}
                                            type={`default`}>
                                            <i className={`icon icon-trash`}/>
                                        </Button>
                                    </Col>
                                </>
                            )
                        })}
                        <Col sm={24}>
                            <Space>
                                <Button htmlType={`button`} onClick={() => add()} type={`primary`}>Thêm</Button>
                            </Space>
                        </Col>
                    </Row>

                )}
            </Form.List>
        </>
    )
}
export default TabType;
