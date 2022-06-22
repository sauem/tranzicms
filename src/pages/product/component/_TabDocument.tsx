import React from "react";
import {Button, Col, Form, Input, InputNumber, Row} from "antd";
import Helper from "../../../common/Helper";

const TabDocument = () => {
    return (
        <>
            <Row>
                <Col sm={6}>Số lượng tối thiểu</Col>
                <Col sm={6}>Đơn giá</Col>
                <Col sm={6}>Giá khuyến mại</Col>
                <Col sm={4}></Col>
            </Row>
            <Form.List name={`list_price`}>
                {(fields, {add, remove}) => (
                    <Row gutter={[4, 0]}>
                        {fields.map(field => {
                            return (
                                <>
                                    <Col sm={6}>
                                        <Form.Item className={`mb-2`}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Item className={`mb-2`}>
                                            <InputNumber
                                                formatter={Helper.replaceNum}
                                                parser={Helper.parser}
                                                addonAfter={`đ`}/>
                                        </Form.Item>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Item className={`mb-2`}>
                                            <InputNumber
                                                formatter={Helper.replaceNum}
                                                parser={Helper.parser}
                                                addonAfter={`đ`}/>
                                        </Form.Item>
                                    </Col>
                                    <Col sm={4}>
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
export default TabDocument;
