import React from 'react';
import {BrowserRouter} from "react-router-dom";
import RouterApp from "../router/RouterApp";
import Header from "../components/Header/Header";
import {TestsContextProvider} from "../context/TestsContext";
import BottomNavigation from "../components/BottomNavigation/BottomNavigation";

function App() {
    return (
        <BrowserRouter>
            <TestsContextProvider>
                <Header/>
                <RouterApp/>
                <BottomNavigation/>
            </TestsContextProvider>
        </BrowserRouter>
    );
}

export default App;
