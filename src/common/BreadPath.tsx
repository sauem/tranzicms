import React from "react";
import {Breadcrumb} from 'antd';
import {Link} from "react-router-dom";


const BreadPath = ({items}: any) => {
    return (

        <Breadcrumb style={{margin: '16px 0'}}>
            {items && items.map((item: any, index: number) => {
                return (

                    !item.link ? <Breadcrumb.Item key={index}>{item.name}</Breadcrumb.Item> :
                        <Breadcrumb.Item key={index}>
                            <Link to={item.link}>{item.name}</Link>
                        </Breadcrumb.Item>
                )
            })}
        </Breadcrumb>
    )
}
export default BreadPath;
