import React, { useEffect, useState } from 'react'
import Edit from './Edit'

export default function VacationItem({ vacation, vacationArr, setVacationArr }) {

    const [follow, setFollow] = useState(false)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        if(localStorage.role == "user"){

            fetch(`http://localhost:1000/vacations/isFollow/${vacation.vacationID}`, {
                credentials: "include"
            })
            .then(res => res.json())
            .then(data => setFollow(data.follow))
            
        }
    }, [vacationArr])


    const like = async () => {
        const res = await fetch(`http://localhost:1000/vacations/follow/${vacation.vacationID}`, {
            method: "post",
            credentials: "include"
        })
        const data = await res.json()

        if (data.length) {
            setVacationArr(data);
        }
    }

    const del = async () => {
        const res = await fetch(`http://localhost:1000/vacations/deleteVacation/${vacation.vacationID}`,{
            credentials:"include",
            method: "delete"
        })
        const data = await res.json()
        if(data.length){
            setVacationArr(data)
        }
    }

    return (
        <div className="vacation">
            <img src={vacation.img_url} className='vacImg'/>
            <h1 className='vacHeader'>{vacation.destination}</h1>
            <p>{vacation.description}</p>
            <p>start date:{vacation.startDate}</p>
            <p>end date:{vacation.endDate}</p>
            <p>{vacation.price}$</p>
            {localStorage.role == "user" && <button className='likeBtn' onClick={like}>{follow ? "💗" : "🤍"}</button>}

            
            {localStorage.role == "admin" && <div className='adminAct'><button onClick={del}>✖️</button> <button onClick={()=>{
                setEdit(true)
            }}>✏️</button></div>}

            {
                edit && <Edit setEdit={setEdit} setVacationArr={setVacationArr} vacation={vacation}/>
            }

        </div>
    )
}
