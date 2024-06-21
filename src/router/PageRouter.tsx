import React from "react";
import MainPage from "../pages/Main/MainPage";
import Test from "../pages/Test/Test";

const pageRouter = [
    {
        element: <MainPage/>,
        url: '/'
    },
    {
        element: <Test/>,
        url: '/test'
    },
]

export default pageRouter;