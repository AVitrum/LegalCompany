import Request from "../components/Request";
import {useEffect, useState} from "react";

export default function IndexPage() {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/application', {
            credentials: 'include',
        }).then(responce => {
            responce.json().then(request => {
                setRequests(request);
            });
        });
    }, []);
    return (
        <>
            {requests.length > 0 && requests.map(request => (
                <Request {...request}/>
            ))}
        </>
    );
}