import { useState } from "react"

export default function Login() {

    const [formValues, setFormValues] = useState({

        email: 'omar@gmail.com',
        password: '123'
    });

    function handleInputChange({ target: { value, name } }) {

        setFormValues(prev => ({

            ...prev,
            [name]: value

        }));


    }

    async function handleLogin() {

        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
        });

        try {

            const json = await response.json();
            console.log(json);

        } catch (e) {

            console.log(e)

        }


        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });

    }

    const { email, password } = formValues;

    console.log(email, password)

    return <div style={{ display: 'grid', gap: '1rem', maxWidth: '500px', margin: 'auto' }}>

        <h1>Login</h1>

        <input autoComplete={"false"} name="email" type="email" value={formValues.email} onChange={handleInputChange} />
        <input autoComplete={"false"} name="password" type="password" value={formValues.password} onChange={handleInputChange} />

        <button onClick={handleLogin}>Login</button>

    </div>

}