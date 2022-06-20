import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {Button, Card, Col, Form, Input, Row, Select} from "antd";
import {toSlug} from "../../../common/helpers/Utils";
import SwingEditor from "../../../components/SwingEditor";
import ArchiveSelect from "../../../components/ArchiveSelect";
import {ARTICLE_TYPE, ARTICLE_TYPE_DEFAULT, STATUS, STATUS_ACTIVE} from "../../../common/Contants";
import {articleStore} from "../ArticleStore";
import {useParams} from "react-router-dom";
import {archiveStore} from "../../archive/ArchiveStore";
import MediaButton from "../../media/MediaButton";

const ArticleForm = () => {
    const router: any = useParams();

    const [isUpdate, setUpdate] = useState(false);
    const [form] = Form.useForm();
    const onFinish = async (data: any) => {
        if (isUpdate) {
            await articleStore.update(data.id, data);
        } else {
            await articleStore.create(data);
        }
    }

    useEffect(() => {
        if (articleStore.detail != undefined) {
            form.setFieldsValue({
                ...articleStore.detail,
                categoryId: articleStore.detail?.category?.id
            })
        }
    }, [articleStore.detail])
    useEffect(() => {
        if (router.id) {
            setUpdate(true);
            (async () => articleStore.getDetail(router.id))();
        }
    }, [])

    return (
        <Form form={form} onFinish={onFinish} layout={`vertical`}>
            <div className={`row g-3`}>
                <div className={`col-md-8`}>
                    <Card title={`Chi tiết`}>
                        <Row gutter={[8, 8]}>
                            <Col sm={12}>
                                <Form.Item
                                    hidden name={`id`}>
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    rules={[{required: true}]}
                                    label={`Tên`} name={`name`}>
                                    <Input onChange={event => form.setFieldsValue({slug: toSlug(event.target.value)})}/>
                                </Form.Item>
                            </Col>
                            <Col sm={12}>
                                <Form.Item
                                    rules={[{required: true}]}
                                    label={`Slug`} name={`slug`}>
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
                                        form={form}/>
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
                    </Card>
                </div>
                <div className={`col-md-4`}>
                    <Card extra={<Button type={`primary`} htmlType={`submit`}>Lưu</Button>} title={`Thiết lập`}>
                        <Form.Item name={`categoryId`} rules={[{required: true}]}
                                   label={`Danh mục`}>
                            <ArchiveSelect
                                type={`ARTICLE`} name={`categoryId`}/>
                        </Form.Item>
                        <Form.Item
                            rules={[{required: true}]}
                            initialValue={ARTICLE_TYPE_DEFAULT}
                            label={`Thể loại`} name={`type`}>
                            <Select allowClear>
                                {ARTICLE_TYPE.map(stt => <Select.Option
                                    key={stt.value}
                                    value={stt.value}>
                                    {stt.title}</Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            rules={[{required: true}]}
                            initialValue={STATUS_ACTIVE}
                            label={`Trạng thái`} name={`state`}>
                            <Select allowClear>
                                {STATUS.map(stt => <Select.Option
                                    key={stt.value}
                                    value={stt.value}>
                                    {stt.title}</Select.Option>)}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label={`Ảnh đại diện`}>
                            <MediaButton
                                init={isUpdate}
                                field={`image`}
                                name={`imageId`}
                                form={form}
                            />
                        </Form.Item>
                        <Form.Item
                            label={`Ảnh banner`}>
                            <MediaButton
                                init={isUpdate}
                                field={`banner`}
                                name={`bannerId`}
                                form={form}
                            />
                        </Form.Item>

                    </Card>
                </div>
            </div>
        </Form>
    )
}
export default observer(ArticleForm);
