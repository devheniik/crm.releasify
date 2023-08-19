import {useDispatch, useSelector} from "react-redux"
import {UserStore} from "../types/User.ts"
import getProfile from "../apis/profile.ts"
import {setUser, setInitialRoute} from "../store/user.ts"
import {Navigate} from "react-router-dom"
import {Fragment, useEffect} from "react";
import {useState} from "react";

const Guard = (props: { route: string | null, children: any }) => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state: { user: UserStore }) => state.user.isAuth)
    const [auth, setAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {

        setAuth(isAuth)

        console.log(auth, "auth")

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

        if (!auth && localStorage.getItem("access_token")) {
            checkAuth()
        } else {
            setIsLoading(false)
        }


    }, [props.children])


    if (auth) {
        console.log(auth && !isLoading, auth, isLoading, "well")
        return <Fragment>{props.children}</Fragment>
    }

    if (!isLoading && !auth) {
        console.log(!isLoading && !auth, isLoading, auth, "login")
        if (props.route) {
            dispatch(setInitialRoute(props.route))
        }
        return <Navigate to="/login" />
    }

}

export default Guard