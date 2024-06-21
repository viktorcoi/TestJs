import { Route, Routes } from "react-router-dom";
import pageRouter from "./PageRouter";

const RouterApp = () => {
    return (
        <>
            <Routes>
                {pageRouter.map((page, key) => (
                    <Route key={key} path={page.url} element={page.element} />
                ))}
            </Routes>
        </>
    )
}

export default RouterApp;
