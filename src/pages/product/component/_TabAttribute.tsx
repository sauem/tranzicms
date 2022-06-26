import React from "react";
import {Button, Col, Form, Input, InputNumber, Row} from "antd";
import Helper from "../../../common/Helper";

const TabAttribute = () => {
    return (
        <>
            <Row>
                <Col sm={2}>Vị trí</Col>
                <Col sm={6}>KEY</Col>
                <Col sm={6}>Tiếng Việt</Col>
                <Col sm={6}>Tiếng Anh</Col>
                <Col sm={4}>Giá trị</Col>
            </Row>
            <Form.List name={`attribute`}>
                {(fields, {add, remove}) => (
                    <Row gutter={[4, 0]}>
                        {fields.map(field => {
                            return (
                                <>
                                    <Col sm={2}>
                                        <Form.Item

                                            name={[field.name, 'order']} className={`mb-2`}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col sm={5}>
                                        <Form.Item name={[field.name, 'key']} className={`mb-2`}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Item name={[field.name, 'vi']} className={`mb-2`}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Item name={[field.name, 'en']} className={`mb-2`}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Item name={[field.name, 'value']} className={`mb-2`}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col sm={1}>
                                        <Button
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
                            <Button onClick={add} type={`primary`}>Thêm</Button>
                        </Col>
                    </Row>

                )}
            </Form.List>
        </>
    )
}
export default TabAttribute;
