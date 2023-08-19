import {useDispatch} from 'react-redux'

import {Navigate} from 'react-router-dom'
import getProfile from "../apis/profile.ts";
import {checkFirst, setUser} from "../store/user.ts";
import React, { useEffect, useState} from "react"

const Profile: React.FC = () => {
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [data, setData] = useState({})


    useEffect( () => {

        const loadData = async () => {
            try {
                const res = await getProfile()
                setData(res)
                dispatch(setUser(data))
                setIsLoading(false)
            } catch (e) {
                setIsError(true)
                setIsLoading(false)
            }
        }

        loadData()

    }, [data, dispatch])



    if (isError) {
        return <Navigate to="/login" />
    }

    if (!isLoading && !isError) {
        dispatch(checkFirst())

        return <Navigate to="/" />
    }
}

export default Profile