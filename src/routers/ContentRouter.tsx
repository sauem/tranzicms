import React from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/home";
import User from "../pages/user/component";
import Banner from "../pages/banner/component";
import Warehouse from "../pages/warehouse/component";
import Product from "../pages/product/component";
import Order from "../pages/order/component";
import Article from "../pages/article/component";
import Manufacturer from "../pages/manufacturer/component";
import ProductArchive from "../pages/product/component/Archive";
import ArticleArchive from "../pages/article/component/ArticleArchive";
import Purchase from "../pages/purchase/component";

const ContentRouter = (props: any) => {
    return (
        <Routes>
            <Route path={'/'} element={<HomePage/>}/>
            <Route path={'/user'} element={<User/>}/>
            <Route path={'/banner'} element={<Banner/>}/>
            <Route path={'/warehouse'} element={<Warehouse/>}/>
            <Route path={'/purchase'} element={<Purchase/>}/>
            <Route path={'/product'} element={<Product/>}/>
            <Route path={'/product/manufacturer'} element={<Manufacturer/>}/>
            <Route path={'/product/archive'} element={<ProductArchive/>}/>
            <Route path={'/order'} element={<Order/>}/>
            <Route path={'/article'} element={<Article/>}/>
            <Route path={'/article/archive'} element={<ArticleArchive/>}/>
            <Route
                path="*"
                element={
                    <main style={{padding: "1rem"}}>
                        <p>There's nothing here!</p>
                    </main>
                }
            />
        </Routes>
    )
}
export default ContentRouter;
