import React from 'react'
import DataTable from "react-data-table-component"
import FormModal from '../FormModal/FormModal'
import { useState } from 'react'

export default function Tasklist({formData, setFormData, finalFormData, setFinalFormData}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteData = (index) => {
        console.log("deleteData")
        let tempData = finalFormData[index]
        let nList = finalFormData.filter((val) => val.index != tempData.index)
        nList = nList.map((val, ind) => {val.index = ind; return val})
        setFinalFormData(nList)
    }
    const editData = (index) => {
        console.log("editData")
        console.log(index)
        setFormData(finalFormData[index])
        handleShow()
    }

    console.log(formData)


    const Currdata = {
        fname: "",
        lname : "",
        priority : "",
        city : "",
        task : "",
        index : -1
      }
    // const [finalFormData, setFinalFormData] = useState([])
    // const[formData, setFormData] = useState(Currdata)

    const changeBadge = (priority) => {
        if(priority === "low")
            return <span class="badge text-bg-success">Low</span>
        else if(priority === "medium")
            return <span class="badge text-bg-warning">Medium</span>
        else
            return <span class="badge text-bg-danger">High</span>
    }


    const columns = [
        {
            name: 'first Name',
            selector: row => row.fname,
        },
        {
            name: 'Last Name',
            selector: row => row.lname,
        },
        {
            name: 'City',
            selector: row => row.city,
        },
        {
            name: 'Priority',
            selector: row => row.priority,
            cell : row => (changeBadge(row.priority))
        },
        {
            name: 'Task',
            selector: row => row.task,
        },
        {
            name : 'Edit',
            cell : row => <button onClick={()=>editData(row.index)}>Edit</button>
        },
        {
            name : 'Delete',
            cell : row => <button onClick={()=>deleteData(row.index)}>Delete</button>
        }
    ];


  return (
    <div>
        <div className="component-header d-flex justify-content-center m-auto">
                <FormModal formData = {formData} setFormData = {setFormData} finalFormData = {finalFormData} setFinalFormData = {setFinalFormData} Currdata = {Currdata} 
                    show = {show} setShow = {setShow} handleClose = {handleClose} handleShow = {handleShow}
                />
            </div>
        <DataTable
            columns={columns}
            data={finalFormData}
        />
    </div>
  )
}
