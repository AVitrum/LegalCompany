import { Link } from "react-router-dom";

export default function Request({ _id, title, email, phone, author }) {
    return (
        <div className="request">
            <Link to={`/application/${_id}`} className="link">
                <h2 className="title">{title}</h2>
            </Link>
            <div className="author-info">
                <p>{author.username}</p>
                <p>{email}</p>
                <p>{phone}</p>
            </div>
        </div>
    );
}
