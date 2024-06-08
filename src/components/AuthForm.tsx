import { useState } from "react";
import api from "../api/interceptor";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../lib/constants";
import { login, register } from "../api/auth";
import DNAAnimation from "./DNAAnimation";
// import LoadingIndicator from "./LoadingIndicator";

function AuthForm({ route, method }) {
    // Route we want to go to, method is registering or logging out
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = method == "login" ? 
                await login({ username, password }) :
                await register({ username, password, email })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                window.dispatchEvent(new Event("storage"));
                navigate("/")
            } else {
                // If register then need to login after
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="flex w-full h-full justify-center items-center bg-slate-950">
            <form onSubmit={handleSubmit} className="z-[2] flex flex-col w-1/4 h-fit rounded-xl p-4 bg-gray-200 items-center bg-slate-800">
                <input
                    className="form-input w-3/4 rounded m-1 p-1"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    className="form-input w-3/4 rounded m-1 p-1"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />

                {method=="register" && <input
                    className="w-3/4 rounded m-1 p-1"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />}
                {/* {loading && <LoadingIndicator />} */}
                <button className="form-button bg-purple-300 rounded w-3/4 m-1" type="submit">
                    {name}
                </button>
                {method == "login" && <div className="text-white">Not a user? <a className="text-blue-300" href="/register">Register here</a></div>}

            </form>

            <div className="fixed z-[0] h-full w-1/2 right-0">
                <DNAAnimation />
            </div>
        </div>
    );
}

export default AuthForm