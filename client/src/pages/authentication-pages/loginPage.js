import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../components/UserContext";
import '../../styles/login-page.css';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
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
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <input
                    className="form-control"
                    required
                    id="exampleInputEmail1"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input
                    className="form-control"
                    required
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
