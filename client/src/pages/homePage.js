import React, { useContext } from 'react';
import { UserContext } from "../components/UserContext";
import { Link } from "react-router-dom";

export default function HomePage() {
    const { userInfo } = useContext(UserContext);
    const username = userInfo?.username;
    const admin = userInfo?.isAdmin;

    return (
        <div className="container">
            <section className="py-5">
                <div className="text-center">
                    <h1 className="display-4">Welcome to Camel Legal Company</h1>
                    <p className="lead">Hello, welcome to our website. We provide professional legal services to help you win any court case or provide consultation if necessary.</p>
                </div>
                <div className="row justify-content-center mt-5">
                    {!username ? (
                        <div className="card mb-4" style={{ backgroundColor: '#F7E7CE' }}>
                            <div className="card-body">
                                <h5 className="card-title">First time on our site?</h5>
                                <p className="card-text">We recommend you to register and create your first request.</p>
                                <Link to={`/register`} className="btn btn-primary">Sign up</Link>|
                                <Link to={`/login`} className="btn btn-primary">Sign in</Link>
                            </div>
                        </div>
                    ) : (
                        <div className="card mb-4" style={{ backgroundColor: '#F7E7CE' }}>
                            <div className="card-body">
                                {admin ? (
                                    <div>
                                        <h5 className="card-title">Welcome, Admin!</h5>
                                        <p className="card-text">You have administrative privileges.
                                            Let's get back to work!</p>
                                        <Link to={`/show`} className="btn btn-primary">Requests</Link>
                                    </div>
                                ) : (
                                    <div>
                                        <h5 className="card-title">Welcome back, {username}!</h5>
                                        <p className="card-text">We're glad to see you again.
                                            You can now create a new request or browse through our legal resources.</p>
                                        <Link to={`/create`} className="btn btn-primary">Create request</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card mb-4" style={{ backgroundColor: '#F7E7CE' }}>
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Why Choose Us?</h5>
                                <ul className="list-group">
                                    <li className="list-group-item" style={{backgroundColor: '#FAEBD7'}}>
                                        Experienced and dedicated team of lawyers
                                    </li>
                                    <li className="list-group-item" style={{backgroundColor: '#FAEBD7'}}>
                                        Successful track record in court cases
                                    </li>
                                    <li className="list-group-item" style={{backgroundColor: '#FAEBD7'}}>
                                        Personalized legal consultation
                                    </li>
                                    <li className="list-group-item" style={{backgroundColor: '#FAEBD7'}}>
                                        Competitive pricing and transparent billing
                                    </li>
                                    <li className="list-group-item" style={{backgroundColor: '#FAEBD7'}}>
                                        Wide range of legal services
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card mb-4" style={{ backgroundColor: '#F7E7CE' }}>
                            <div className="card-body">
                                <h5 className="card-title fw-bold">Our Services</h5>
                                <ul className="list-group">
                                    <li className="list-group-item" style={{backgroundColor: '#FAEBD7'}}>
                                        Civil litigation
                                    </li>
                                    <li className="list-group-item" style={{backgroundColor: '#FAEBD7'}}>
                                        Family law
                                    </li>
                                    <li className="list-group-item" style={{backgroundColor: '#FAEBD7'}}>
                                        Business and corporate law
                                    </li>
                                    <li className="list-group-item" style={{backgroundColor: '#FAEBD7'}}>
                                        Real estate law
                                    </li>
                                    <li className="list-group-item" style={{backgroundColor: '#FAEBD7'}}>
                                        Employment law
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
