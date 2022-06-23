import React from "react";
import {Button, Col, Divider, Form, Input, InputNumber, Row, Space} from "antd";
import Helper from "../../../common/Helper";

const TabDocument = () => {
    return (
        <>
            <Row>
                <Col sm={6}>Tên tài liệu</Col>
                <Col sm={6}>Tập tin</Col>
            </Row>
            <Divider/>
            <Form.List name={`documents`}>
                {(fields, {add, remove}) => (
                    <Row gutter={[4, 0]}>
                        {fields.map(field => {
                            return (
                                <>
                                    <Col sm={6}>
                                        <Form.Item name={`name`} className={`mb-2`}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                    <Col sm={18}>
                                        <Form.List name={[field.name, 'items']}>
                                            {(fields, {add, remove}) => {
                                                return (
                                                    <div>
                                                        <Row>
                                                            <Col sm={8}>
                                                                <Button htmlType="button" onClick={() => add()}>Add
                                                                    item</Button>
                                                            </Col>
                                                            <Col sm={14}>
                                                                <Button
                                                                    className={`d-flex align-items-center justify-content-center`}
                                                                    onClick={() => remove(field.name)}
                                                                    type={`default`}>
                                                                    <i className={`icon icon-trash`}/>
                                                                </Button>
                                                            </Col>
                                                            <Divider className={`my-3`}/>
                                                            <Col sm={8}>Tiêu đề</Col>
                                                            <Col sm={12}>Link tải</Col>
                                                            <Col sm={24}>
                                                                {fields.map((childField, key) => {
                                                                    return <Row gutter={[8, 8]}
                                                                                key={key}>
                                                                        <Col sm={8}>
                                                                            <Form.Item
                                                                                className="mb-2"
                                                                                name={[childField.name, 'title']}>
                                                                                <Input/>
                                                                            </Form.Item>
                                                                        </Col>
                                                                        <Col sm={8}>
                                                                            <Form.Item
                                                                                className="mb-2"
                                                                                name={[childField.name, 'link']}>
                                                                                <Input/>
                                                                            </Form.Item>
                                                                        </Col>
                                                                        <Col sm={4}>
                                                                            <Button
                                                                                htmlType="button"
                                                                                onClick={() => remove(childField.name)}>
                                                                                Chọn link
                                                                            </Button>
                                                                        </Col>
                                                                        <Col sm={2}>
                                                                            <Button
                                                                                htmlType="button"
                                                                                onClick={() => remove(childField.name)}><i
                                                                                className="icon icon-trash"/>
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                })}
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                )
                                            }}
                                        </Form.List>
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
