import React from "react";
import { Link } from "react-router-dom";

export default function Request({ _id, title, email, phone, fullName, author, createdAt }) {
    return (
        <tr>
            <td>{fullName}</td>
            <td>
                <Link to={`/application/${_id}`} className="link-as-text">
                    {title}
                </Link>
            </td>
            <td>{phone}</td>
            <td>{email}</td>
            <td>{author.username}</td>
            <td>{createdAt}</td>
        </tr>
    );
}
