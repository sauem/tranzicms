import React from "react";
import {Button, Space} from "antd";

export interface IButtonPopup {
    onClose?: any,
    showOk?: boolean,
    loading?: boolean,
    formId?: string,
}

const PopupFooter = (props: IButtonPopup) => {
    const {onClose, formId, loading, showOk = true} = props;
    return (
        <Space>
            <small>* Thông tin bắt buộc</small>
            <Button
                type={`default`}
                onClick={onClose}>Hủy</Button>
            {showOk && <Button loading={loading}
                               type={`primary`} htmlType={`submit`}
                               form={formId}>Lưu</Button>}
        </Space>
    )
}
export default PopupFooter;
