import {useEffect, useRef, useState} from "react";
import {IProduct, productStore} from "../pages/product/ProductStore";
import {message, Select} from "antd";
import {productService} from "../pages/product/ProductService";

const ProductSelect = (props: { callback?: any }) => {
    const [products, setProducts] = useState<any>([]);
    const ref = useRef<any>();
    const onSearch = async (value: any) => {
        try {
            const response: any = await productService.searchKey(value);
            setProducts(response.body);
        } catch (e: any) {
            setProducts([])
            message.error(e.message)
        }
    }

    return (
        <Select
            ref={r => ref.current = r}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            autoClearSearchValue={false}
            onSelect={(value: any, event: any) => {
                props.callback(value, event);
                ref.current.clear()
            }}
            style={{width: '100%', minWidth: 200}}
            placeholder={`Chọn sản phẩm`}
            allowClear showSearch onSearch={onSearch}>
            {products && products.map((product: IProduct) => {
                return <Select.Option
                    item={product}
                    key={product.id}
                    value={product.id}>
                    {product.name}
                </Select.Option>
            })}
        </Select>
    )
}
export default ProductSelect;
