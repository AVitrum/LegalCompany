import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../components/UserContext";
import '../../components/styles/LoginPage.css';

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (response.ok) {
            response.json().then((userInfo) => {
                setUserInfo(userInfo);
                setRedirect(true);
            });
        } else {
            alert("Wrong credentials");
        }
    }

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                <input
                    className="form-control"
                    id="exampleInputEmail1"
                    type="username"
                    placeholder="username"
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input
                    className="form-control"
                    id="exampleInputPassword1"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
            </div>
            <button className={'btn btn-primary'}>Login</button>
        </form>
    );
}
