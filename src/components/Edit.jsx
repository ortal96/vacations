import React, { useState } from 'react'

export default function Edit({ vacation, setVacationArr, setEdit }) {

    const [destination, setDestination] = useState(vacation.destination)
    const [description, setDescription] = useState(vacation.description)
    const [price, setPrice] = useState(vacation.price)
    const [img_url, setImg_url] = useState(vacation.img_url)
    const [startDate, setStartDate] = useState(new Date(vacation.startDate).toLocaleDateString('en-IL').split("/").reverse().join("-"))
    const [endDate, setEndDate] = useState(new Date(vacation.endDate).toLocaleDateString('en-IL').split("/").reverse().join("-"))

    const edit = async () => {
        const res = await fetch(`http://localhost:1000/vacations/edit/${vacation.vacationID}`, {
            credentials: "include",
            method: "put",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ description, destination, price, img_url, startDate, endDate })
        })
        const data = await res.json()
        if (data.length) {
            setVacationArr(data)
            setEdit(false)
        }

    }

    return (
        <div className="modal">
            <strong>edit vacation</strong>
            <button onClick={() => {
                setEdit(false)
            }}>X</button>

            <input type="text" value={destination} placeholder="destination" onChange={e => {
                setDestination(e.target.value)
            }} />
            <input type="text" value={description} placeholder="description" onChange={e => {
                setDescription(e.target.value)
            }} />
            <input type="number" value={price} placeholder="price" onChange={e => {
                setPrice(e.target.value)
            }} />
            <input type="text" value={img_url} placeholder="img_url" onChange={e => {
                setImg_url(e.target.value)
            }} />
            <input type="date" value={startDate} placeholder="start date" onChange={e => {
                setStartDate(e.target.value)
            }} />
            <input type="date" value={endDate} placeholder="end date" onChange={e => {
                setEndDate(e.target.value)
            }} />

            <button onClick={edit}>update</button>
        </div>
    )
}
