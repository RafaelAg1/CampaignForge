import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import CampaignDetail from "./pages/CampaignDetail";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";


export const router = createBrowserRouter([
    {path: "/login", element: <Login/>},
    {path: "/register", element: <Register/>},

    // Privadas (envueltas por el guard)
    {
        element: <ProtectedRoute/>,
        children: [
            {
                path: "/",
                element: <App/>,
                children: [
                    {index: true, element: <Dashboard/>},
                    {path: "campaigns", element: <Campaigns/>},
                    { path: "campaigns/:id", element: <CampaignDetail /> }, // ✅ AÑADE ESTO
                    { path: "campaigns/:id/characters/create", element: <CharacterCreate /> },
                ],
            },
        ],
    },
]);