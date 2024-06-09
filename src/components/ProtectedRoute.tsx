import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api/interceptor"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../lib/constants";
import { useState, useEffect } from "react";


function ProtectedRoute({ children }) {
    // Check if authorized before accessing route, otherwise redicted to authorize
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        // When load protected route then authorized set to false initially
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        // Refresh access token authomatically
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        // Check if need to refresh or get access token
        const token = localStorage.getItem(ACCESS_TOKEN); 
        if (!token) {
            // If token isnt authorized
            setIsAuthorized(false);
            return;
        }
        // If there is a token, then check expiration
        const decoded = jwtDecode(token); 
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    // If isnt authorized then navigate to login
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;