import {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {UserContext} from "../../components/UserContext";

export default function RequestPage() {
    const [requestInfo, setRequestInfo] = useState(null);
    const {userInfo} = useContext(UserContext);
    const {id} = useParams();
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
        <div className={'request-page'}>
            <h1>{requestInfo.title}</h1>
            {userInfo.id === requestInfo.author._id && (
                <div>
                    <Link to={`/edit/${requestInfo._id}`}>Edit this request</Link>
                </div>
            )}
            <div dangerouslySetInnerHTML={ { __html: requestInfo.description } }/>
        </div>
    );
}