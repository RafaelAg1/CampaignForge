import {useAuth} from "./AuthContext.jsx";
import {Navigate, Outlet} from "react-router-dom";

export default function ProtectedRoute() {
    const {hayUsuario} = useAuth()

    if (!hayUsuario){
        return <Navigate to={"/login"} replace></Navigate>
    }
    return <Outlet/>
}