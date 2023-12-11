import { useState, useEffect } from 'react'
import classes from '../../pages/admin/MembershipForms.module.css' 
import NavbarAdmin from '../../components/navigation/NavbarAdmin'
import axios from 'axios'

export default function MembershipForms(){
    const [form, setForm] = useState ([])

    useEffect(() =>{
        axios.get('http://localhost:333/jim/v1/membership-forms/', {
            headers: {
                'Authorization' : localStorage.getItem('Authorization') 
            }
        }).then(res => {

            setForm(res.data.data)
        }).catch(err=>{
            console.log(err)
            })
    }, [])

    //delete
    function onView(id){
        axios.get(`http://localhost:333/jim/v1/membership-forms/${id}`, {
            headers : {
                Authorization: localStorage.getItem('Authorization')
            }
        }).then(res => {
            console.log(res.data.data)
            // history.push('/admin/classes')
        }).catch(err=>{
            console.log(err)
            })
    }

    return(
        <section className={classes.grid}>
        <NavbarAdmin />
            <section className={classes.content}>

                <h1>membership applications</h1>
                <table>
                <tr>
                <th>name</th>
                <th>surname</th>
                <th>email</th>
                <th>membership</th>
                <th>status</th>
                <th></th>
                </tr>
                {form.map((data,id) => { return  <tr key={id}>
                <td>{data.name}</td>
                <td>{data.surname}</td>
                <td>{data.email}</td>
                <td>{data.membershipType}</td>
                <td>{data.status}</td>
                <td><button onClick={() => onView(data._id)}>view</button></td>
            </tr>
            })}
            </table>
            </section>
        </section>
    )
}