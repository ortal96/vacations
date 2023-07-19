import { NavLink, useHistory } from 'react-router-dom'
import React , { useState } from 'react'
//firstname, lastname, username, password
export default function Register() {

 const history = useHistory()

const [firstname, setFirstname] = useState("")
const [lastname, setLastname] = useState("")
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")

  const register = async () => {
        const res = await fetch("http://localhost:1000/users/register" , {
            method:"post" , 
            headers : {"content-type" : "application/json"},
            body:JSON.stringify({firstname , lastname ,username, password}),
            credentials:"include"
        })

        const data = res.json()
        if(!data.err){
            history.push("/login")
        }else{
            console.log(data.err)
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
                <h1>Register</h1>
            <input type="text" placeholder="first name" onChange={e => setFirstname(e.target.value)}/>
            <input type="text" placeholder="last name" onChange={e => setLastname(e.target.value)}/>
            <input type="text" placeholder="user name" onChange={e => setUsername(e.target.value)}/>
            <input type="text" placeholder="password" onChange={e => setPassword(e.target.value)}/>

            <button className='submit' onClick={register} disabled={!firstname || !lastname || !username || !password}>register</button>
            <NavLink to="/login">Already have an account?</NavLink>
            </div>
        </div>
    )
}
