import React from 'react';
import '../styles/contact-page.css'

export default function ContactPage() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="contact-card" style={{ backgroundColor: '#F7E7CE' }}>
                        <h1>Contact Us</h1>
                        <div className="contact-details">
                            <p>
                                <strong>Address:</strong> Liberty Avenue, Uzhorod, Ukraine
                            </p>
                            <p>
                                <strong>Phone:</strong> +380660370880
                            </p>
                            <p>
                                <strong>Email:</strong> camel.legalcompany@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
