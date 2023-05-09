import { Link } from "react-router-dom";

export default function Request({ _id, title, email, phone, author }) {
    return (
        <tr>
            <td>{author.username}</td>
            <td>
                <Link to={`/application/${_id}`} className="link">
                    {title}
                </Link>
            </td>
            <td>{email}</td>
            <td>{phone}</td>
        </tr>
    );
}
