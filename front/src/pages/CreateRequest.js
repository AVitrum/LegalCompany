import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";

export default function CreateRequest() {
    const [title, setTitle] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [redirect, setRedirect] = useState('');
    async function createNewRequest(ev) {
        ev.preventDefault();
        const responce = await fetch('http://localhost:4000/application', {
            method: 'POST',
            body: JSON.stringify({title, fullName, email, phone, description}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        });

        if (responce.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'}/>
    }

    return (
        <form onSubmit={createNewRequest}>
            <input type="title"
                   placeholder={'Title'}
                   value={title}
                   onChange={ev => setTitle(ev.target.value)}
            />
            <input type="fullName"
                   placeholder={'FullName'}
                   value={fullName}
                   onChange={ev => setFullName(ev.target.value)}
            />
            <input type="email"
                   placeholder={'Email'}
                   value={email}
                   onChange={ev => setEmail(ev.target.value)}
            />
            <input type="phone"
                   placeholder={'Phone'}
                   value={phone}
                   onChange={ev => setPhone(ev.target.value)}
            />
            <ReactQuill value={description}
                        onChange={newValue => setDescription(newValue)}
            />
            <button style={{marginTop: '5px'}}>Create application</button>
            
        </form>
    );
}