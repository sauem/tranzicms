import {Role} from "./constants/Role";

export const formDefault = {
    labelCol: {sm: 8},
    labelAlign: 'left'
}
export const TOKEN_NAME: string = "tranzi_token";
export const TOKEN_EXPIRE_DAYS: number = 16;

export const ROLES = [
    {title: 'Admin', value: Role.ROLE_ADMIN}
];
export const STATUS_ACTIVE = 'ACTIVE';
export const STATUS_INACTIVE = 'INACTIVE'
export const STATUS = [
    {title: 'Hiển thị', value: STATUS_ACTIVE},
    {title: 'Ẩn', value: STATUS_INACTIVE},
]

export interface IPaginate {
    current: number,
    pageSize: number,
    total: number
}

export const BANNER_TYPE_VIDEO = 'VIDEO';
export const BANNER_TYPE_IMAGE = 'IMAGE';
export const BANNER_DEVICE_DESKTOP = 'DESKTOP';
export const BANNER_DEVICE_MOBILE = 'MOBILE';
export const BANNER_HOME_SLIDER = 'HOME_SLIDER';
export const BANNER_HOME_BANNER = 'HOME_BANNER';
export const BANNER_PARTNER = 'PARTNER';
export const BANNER_SIDEBAR_LEFT = 'SIDEBAR_LEFT';
export const BANNER_SIDEBAR_RIGHT = 'SIDEBAR_RIGHT';
export const BANNER_TYPES = [
    {title: 'Video', value: BANNER_TYPE_VIDEO},
    {title: 'Image', value: BANNER_TYPE_IMAGE},
];
export const BANNER_POSITION = [
    {title: 'Slider trang chủ', value: BANNER_HOME_SLIDER},
    {title: 'Banner trang chủ', value: BANNER_HOME_BANNER},
    {title: 'Logo nhà sản xuất', value: BANNER_PARTNER},
    {title: 'Sidebar trái', value: BANNER_SIDEBAR_LEFT},
    {title: 'Sidebar phải', value: BANNER_SIDEBAR_RIGHT}
];
export const BANNER_DEVICE = [
    {title: 'Desktop', value: BANNER_DEVICE_DESKTOP},
    {title: 'Mobile', value: BANNER_DEVICE_MOBILE},
];


export const ARTICLE_TYPE_VIDEO = 'VIDEO';
export const ARTICLE_TYPE_DEFAULT = 'ARTICLE';
export const ARTICLE_TYPE = [
    {title: 'Bài viết', value: ARTICLE_TYPE_DEFAULT},
    {title: 'Video', value: ARTICLE_TYPE_VIDEO},
]

export const ARCHIVE_LAYOUT_DEFAULT = "DEFAULT";
export const ARCHIVE_LAYOUT_VIDEO = "VIDEO";
export const ARCHIVE_LAYOUT_BLOG = "BLOG";
export const ARCHIVE_LAYOUT_ARTICLE = "ARTICLE";
export const ARCHIVE_LAYOUT = [
    {title: 'Mặc định', value: ARCHIVE_LAYOUT_DEFAULT},
    {title: 'Video', value: ARCHIVE_LAYOUT_VIDEO},
    {title: 'Bài viết', value: ARCHIVE_LAYOUT_BLOG},
    {title: 'Tin tức', value: ARCHIVE_LAYOUT_ARTICLE},
]

export const MEDIA_TYPE_IMAGE = "IMAGE";
export const MEDIA_TYPE_VIDEO = "VIDEO";
export const MEDIA_TYPE_PDF = "PDF";
export const MEDIA_TYPE_EXCEL = "EXCEL";
export const MEDIA_TYPE_ZIP = "ZIP";
export const MEDIA_TYPE_GIF = "GIF";
export const MEDIA_TYPE_DOCX = "DOCX";
export const MEDIA_TYPE_FOLDER = "FOLDER";
