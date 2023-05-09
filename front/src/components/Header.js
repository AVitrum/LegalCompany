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
      <nav className="navbar navbar-expand-lg bg-dark fixed-top" style={{ height: "80px", width: "100%" }}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-light">LegalCompany</Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {username ? (
                <>
                  <li className="nav-item">
                    <Link to={'/show'} className="nav-link text-light">Requests</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/create'} className="nav-link text-light">Create Request</Link>
                  </li>
                </>
            ) : null}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {username ? (
                <li className="nav-item ms-auto">
                  <a onClick={logout} className="btn btn-danger">Sign Out</a>
                </li>
            ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="btn btn-primary text-light">Sign in</Link>
                  </li>|
                  <li className="nav-item">
                    <Link to="/register" className="btn btn-success text-light">Sign Up</Link>
                  </li>
                </>
            )}
          </ul>
        </div>
      </nav>
  );
}
