import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../components/UserContext";

export default function RequestPage() {
    const [requestInfo, setRequestInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [updateHover, setUpdateHover] = useState(false);
    const updateStyle = {
        backgroundColor: updateHover ? "#EEEC44" : "",
        borderColor: updateHover ? "#EEEC44" : "",
        color: updateHover ? "black" : "#fff",
    }

    useEffect(() => {
        fetch(`http://localhost:4000/application/${id}`)
            .then(response => {
                response.json().then(requestInfo => {
                    setRequestInfo(requestInfo);
                });
            });
    }, []);

    if (!requestInfo) {
        return null;
    }

    const goBackToAllRequests = () => {
        navigate("/show");
    };

    const goToHomePage = () => {
        navigate("/");
    };

    return (
        <div className="container mt-5">
            <div className="card p-4" style={{ backgroundColor: '#F7E7CE' }}>
                <h2 className="card-title">{requestInfo.title}</h2>
                <p className="card-text">{requestInfo.fullName} | {requestInfo.email} | {requestInfo.phone}</p>
                <div className="card-description" dangerouslySetInnerHTML={{ __html: requestInfo.description }} />
                <hr />
                <h3 className="card-reaction-title">Reaction</h3>
                {requestInfo.reaction ? (
                    <p className="card-reaction-content">{requestInfo.reaction}</p>
                ) : (
                    <p className="card-no-reaction-message">(If there is nothing here, your request is being processed)</p>
                )}

                <div className="d-grid gap-2 mt-4">
                    {userInfo.id === requestInfo.author._id && (
                        <button
                            className="btn btn-primary"
                            onMouseOver={() => setUpdateHover(true)}
                            onMouseOut={() => setUpdateHover(false)}
                            style={updateStyle}
                            onClick={() => { navigate(`/edit/${requestInfo._id}`) }}
                        >
                            Edit this request
                        </button>
                    )}

                    {userInfo.isAdmin && (
                        <button
                            className="btn btn-primary"
                            onClick={() => { navigate(`/edit/${requestInfo._id}`) }}
                        >
                            Add reaction
                        </button>
                    )}

                    <button className="btn btn-secondary" onClick={goBackToAllRequests}>Back to All Requests</button>
                    <button className="btn btn-secondary" onClick={goToHomePage}>Go to Home Page</button>
                </div>
            </div>
        </div>
    );
}
