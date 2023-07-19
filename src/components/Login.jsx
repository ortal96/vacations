import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory()

    const login = async () => {
        const res = await fetch("http://localhost:1000/users/login", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include"
        })

        const data = await res.json()
        console.log(data)
        if (!data.err) {
            localStorage.username = data.username
            localStorage.role = data.role
            history.push("/")
        } else {
            alert(data.msg)
        }
    }

    return (
        <div className='login'>
            
            <img
                class="demo-bg"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIcL9DKLUk63UcWeJ9r3qnRGsgdH8efE6Vmw&usqp=CAU"
                alt=""
            ></img>
            <div className='form'>
                <h1>Log-in</h1>
                <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)} />
                <input type="pwssword" placeholder="password" onChange={e => setPassword(e.target.value)} />
                <button className='submit' onClick={login} disabled={!username || !password}>login</button>
                <NavLink to="/register">don't have an account? go to register</NavLink>
            </div>
        </div>
    )
}



