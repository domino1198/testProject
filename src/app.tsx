import React from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'

import {AuthPage} from "./pages/auth";
import {ContactsPage} from "./pages/contacts";
import {useAppSelector} from "./hooks/reduxHooks";
import {getTokenSelector} from "./redux/selectors";


export const App = () => {

    const token = useAppSelector(getTokenSelector)

    return (
        <Router>
            <Routes>
                <Route path="*"
                       element={token ? <Navigate to="/contacts" replace/> : <Navigate to="/" replace/>}/>
                <Route path="/" element={<AuthPage/>}/>
                <Route path="/contacts" element={token ? <ContactsPage/> : <Navigate to="/" replace/>}/>
            </Routes>
        </Router>
    )
}
