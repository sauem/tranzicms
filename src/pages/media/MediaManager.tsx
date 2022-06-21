import {observer} from "mobx-react";
import BreadPath from "../../common/BreadPath";
import {
    Breadcrumb,
    Button,
    Col,
    Form,
    Image,
    Input, message,
    Modal, Popconfirm,
    Row,
    Select,
    Space,
    Spin,
    Tabs,
    Tooltip,
    Upload
} from "antd";
import React, {useEffect, useState} from "react";
import {IMedia, mediaStore} from "./MediaStore";
import PopupFooter from "../../common/PopupFooter";
import {mediaService} from "./MediaService";
import {
    MEDIA_TYPE_DOCX,
    MEDIA_TYPE_EXCEL,
    MEDIA_TYPE_FOLDER,
    MEDIA_TYPE_GIF,
    MEDIA_TYPE_PDF,
    MEDIA_TYPE_VIDEO,
    MEDIA_TYPE_ZIP
} from "../../common/Contants";
import HttpStatusCode from "../../common/constants/HttpErrorCode";

export interface IMediaProps {
    callback?: any,
    multiple?: boolean,
    showPath?: boolean,
    innerCard?: boolean
}

const MediaManager = (props: IMediaProps) => {
    const {callback, multiple, showPath, innerCard} = props;
    const [formSearch] = Form.useForm();
    const [formFolder] = Form.useForm();
    const [mediaSelected, setMediaSelected] = useState<Array<any>>([]);
    const [path, setPath] = useState<Array<string>>([]);
    const [mFolder, setMFolder] = useState(false);
    const onGetList = async (params?: any) => {
        const searchValues = formSearch.getFieldsValue();
        await mediaStore.getList({
            folder: null,
            ...params,
            ...searchValues
        });
    }
    const onClose = () => {
        setMFolder(false);
        formFolder.resetFields();
    }
    const onCreateFolder = async (data: any) => {
        const response = await mediaService.createFolder({
            ...data,
            subPath: path
        });
        if (response.status == HttpStatusCode.SUCCESS) {
            message.success("Tạo danh mục thành công!");
            setMFolder(false);
            await onGetList({
                folder: path[path.length - 1]
            })
        } else {
            message.error(response.body.message);
        }
    }
    const onSelectItem = (media: IMedia) => {
        if (callback && !multiple) {
            return callback(media);
        }
        if (mediaSelected.includes(media.id)) {
            setMediaSelected(mediaSelected.filter((id: string) => id != media.id));
        } else {
            setMediaSelected([...mediaSelected, media.id]);
        }
    }
    useEffect(() => {
        (async () => onGetList())();
    }, [])
    return (
        <>
            {showPath && <BreadPath items={[
                {name: 'Tranzi', link: '/'},
                {name: 'Quản lý media', link: '/media'}
            ]}/>}
            <div className={`${innerCard && 'card card-body'}`}>
                <Tabs defaultActiveKey={`1`}>
                    <Tabs.TabPane tab={`Quản lý ảnh`} key={`1`}>
                        <div className={`d-flex justify-content-between`}>
                            <div className={`action`}>
                                <Space>
                                    <Button onClick={() => setMFolder(true)}>Tạo thư mục</Button>
                                    <Popconfirm onConfirm={async () => {
                                        await mediaStore.delete(mediaSelected)
                                    }} title={`Xóa file đã chọn?`}>
                                        <Button disabled={mediaSelected.length == 0}>
                                            Xóa chọn
                                        </Button>
                                    </Popconfirm>

                                    {multiple && mediaSelected.length > 0 &&
                                    <Button onClick={() => {
                                        if (callback) {
                                            const medias = mediaStore.list.filter((media: any) => mediaSelected.includes(media.id));
                                            callback(medias);
                                        }
                                    }}> Chọn {mediaSelected.length} ảnh
                                    </Button>}
                                </Space>
                            </div>
                            <Form onFinish={onGetList} layout={`inline`} form={formSearch}>
                                <Form.Item name={`key`}>
                                    <Input placeholder={`Tên media`}/>
                                </Form.Item>
                                <Form.Item
                                    initialValue={null}
                                    name={`type`}>
                                    <Select
                                        style={{width: 150}}
                                        allowClear
                                        options={[
                                            {label: 'Tất cả', value: null},
                                            {label: 'Ảnh', value: 'IMAGE'},
                                            {label: 'Video', value: 'VIDEO'},
                                            {label: 'Nén zip', value: 'ZIP'},
                                            {label: 'Pdf', value: 'PDF'},
                                            {label: 'Excel file', value: 'XLSX'},
                                            {label: 'Ảnh động', value: 'GIFT'},
                                            {label: 'Tài liệu', value: 'DOCX'},
                                            {label: 'Không xác định', value: 'UNKNOW'},
                                        ]}/>
                                </Form.Item>
                                <Button htmlType={`submit`}>Lọc</Button>
                            </Form>
                        </div>
                        <Spin spinning={mediaStore.fetching}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>
                                    <Button onClick={async () => {
                                        setPath([])
                                        await onGetList();
                                    }} type={`link`}>Medias</Button>
                                </Breadcrumb.Item>
                                {path && path.map((item: any, index: number) => {
                                    return <Breadcrumb.Item key={index}>
                                        <Button disabled={path[path.length - 1] === item} onClick={async () => {
                                            setPath(path.slice(0, index + 1))
                                            await onGetList({
                                                //  type: media.mediaType,
                                                folder: item
                                            })
                                        }} type={`link`}>{item}</Button>
                                    </Breadcrumb.Item>
                                })}
                            </Breadcrumb>
                            <div className={`mt-3 p-1`}>
                                <Row gutter={[8, 24]}>
                                    {mediaStore.list && mediaStore.list.map((media: IMedia, index: number) => {
                                        let url = media.path;
                                        switch (media.mediaType) {
                                            case MEDIA_TYPE_FOLDER:
                                                url = '/img/folder.png';
                                                break;
                                            case MEDIA_TYPE_PDF:
                                                url = '/img/pdf.png';
                                                break;
                                            case MEDIA_TYPE_VIDEO:
                                                url = '/img/video.png';
                                                break;
                                            case MEDIA_TYPE_EXCEL:
                                                url = '/img/excel.png';
                                                break;
                                            case MEDIA_TYPE_DOCX:
                                                url = '/img/doc.png';
                                                break;
                                            case MEDIA_TYPE_ZIP:
                                                url = '/img/zip.png';
                                                break;
                                            case MEDIA_TYPE_GIF:
                                                url = '/img/gif.png';
                                                break;
                                            default:
                                                break;
                                        }
                                        return <Col sm={3}>
                                            <div onClick={async () => {
                                                if (media.mediaType == MEDIA_TYPE_FOLDER) {
                                                    await onGetList({
                                                        //  type: media.mediaType,
                                                        folder: media.name
                                                    });
                                                    setPath([...path, media.name])
                                                } else {
                                                    onSelectItem(media)
                                                }
                                            }}
                                                 className={`media-item  ${media.mediaType === MEDIA_TYPE_FOLDER && 'isFolder'}`}>
                                                {mediaSelected.includes(media.id) &&
                                                <i className={`icon check-item icon-check-square-o`}/>}
                                                <div className={`img`}>
                                                    <Tooltip title={media.name}>
                                                        <Image
                                                            preview={false}
                                                            width={70}
                                                            height={`100%`}
                                                            src={url ?? `error`}
                                                            fallback={`/img/unknow.png`}
                                                        />
                                                    </Tooltip>
                                                </div>
                                                <div className={`action`}>
                                                    <span className={`name`}>{media.name}</span>
                                                </div>
                                            </div>
                                        </Col>
                                    })}
                                </Row>
                            </div>
                        </Spin>
                    </Tabs.TabPane>
                    <Tabs.TabPane key={`2`} tab={`Upload ảnh`}>
                        <div className={`upload-area`}>
                            <Form>
                                <Form.Item name={`image`}>
                                    <Upload.Dragger
                                        name={`file`}
                                        multiple
                                        customRequest={async ({file, onSuccess}) => {
                                            const formData = new FormData();
                                            formData.append("file", file);
                                            formData.append("toFolder", path.join("/"));
                                            await mediaService.upload(formData);
                                            onSuccess && setTimeout(() => onSuccess("ok"), 1000)
                                        }}
                                        onDrop={() => {

                                        }}
                                    >
                                        <p className="ant-upload-text">Kéo thả media vào vị trí này</p>
                                        <p className="ant-upload-hint">
                                            Dung lượng tối đa upload là 10MB
                                        </p>
                                    </Upload.Dragger>
                                </Form.Item>
                            </Form>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
                <Modal
                    visible={mFolder}
                    footer={<PopupFooter
                        onClose={onClose}
                        showOk
                        formId={`folder-form`}
                    />}
                    onCancel={onClose}
                    title={`Tạo thư mục`}>
                    <Form onFinish={onCreateFolder} id={`folder-form`} form={formFolder} labelAlign={`left`}
                          labelCol={{sm: 8}}>
                        <Form.Item label={`Tên thư mục`} name={`folderName`}>
                            <Input/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    )
}
export default observer(MediaManager);
