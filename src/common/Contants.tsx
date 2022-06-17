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
export const STATUS_ACTIVE = true;
export const STATUS_INACTIVE = false;
export const STATUS = [
    {title: 'Kích hoạt', value: STATUS_ACTIVE},
    {title: 'Ngưng hoạt động', value: STATUS_INACTIVE},
]

export interface IPaginate {
    current: number,
    pageSize: number,
    total: number
}
