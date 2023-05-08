import { Link } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    function logout() {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        }).then(() => {
            setUserInfo(null);
            window.location.reload();
        });
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className='logo'>LegalCompany</Link>
            <nav>
                {username ? (
                    <>
                        <Link to={'/create'}>Create Request</Link>
                        <a onClick={logout}>Sign out</a>
                    </>
                ) : (
                    <>
                        <Link to="/login">Sign in</Link>
                        <Link to="/register">Sign Up</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
