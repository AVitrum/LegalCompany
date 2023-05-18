import 'react-quill/dist/quill.snow.css';
import '../../styles/components/editor.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../../components/pages/Editor";

export default function CreateRequest() {
    const [title, setTitle] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [redirect, setRedirect] = useState('');
    const [createHover, setCreateHover] = useState(false);
    const createStyle = {
        backgroundColor: createHover ? "#7DCEA0" : "",
        borderColor: createHover ? "#7DCEA0" : "",
        color: createHover ? "black" : "#fff",
    }

    async function createNewRequest(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/application', {
            method: 'POST',
            body: JSON.stringify({ title, fullName, email, phone, description }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/show'} />;
    }

    return (
        <div className="create-request-container">
            <form onSubmit={createNewRequest}>
                <h1>Create a request</h1>

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
                    <label htmlFor="exampleFormControlInput1" className="form-label">FullName</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="FullName"
                        value={fullName}
                        onChange={ev => setFullName(ev.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        required
                        placeholder="Email"
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
                    className="btn btn-primary create-request-button"
                    onMouseOver={() => setCreateHover(true)}
                    onMouseOut={() => setCreateHover(false)}
                    style={createStyle}
                >
                    Create request
                </button>
            </form>
        </div>
    );
}
