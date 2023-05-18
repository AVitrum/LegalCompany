import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [signInHover, setSignInHover] = useState(false);
  const [signUpHover, setSignUpHover] = useState(false);
  const navigate = useNavigate();
  const signUpStyle = {
    backgroundColor: signUpHover ? "#7DCEA0" : "",
    borderColor: signUpHover ? "#7DCEA0" : "",
    color: "black"
  };
  const signInStyle = {
    backgroundColor: signInHover ? "#7DCEA0" : "",
    borderColor: signInHover ? "#7DCEA0" : "",
    color: "black"
  };

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
      navigate('/');
    });
  }

  const username = userInfo?.username;
  const isAdmin = userInfo?.isAdmin;

  return (
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#CDB891', height: "80px", width: "100%" }}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src="/logo.png" alt="Logo" className="navbar-logo navbar-logo-small" />
            Camel Legal Company
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {username && !isAdmin && (
                  <li className="nav-item">
                    <Link to="/create" className="nav-link">Create Request</Link>
                  </li>
              )}
              {isAdmin && (
                  <li className="nav-item">
                    <Link to="/show" className="nav-link">All user requests</Link>
                  </li>
              )}
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Our contacts</Link>
              </li>
            </ul>

            <ul className="navbar-nav">
              {username ? (
                  <li className="nav-item dropdown">
                    <a
                        className="dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                      <img src="/humanIcon.png" alt="Logo" className="navbar-logo navbar-logo-small-human" />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right dropdown-menu-end" aria-labelledby="navbarDropdown">
                      {!isAdmin && (
                          <>
                            <li className="dropdown-item">{username}</li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                              <Link to="/show" className="dropdown-item">
                                My requests
                              </Link>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                          </>
                      )}
                      <li><button onClick={logout} className="dropdown-item">Sign Out</button></li>
                    </ul>
                  </li>
              ) : (
                  <li className="nav-item dropdown">
                    <a
                        className="dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                      <img src="/humanIcon.png" alt="Logo" className="navbar-logo navbar-logo-small-human" />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right dropdown-menu-end" aria-labelledby="navbarDropdown">
                      <li>
                        <Link
                            to="/login"
                            onMouseOver={() => setSignInHover(true)}
                            onMouseOut={() => setSignInHover(false)}
                            className={`dropdown-item`}
                            style={signInStyle}
                        >
                          Sign In
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <Link
                            to="/register"
                            onMouseOver={() => setSignUpHover(true)}
                            onMouseOut={() => setSignUpHover(false)}
                            className={`dropdown-item`}
                            style={signUpStyle}
                        >
                          Sign Up
                        </Link>
                      </li>
                    </ul>
                  </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
  );
}
