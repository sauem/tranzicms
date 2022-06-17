import {Route, Routes} from "react-router-dom";
import Login from "../pages/auth/component/Login";

export default function PublicRouter() {
    return (
        <Routes>
            <Route path={'/'} element={<Login/>}/>
        </Routes>
    )
}
