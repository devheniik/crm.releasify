import { useSelector, useDispatch } from 'react-redux'
import { checkFirst } from '../store/user'
import {Navigate} from 'react-router-dom'
import {UserStore} from '../types/User'
import React from "react";

const Navigator: React.FC = () => {
    const dispatch = useDispatch()
    const { initialRoute } = useSelector((state: { user: UserStore }) => state.user)

    dispatch(checkFirst())
    if (initialRoute && initialRoute !== '/' && initialRoute !== '/login') {
        return <Navigate to={initialRoute} />
    }

    return <Navigate to="/" />

}

export default Navigator