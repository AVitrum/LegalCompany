export default function Request({ title, fullName, email, phone, description, author }) {
    return (
        <div className="request">
            <h2>{title}</h2>
            <div className="texts">
                <p>{author.username}</p>
                <p>{email}</p>
                <p>{phone}</p>
                <h3>{description}</h3>
            </div>
        </div>
    );
}
