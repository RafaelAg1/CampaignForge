import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [hayUsuario, setHayUsuario] = useState(() => {
        return localStorage.getItem("cf_hayusuario") === "true";
    })

    const login = () => setHayUsuario(() => {
        setHayUsuario(true);
        localStorage.setItem("cf_hayusuario", "true");
    })
    const logout = () => {
        setHayUsuario(false);
        localStorage.setItem("cf_hayusuario", "false");
    };

    useEffect(() => {
        const guardado = localStorage.getItem("cf_hayusuario");
        if (guardado === "true") {
            setHayUsuario(true)
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("cf_hayusuario", hayUsuario ? "true" : "false");
    }, [hayUsuario]);

    return (
        <AuthContext.Provider value={{hayUsuario, login, logout, setHayUsuario}}>{children}</AuthContext.Provider>
    )

}

export function useAuth() {
    const context = useContext(AuthContext);
    return context
}
