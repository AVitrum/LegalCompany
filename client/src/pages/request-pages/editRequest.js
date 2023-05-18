import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "../../components/pages/Editor";
import "../../styles/components/editor.css";
import { UserContext } from "../../components/UserContext";

export default function EditRequest() {
    const { id } = useParams();
    const { userInfo } = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");
    const [reaction, setReaction] = useState("");
    const [updateHover, setUpdateHover] = useState(false);
    const navigate = useNavigate();
    const updateStyle = {
        backgroundColor: updateHover ? "#7DCEA0" : "",
        borderColor: updateHover ? "#7DCEA0" : "",
        color: updateHover ? "black" : "#fff",
    }

    useEffect(() => {
        fetch("http://localhost:4000/application/" + id)
            .then((response) => {
                response.json().then((requestInfo) => {
                    setTitle(requestInfo.title);
                    setFullName(requestInfo.fullName);
                    setEmail(requestInfo.email);
                    setPhone(requestInfo.phone);
                    setDescription(requestInfo.description);
                    setReaction(requestInfo.reaction);
                });
            });
    }, []);

    async function deleteRequest(ev) {
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/application/" + id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (response.ok) {
            navigate("/show");
        }
    }

    async function updateRequest(ev) {
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/application", {
            method: "PUT",
            body: JSON.stringify({ title, fullName, email, phone, description, reaction, id }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        if (response.ok) {
            navigate("/application/" + id);
        }
    }


    return (
        <div className="create-request-container">
            <form onSubmit={updateRequest}>
                <h1>Edit</h1>

                {userInfo.isAdmin ? (
                    <>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Reaction</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                placeholder="Reaction"
                                value={reaction}
                                onChange={ev => setReaction(ev.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary update-request-button"
                            onMouseOver={() => setUpdateHover(true)}
                            onMouseOut={() => setUpdateHover(false)}
                            style={updateStyle}
                        >
                            Add reaction
                        </button>
                        <div className="form-group" />
                    </>
                ) : (
                    <>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                placeholder="Title"
                                value={title}
                                onChange={ev => setTitle(ev.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                placeholder="Full Name"
                                value={fullName}
                                onChange={ev => setFullName(ev.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                required
                                placeholder="Email Address"
                                value={email}
                                onChange={ev => setEmail(ev.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                placeholder="Phone"
                                value={phone}
                                onChange={ev => setPhone(ev.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                            <div className="editor-container">
                                <Editor onChange={setDescription} value={description} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary update-request-button"
                            onMouseOver={() => setUpdateHover(true)}
                            onMouseOut={() => setUpdateHover(false)}
                            style={updateStyle}
                        >
                            Update request
                        </button>
                    </>
                )}

                <div className="form-group">
                    <button
                        type="button"
                        className="btn btn-danger delete-request-button"
                        onClick={deleteRequest}
                    >
                        Delete request
                    </button>
                </div>
            </form>
        </div>
    );
}
