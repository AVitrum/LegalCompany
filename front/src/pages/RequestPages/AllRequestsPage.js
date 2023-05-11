import React, { useEffect, useState } from "react";
import Request from "../../components/Request";
import TableHeader from "../../components/TableHeader";

export default function AllRequestsPage() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/application", {
            credentials: "include",
        }).then((response) => {
            response.json().then((request) => {
                setRequests(request);
            });
        });
    }, []);

    return (
        <div className="table-responsive">
            <table className="table table-striped-columns border-secondary">
                <TableHeader />
                <tbody>
                {requests.length > 0 &&
                    requests.map((request) => <Request key={request._id} {...request} />)}
                </tbody>
            </table>
        </div>
    );
}
