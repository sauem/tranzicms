import {observer} from "mobx-react";
import {Checkbox, Form, Input, InputNumber, Select} from "antd";
import {toSlug} from "../../common/helpers/Utils";
import ProductArchiveSelect from "../../common/ProductArchiveSelect";
import {ARCHIVE_LAYOUT, ARCHIVE_LAYOUT_DEFAULT, STATUS, STATUS_ACTIVE} from "../../common/Contants";
import ArchiveSelect from "../../components/ArchiveSelect";

const ArchiveForm = (props: { onFinish: any, form: any, type: string }) => {
    return (
        <>

            <Form
                onFinish={props.onFinish}
                labelCol={{sm: 8}}
                labelAlign={`left`}
                id={`archive-form`}
                form={props.form}>
                <Form.Item
                    rules={[{required: true}]}
                    label={`name`} name={`name`}>
                    <Input onChange={(event) => {
                        const value = event.target.value;
                        props.form.setFieldsValue({slug: toSlug(value)})
                    }}/>
                </Form.Item>

                <Form.Item
                    hidden
                    name={`id`}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    initialValue={props.type}
                    hidden
                    name={`type`}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    rules={[{required: true}]}
                    label={`Slug`} name={`slug`}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    label={`Danh mục cha`}>
                    <ArchiveSelect type={props.type} name={`parentId`}/>
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
                    rules={[{required: true}]}
                    initialValue={ARCHIVE_LAYOUT_DEFAULT}
                    label={`Giao diện`} name={`layout`}>
                    <Select allowClear>
                        {ARCHIVE_LAYOUT.map(stt => <Select.Option
                            key={stt.value}
                            value={stt.value}>
                            {stt.title}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    initialValue={50}
                    name={`sortOrder`} label={`Vị trí`}>
                    <InputNumber/>
                </Form.Item>
                <Form.Item
                    initialValue={false}
                    valuePropName={`checked`}
                    name={`showHome`} label={`Hiển thị trang chủ`}>
                    <Checkbox>Kích hoạt</Checkbox>
                </Form.Item>
            </Form>
        </>
    )
}
export default ArchiveForm;
