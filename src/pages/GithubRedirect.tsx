import React, {useEffect, useState} from 'react'
import githubAuth from "../apis/githubAuth.ts"
import Profile from '../services/Profile'
import {Spinner} from '@chakra-ui/react'
import {useDispatch} from 'react-redux'
import { setAccessToken} from '../store/user'
import {useSearchParams, Navigate} from 'react-router-dom'

function GithubRedirect () {
    const [params] = useSearchParams()
    const code: string | null = params.get("code")

    if (!code) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <div className={"h-screen w-screen flex justify-center items-center"}>
                <Spinner/>
                <Redirect code={code} />
            </div>
        </>
    )

}


const Redirect: React.FC<{code: string}> = ({ code }) => {

    const dispatch = useDispatch()

    const [isLoading_, setIsLoading_] = useState(true)
    const [isError_, setIsError_] = useState(false)


    useEffect( () => {

        const loadData = async () => {
            try {
                const res = await githubAuth(code)
                dispatch(setAccessToken(res))
                setIsLoading_(false)
            } catch (e) {
                setIsError_(true)
                setIsLoading_(false)
            }
        }

        loadData()

    }, [code, dispatch])



    if (isError_) {
        return <Navigate to="/login" />
    }

    if (!isLoading_) {
        return <Profile />
    }
}

export default GithubRedirect
