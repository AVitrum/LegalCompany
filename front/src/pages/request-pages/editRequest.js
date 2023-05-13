import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../../components/pages/Editor";
import '../../styles/components/editor.css'


export default function EditRequest() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [updateHover, setUpdateHover] = useState(false);

    const updateStyle = {
        backgroundColor: updateHover ? "#7DCEA0" : "",
        borderColor: updateHover ? "#7DCEA0" : "",
        color: updateHover ? "black" : "#fff",
    }

    useEffect(() => {
        fetch('http://localhost:4000/application/' + id)
            .then(response => {
                response.json().then(requestInfo => {
                    setTitle(requestInfo.title);
                    setFullName(requestInfo.fullName);
                    setEmail(requestInfo.email);
                    setPhone(requestInfo.phone);
                    setDescription(requestInfo.description);
                });
            });
    }, []);

    async function deleteRequest(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/application/' + id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });

        if (response.ok) {
            setRedirect(true);
        }
    }

    async function updateRequest(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/application', {
            method: 'PUT',
            body: JSON.stringify({title, fullName, email, phone, description, id}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        });

        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/application/' + id}/>
    }

    return (
        <form onSubmit={updateRequest}>
            <h1>Create a request</h1>
            <br></br>
            <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
            <div className={"mb-3"}>
                <input type="title"
                       className={"form-control"}
                       required={true}
                       placeholder={'Title'}
                       value={title}
                       onChange={ev => setTitle(ev.target.value)}
                />
            </div>
            <div className={"mb-3"}>
                <label htmlFor="exampleFormControlInput1" className="form-label">FullName</label>
                <input type="fullName"
                       className={"form-control"}
                       required={true}
                       placeholder={'FullName'}
                       value={fullName}
                       onChange={ev => setFullName(ev.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email"
                       className={"form-control"}
                       required={true}
                       placeholder={'Email'}
                       value={email}
                       onChange={ev => setEmail(ev.target.value)}
                />
            </div>
            <div className={"mb-3"}>
                <label htmlFor="exampleFormControlInput1" className="form-label">Phone</label>
                <input type="phone"
                       className={"form-control"}
                       required={true}
                       placeholder={'Phone'}
                       value={phone}
                       onChange={ev => setPhone(ev.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                <div className="editor-container">
                    <Editor onChange={setDescription} value={description}/>
                </div>
            </div>
            <button type="submit"
                    className="btn btn-primary"
                    onMouseOver={() => setUpdateHover(true)}
                    onMouseOut={() => setUpdateHover(false)}
                    style={updateStyle}>
                Update request
            </button>
            <div className={"mb-3"}></div>
            <button type="button"
                    className="btn btn-danger"
                    onClick={deleteRequest}>
                Delete request
            </button>

        </form>
    );
}