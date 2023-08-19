import {useDispatch, useSelector} from "react-redux"
import {UserStore} from "../types/User.ts"
import getProfile from "../apis/profile.ts"
import {setUser, setInitialRoute} from "../store/user.ts"
import {Navigate} from "react-router-dom"
import {Fragment, useEffect} from "react";
import {useState} from "react";

const Guard = (props: { route: string, children: any }) => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state: { user: UserStore }) => state.user.isAuth)
    const [auth, setAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {

        setAuth(isAuth)

        if (auth) {
            setAuth(true)
        }

        const checkAuth = async () => {
            try {
                const response = await getProfile()
                dispatch(setUser(response))
                setAuth(true)
                setIsLoading(false)
            } catch {
                setAuth(false)
                setIsLoading(false)
            }
        }

        if (!auth&& localStorage.getItem("access_token")) {
            checkAuth()
        }

    }, [props.children])


    if (auth) {
        return <Fragment>{props.children}</Fragment>
    }

    if (!isLoading) {
        if (props.route) {
            dispatch(setInitialRoute(props.route))
        }
        return <Navigate to="/login" />
    }

}

export default Guard