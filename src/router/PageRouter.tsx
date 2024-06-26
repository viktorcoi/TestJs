import React from "react";
import MainPage from "../pages/Main/MainPage";
import Test from "../pages/Test/Test";
import Result from "../pages/Result/Result";
import History from "../pages/History/History";
import AddQuestion from "../pages/AddQuestion/AddQuestion";

const pageRouter = [
    {
        element: <MainPage/>,
        url: '/'
    },
    {
        element: <Test/>,
        url: '/test'
    },
    {
        element: <History/>,
        url: '/history'
    },
    {
        element: <Result/>,
        url: '/history/:id'
    },
    {
        element: <AddQuestion/>,
        url: '/add'
    }
]

export default pageRouter;