import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../../components/Editor";

export default function EditRequest() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [redirect, setRedirect] = useState(false);

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
            <Editor onChange={setDescription} value={description}/>
            <button style={{marginTop: '5px'}}>Update request</button>

        </form>
    );
}