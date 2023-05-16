import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {UserContext} from "../../components/UserContext";

export default function RequestPage() {
    const [requestInfo, setRequestInfo] = useState(null);
    const {userInfo} = useContext(UserContext);
    const {id} = useParams();
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
        return '';
    }
    
    return (
        <div className="p-5 mb-4 rounded-3" style={{ backgroundColor: '#F7E7CE' }}>
            <div className="container-fluid py-5">
                <h2 className="display-7 fw-bold">{requestInfo.title}</h2>
                <p>{requestInfo.fullName} | {requestInfo.email} | {requestInfo.phone}</p>
                <p className="col-md-8 fs-4" dangerouslySetInnerHTML={{__html: requestInfo.description}}/>
                <hr/>
                <h3 className="display-9 fw-bold">Reaction</h3>
                <p>(If there is nothing here, your request is being processed)</p>
                <p className="col-md-8 fs-4">{requestInfo.reaction}</p>
                {userInfo.id === requestInfo.author._id && (
                    <button className="btn btn-primary"
                            onMouseOver={() => setUpdateHover(true)}
                            onMouseOut={() => setUpdateHover(false)}
                            style={updateStyle}
                            type="button"
                            onClick={() => { window.location.href = `/edit/${requestInfo._id}` }}>
                        Edit this request
                    </button>
                )}
                {userInfo.isAdmin && (
                    <button className="btn btn-primary"
                            type="button"
                            onClick={() => { window.location.href = `/edit/${requestInfo._id}` }}>
                        Add reaction
                    </button>
                )}
            </div>
        </div>
    );
}