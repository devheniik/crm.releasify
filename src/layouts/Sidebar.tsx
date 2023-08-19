import Navbar from "../components/Navbar.tsx"
import {Fragment} from "react";

export default function Sidebar(props : { children: any }) {
    return (
        <>
            <Navbar />
            <div className={"m-5 p-5 shadow-sm min-h-screen"}>
                <Fragment>{props.children}</Fragment>
            </div>
        </>
    )
}