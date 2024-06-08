import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../lib/constants";
import { getCurrentUser, login, register } from "../api/auth";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { useQuery } from "@tanstack/react-query";
import { capitalizeString } from "../lib/helpers";
// import LoadingIndicator from "./LoadingIndicator";

function AuthForm({ route, method, className }) {
    // Route we want to go to, method is registering or logging out
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method == "profile" ? "Edit" : capitalizeString(method);

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext)

    const {isLoading, isError, isSuccess, data} = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
      })
    useEffect(()=>{
        const token = localStorage.getItem(ACCESS_TOKEN);
        
        const setUserData = async ()=> {
            if(isLoading) setCurrentUser({})
            if(isError) setCurrentUser({})
            else if(isSuccess){
                console.log(data)
                setCurrentUser(data)
            }
        }

        if(method=="profile" && token){
            if(currentUser.hasOwnProperty('username')) {
                setUsername(currentUser.username)
                setEmail(currentUser.email)
            } else {
                setUserData()
                setUsername(currentUser.username)
                setEmail(currentUser.email)
            }
        }
    })
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
        <div className={`${className} justify-center items-center w-full flex`}>
            <form onSubmit={handleSubmit} className="z-[2] flex flex-col w-1/4 h-fit rounded-xl p-4 bg-gray-200 items-center bg-slate-800">
                <input
                    className="form-input w-3/4 rounded m-1 p-1"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    disabled={method=="profile"}
                />
                {method != "profile" && <input
                    className="form-input w-3/4 rounded m-1 p-1"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />}

                {(method=="register" || method == "profile") && <input
                    className="w-3/4 rounded m-1 p-1"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    disabled={method=="profile"}
                />}
                {/* {loading && <LoadingIndicator />} */}
                <button className="form-button bg-purple-300 rounded w-3/4 m-1" type="submit">
                    {name}
                </button>
                {method == "login" && <div className="text-white">Not a user? <a className="text-blue-300" href="/register">Register here</a></div>}

            </form>
        </div>
    );
}

export default AuthForm