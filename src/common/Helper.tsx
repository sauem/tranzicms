import moment from "moment";
import {Badge, Dropdown} from "antd";
import React from "react";
import UAParser from "ua-parser-js";

class Helper {
    static toPage(data: any) {
        return {
            current: data.current + 1,
            total: data.total,
            pageSize: data.pageSize
        }
    }

    static toDate(timestamp: any) {
        if (!timestamp) {
            return '---';
        }
        return moment.unix(timestamp).format('YYYY-MM-DD H:mm:ss');
    }

    static comparseNow(timestamp: any) {
        if (timestamp <= new Date().getTime()) {
            return 'danger';
        }
        return 'default';
    }

    static getParentKey = (key: any, tree: any): any => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some((item: any) => item.key == key)) {
                    parentKey = node.key;
                } else if (this.getParentKey(key, node.children)) {
                    parentKey = this.getParentKey(key, node.children)
                }
            }
        }
        return parentKey;
    }

    static renTree(data: any, menu?: any) {
        if (!data || data.length <= 0) {
            return [];
        }
        return data.map((item: any, index: number) => {
                if (!item) {
                    return {};
                }
                return {
                    title: menu ? <Dropdown overlay={() => menu(item)} trigger={['contextMenu']}>
                        <span>{item.name}</span>
                    </Dropdown> : item.name,
                    key: item.id,
                    name: item.name,
                    value: item.id,
                    children: this.renTree(item.childs, menu)
                }
            }
        );
    }

    static renderStt(stt: any) {
        switch (stt) {
            case true:
            case 1:
            case 'active':
            case 'ACTIVE':
                return <Badge status="success" text="Active"/>
            case 'INACTIVE':
                return <Badge status="default" text="Inactive"/>
            default:
                return <Badge status="default" text="Disabled"/>
        }
    }

    static genderAgent(agent: string) {
        const parser = new UAParser();
        parser.setUA(agent);
        const result = parser.getResult();
        return `${result.os.name}/${result.os.version} - ${result.browser.name}`
    }

    static replaceNum(number: any) {
        return ` ${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    static parser(value: any) {
        return value!.replace(/\ \s?|(,*)/g, '')
    }
}

export default Helper;
