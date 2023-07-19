import React, { useState } from 'react'

export default function Add({setVacationArr , setAdd}) {

    const [destination, setDestination] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [img_url, setImg_url] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const add = async()=>{
        const res = await fetch('http://localhost:1000/vacations/add',{
            credentials:"include",
            method: "post",
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify({description,destination,price,img_url,startDate,endDate})
        })
        const data = await res.json()
        if(data.length){
            setVacationArr(data)
            setAdd(false)
        }

    }

    return (
        <div className="modal">
            <srtong>add a new vacation</srtong>
            <button onClick={()=>{
                setAdd(false)
            }}>X</button>
            <input type="text" placeholder="destination" onChange={e=> {
                setDestination(e.target.value)
            }}/>
            <input type="text" placeholder="description" onChange={e=> {
                setDescription(e.target.value)
            }}/>
            <input type="number" placeholder="price" onChange={e=> {
                setPrice(e.target.value)
            }}/>
            <input type="text" placeholder="img_url" onChange={e=> {
                setImg_url(e.target.value)
            }}/>
            <input type="date" placeholder="start date" onChange={e=> {
                setStartDate(e.target.value)
            }}/>
            <input type="date" placeholder="end date" onChange={e=> {
                setEndDate(e.target.value)
            }}/>

            <button onClick={add}>add</button>
        </div>
    )
}
