import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Add from './Add'
import Search from './Search'
import VacationItem from './VacationItem'

export default function Main() {
    const [vacationArr, setVacationArr] = useState("")
    const [add, setAdd] = useState(false)
    const [search, setSearch] = useState(false)
    

   const  history = useHistory()

    useEffect(async () => {
        if(!localStorage.username){
            return history.push('/login')
        }
        const res = await fetch('http://localhost:1000/vacations',{
            credentials: "include"
        })
        const data = await res.json()
        if(data.length){
        setVacationArr(data)
        }
    }, [])

    const logout = async ()=>{
        await fetch ("http://localhost:1000/users/logout" ,{
            credentials:"include",
            method:"delete"
        })
        history.push("/login")
        localStorage.clear()
    }

    return (
        <div>
            <div className='header'>
                <h1 className='mainHeader'>hello {localStorage.username}!</h1>
                <div className='actions'>
                {localStorage.role == "admin" &&
            <button onClick={()=>{
                history.push('/reports')
            }} className='btn'>reports</button>
            }
            

            <button onClick={()=>{
                setSearch(true)
            }} className='btn'>🔍</button>
            
            <button onClick={logout} className='submit'>logout</button>
                </div>
            </div>
            
            

            
            <div className='vacList'>
            {
                vacationArr.length ?
                    vacationArr.map(v => <VacationItem setVacationArr={setVacationArr} vacationArr={vacationArr} vacation={v} />) :
                    <h1>No vacation Yet 🥴</h1>
            }
            </div>
            {localStorage.role == "admin" &&
                <button onClick={()=>{
                setAdd(true)
            }} className='addBtn'>+</button>
            }
            {
                add && <Add setVacationArr={setVacationArr} setAdd={setAdd}/>
            }
            {
                search && <Search vacationArr={vacationArr} setVacationArr={setVacationArr} setSearch={setSearch}/>
            }
            
        </div>
    )
}
