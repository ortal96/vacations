import React, { useState } from 'react'
import VacationItem from './VacationItem'

export default function Search({ vacationArr, setVacationArr , setSearch}) {

    const [input, setInput] = useState("")
    const [searchArr, setSearchArr] = useState([])

    const search = async()=>{
        const res = await fetch(`http://localhost:1000/vacations/search/${input}` , {
            credentials: "include"
        })
        const data = await res.json()
        setSearchArr(data)
    }
    
    return (

        <div className="modal">
            <div className="sd">
            <input type="text" placeholder="search" value={input} onChange={e =>{
                setInput(e.target.value)
            }}/>
            <button onClick={search}>serch</button>
            <button onClick={()=>{
                setInput("")
            }}>clear</button>
            <button onClick={()=>{
                setSearch(false)
            }}>X</button>
            </div>
            <div className="search">
            {
                searchArr.map(v => <VacationItem vacation={v} setVacationArr={setVacationArr} vacationArr={vacationArr}/>)
            }
            </div>
        </div>
    )
}
