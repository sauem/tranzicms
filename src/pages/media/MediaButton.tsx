import {observer} from "mobx-react";
import {Button, Form, Input, Modal, Space, Upload} from "antd";
import {useEffect, useMemo, useState} from "react";
import MediaManager from "./MediaManager";
import type {UploadFile} from 'antd/es/upload/interface';
import {useParams} from "react-router-dom";
import {IMedia} from "./MediaStore";

interface IMediaButton {
    hideView?: boolean,
    name: string,
    mask?: boolean,
    init?: boolean,
    field?: string,
    form: any,
    label?: string,
    callback?: any,
    multiple?: boolean,
    default?: Array<UploadFile>,
    returnField?: 'object' | 'url' | 'uid' | 'thumbUrl'
}

const MediaButton = (props: IMediaButton) => {
    const [visible, setVisible] = useState(false);
    const [medias, setMedias] = useState<Array<UploadFile>>([]);
    const onClose = () => {
        setVisible(false);
    }
    const onMediaChose = async (media: any) => {
        let fileList;
        if (!props.multiple) {
            fileList = [{
                uid: media.id,
                name: media.name,
                status: 'done',
                url: media.path,
                thumbUrl: media.path
            }];
        } else {
            fileList = media.map((media: any) => {
                return {
                    uid: media.id,
                    name: media.name,
                    status: 'done',
                    url: media.path,
                    thumbUrl: media.path
                }
            });
        }
        await setMedias(fileList);
        props.callback && props.callback(fileList);
        onClose();
    }
    useEffect(() => {
        let valueForm = undefined;
        if (medias.length > 0) {
            if (props.returnField) {
                const singleMedia: any = medias[0];
                if (props.returnField == 'object') {
                    valueForm = props.multiple ? medias : singleMedia
                } else {
                    valueForm = props.multiple ? medias.map((m: any) => m[props.returnField ?? 'uid']) : singleMedia[props.returnField ?? 'uid']
                }
            } else {
                valueForm = props.multiple ? medias.map(m => m.uid) : medias[0].uid
            }
        }
        props.form.setFieldsValue({
            [props.name]: valueForm
        })
    }, [medias])
    useEffect(() => {
        if (props.default) {
            setMedias(props.default)
            // props.default.map((item: any) => setMedias([...medias, {
            //     uid: item.uid,
            //     name: item.name,
            //     status: 'done',
            //     url: item.url,
            //     thumbUrl: item.thumbUrl
            // }]))
        }
    }, [props.default])
    useEffect(() => {
        let formMedia = props.form.getFieldValue(props.field);
        if (formMedia && !props.default) {
            setMedias([{
                uid: formMedia.id,
                name: formMedia.name,
                status: 'done',
                url: formMedia.path,
                thumbUrl: formMedia.path
            }])
        }
    }, [props.init])
    return (
        <div>
            <Button onClick={() => setVisible(true)}>
                {props.label ?? 'Chọn ảnh'}
            </Button>
            <Form.Item
                hidden
                name={props.name}>
                <Input/>
            </Form.Item>
            {props.mask && <Form.Item
                hidden
                name={props.field}>
                <Input/>
            </Form.Item>}
            {!props.hideView && <Upload
                onRemove={(file) => {
                    const exclude = medias.filter(m => m.uid != file.uid);
                    setMedias(exclude);
                }}
                multiple={true}
                listType="picture"
                fileList={medias}
                defaultFileList={medias}
            />}

            <Modal
                width={1200}
                footer={<Space>
                    <Button>Hủy</Button>
                </Space>}
                onCancel={onClose}
                visible={visible}
                title={`Media`}>
                <MediaManager
                    multiple={props.multiple}
                    innerCard={false}
                    showPath={false}
                    callback={onMediaChose}/>
            </Modal>
        </div>
    )
}
export default observer(MediaButton);
