import {useState} from 'react';
import '../../components/styles/RegisterPage.css'
import {Navigate} from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function register(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
        });
        if (response.status === 200) {
            setRedirect(true);
        } else {
            alert('Registration failed');
        }
    }

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                <input type="text"
                       className="form-control"
                       id="exampleInputEmail1"
                       placeholder="username"
                       value={username}
                       onChange={ev => setUsername(ev.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password"
                       className="form-control"
                       id="exampleInputPassword1"
                       placeholder="password"
                       value={password}
                       onChange={ev => setPassword(ev.target.value)}/>
            </div>
            <button className={'btn btn-primary'}>Register</button>
        </form>
    );
}