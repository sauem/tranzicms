import {observer} from "mobx-react";
import {Button, Card, Col, Form, Input, Row, Spin} from "antd";
import {settingStore} from "./SettingStore";
import MediaButton from "../media/MediaButton";
import React, {useEffect, useState} from "react";

const Setting = () => {
    const [form] = Form.useForm();
    const [init, setInit] = useState(false);
    const onFinish = async (data: any) => {
        delete data['thumbHead'];
        delete data['thumbFoot'];
        delete data['thumbFavicon'];
        const settings: any = Object.entries(data).map(e => {
            return {key: e[0], value: e[1]}
        });
        await settingStore.create(settings);
    }
    useEffect(() => {
        (async () => {
            setInit(false)
            await settingStore.getList();
            await settingStore.settings?.map(item => {
                form.setFieldsValue({
                    [item.key]: item.value
                });
                if (item.key == "headerId") {
                    form.setFieldsValue({thumbHead: item.thumb})
                }
                if (item.key == "footerId") {
                    form.setFieldsValue({thumbFoot: item.thumb})
                }
                if (item.key == "faviconId") {
                    form.setFieldsValue({thumbFavicon: item.thumb})
                }
            });
            setInit(true)

        })()
    }, [])
    return (
        <Spin spinning={settingStore.fetching}>
            <Form form={form} onFinish={onFinish} layout={`vertical`}>
                <Row gutter={[8, 8]}>
                    <Col sm={16}>
                        <Card title={`Thông tin website`}>
                            <Row gutter={[8, 8]}>
                                <Col sm={12}>
                                    <Form.Item
                                        name={`siteName`}
                                        label={`Tên website`}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col sm={12}>
                                    <Form.Item
                                        name={`sologan`}
                                        label={`Sologan`}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col sm={6}>
                                    <Form.Item
                                        name={`hotline`}
                                        label={`Hotline`}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col sm={6}>
                                    <Form.Item
                                        name={`email`}
                                        label={`Email`}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col sm={12}>
                                    <Form.Item
                                        name={`address`}
                                        label={`Địa chỉ`}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col sm={6}>
                                    <Form.Item
                                        name={`facebook`}
                                        label={`Facebook Link`}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col sm={6}>
                                    <Form.Item
                                        name={`youtube`}
                                        label={`Youtube Link`}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col sm={6}>
                                    <Form.Item
                                        name={`zalo`}
                                        label={`Zalo Id ( chat plugin)`}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col sm={6}>
                                    <Form.Item
                                        name={`facebookId`}
                                        label={`FB page Id ( chat plugin )`}>
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col sm={24}>
                                    <Form.Item
                                        name={`mapIframe`}
                                        label={`Map embed`}>
                                        <Input.TextArea/>
                                    </Form.Item>
                                    <Form.Item
                                        name={`scriptHead`}
                                        label={`Script head`}>
                                        <Input.TextArea rows={4}/>
                                    </Form.Item>
                                    <Form.Item
                                        name={`scriptBody`}
                                        label={`Script body`}>
                                        <Input.TextArea rows={4}/>
                                    </Form.Item>

                                    <Form.Item
                                        name={`metaTitle`}
                                        label={`Meta title`}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        name={`metaDescription`}
                                        label={`Meta description`}>
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        name={`metaKeyword`}
                                        label={`Meta keyword`}>
                                        <Input/>
                                    </Form.Item>

                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col sm={8}>
                        <Card extra={<Button type={`primary`} htmlType={`submit`}>Lưu</Button>} title={`Hình ảnh/Logo`}>
                            <Form.Item
                                label={`Logo header`}>
                                <MediaButton
                                    mask={true}
                                    init={init}
                                    field={`thumbHead`}
                                    name={`headerId`}
                                    form={form}
                                />
                            </Form.Item>
                            <Form.Item
                                label={`Logo footer`}>
                                <MediaButton
                                    mask={true}
                                    init={init}
                                    field={`thumbFoot`}
                                    name={`footerId`}
                                    form={form}
                                />
                            </Form.Item>
                            <Form.Item
                                label={`Favicon`}>
                                <MediaButton
                                    init={init}
                                    mask={true}
                                    field={`thumbFavicon`}
                                    name={`faviconId`}
                                    form={form}
                                />
                            </Form.Item>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </Spin>
    )
}
export default observer(Setting)
