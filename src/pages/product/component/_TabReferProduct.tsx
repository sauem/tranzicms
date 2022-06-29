import {Button, Col, Form, Image, Input, InputNumber, Row, Space} from "antd";
import Helper from "../../../common/Helper";
import React, {useEffect, useState} from "react";
import ProductSelect from "../../../components/ProductSelect";

const TabReferProduct = (props: { form: any }) => {
    const [products, setProduct] = useState<any>(props.form.getFieldValue('relatedProduct') || []);
    useEffect(() => {
        props.form.setFieldsValue({
            relatedProduct: products
        })
    }, [products])
    return (
        <>
            <Row gutter={[8, 8]}>
                <Col sm={12}>Chọn sản phẩm</Col>
                <Col sm={12}>Sản phẩm</Col>
            </Row>
            <Row gutter={[8, 8]}>
                <Col sm={12}>
                    <ProductSelect callback={(value: any, event: any) => {
                        setProduct([...products, {
                            id: value,
                            name: event.item.name,
                            sku: event.item.sku,
                            image: event.item.avatar.path
                        }]);
                    }}/>
                </Col>
                <Col sm={12}>
                    <Form.List name={`relatedProduct`}>
                        {(fields, {add, remove}) => {
                            const refer = props.form.getFieldValue('relatedProduct');

                            return (
                                <div>
                                    {fields.map((field, key) => {

                                        if (refer) {
                                            return (
                                                <div className={`mb-2`}>
                                                    <Form.Item hidden name={[field.name, 'id']}>
                                                        <Input/>
                                                    </Form.Item>
                                                    <Space>
                                                        <Button
                                                            onClick={() => {
                                                                remove(field.name)
                                                                setProduct(products.filter((item: any, index: number) => index != field.name))
                                                            }}
                                                            size={`small`} htmlType={`button`}><i
                                                            className={`icon icon-trash`}/></Button>
                                                        <Image
                                                            src={refer[field.name]?.image}
                                                            width={60}
                                                            height={60}
                                                        />
                                                        <Space direction={`vertical`}>
                                                            <span>{refer[field.name]?.name}</span>
                                                            <span>{refer[field.name]?.sku}</span>
                                                        </Space>
                                                    </Space>
                                                </div>
                                            )
                                        } else {
                                            return <></>
                                        }
                                    })}
                                </div>
                            )
                        }}
                    </Form.List>
                </Col>
            </Row>
        </>
    )
}
export default TabReferProduct;
