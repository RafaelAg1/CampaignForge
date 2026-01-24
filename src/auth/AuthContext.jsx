import {createContext, useContext,useEffect, useState} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [hayUsuario, setHayUsuario] = useState(()=>{
        return localStorage.getItem("cf_hayusuario")
    })

    const login = () => setHayUsuario(true)
    const logout = () => setHayUsuario(false)

    useEffect(() => {
        const guardado = localStorage.getItem("cf_hayusuario");
        if (guardado === "true"){
            setHayUsuario(true)
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("cf_hayusuario",hayUsuario);
    }, [hayUsuario]);

    return (
        <AuthContext.Provider value={{hayUsuario, login, logout,setHayUsuario}}>{children}</AuthContext.Provider>
    )

}

export function useAuth() {
    const context = useContext(AuthContext);
    return context
}
