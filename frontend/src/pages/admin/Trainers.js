import { useState, useEffect } from 'react'
import classes from '../../pages/admin/MembershipForms.module.css' 
import NavbarAdmin from '../../components/navigation/NavbarAdmin'
import axios from 'axios'

export default function Trainers(){
    const [trainer, setTrainer] = useState ([])

    useEffect(() =>{
        axios.get('http://localhost:333/jim/v1/trainers', {
            headers: {
                'Authorization' : localStorage.getItem('Authorization') 
            }
        }).then(res => {
            setTrainer(res.data.data)
        }).catch(err=>{
            console.log(err)
            })
    }, [])

    return(
        <section className={classes.grid}>
        <NavbarAdmin />
            <section className={classes.content}>

                <h1>trainers</h1>
                <table>
                <tr>
                
                <th>name</th>
                <th>surname</th>
                <th>dob</th>

                </tr>
                {trainer.map((data,id) => { return  <tr key={id}>
                <td>{data.name}</td>
                <td>{data.surname}</td>
                <td>{data.dob}</td>
            </tr>
            })}
            </table>
            </section>
        </section>
    )
}