import React, {useEffect} from "react";
import {observer} from "mobx-react";
import BreadPath from "../../../common/BreadPath";
import {Button, Col, Form, Image, Input, Row} from "antd";
import {authStore} from "../AuthStore";

const Login = () => {
    const onLogin = async (data: any) => {
        await authStore.login(data);
    }
    useEffect(() => {
        document.title = "Đăng nhập";
    }, [])
    return (
        <div className={`login-contain`}>
            <Row>
                <Col sm={12}>
                    <div className={`login-main`}>
                        <Image
                            preview={false}
                            width={240}
                            src={'/img/small-logo.png'}
                        />
                        <div className={`login-form p-4 mt-3`}>
                            <Form onFinish={onLogin} layout={"vertical"}>
                                <Form.Item
                                    rules={[{required: true, message: 'Nhập tên đăng nhập'}]}
                                    name={`username`}
                                    label={`Tên đăng nhập`}>
                                    <Input placeholder={`username`}/>
                                </Form.Item>
                                <Form.Item
                                    rules={[{required: true, message: 'Nhập mật khẩu'}]}
                                    name={`password`}
                                    label={`Mật khẩu`}>
                                    <Input.Password placeholder={`passowrd`}/>
                                </Form.Item>
                                <Button loading={authStore.acLoad} htmlType={`submit`} type={`primary`}>Đăng
                                    nhập</Button>
                            </Form>
                        </div>
                    </div>
                </Col>
                <Col sm={12}>

                </Col>
            </Row>
        </div>
    )
}
export default observer(Login)
