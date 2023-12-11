import classes from './MembershipsAdmin.module.css'
import NavbarAdmin from '../../components/navigation/NavbarAdmin'
import UserAddForm from '../../components/UserAddForm'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal' 
import axios from 'axios'
export default function Staff(){


    const [staff, setStaff] = useState ([])

    useEffect(() =>{
        axios.get('http://localhost:333/jim/v1/users/?role=user', {
            headers: {
                'Authorization' : localStorage.getItem('Authorization')
            }
        }).then(res => {

            setStaff(res.data.data)
        }).catch(err=>{
            console.log(err)
            })
    }, [])

    //modal
    const [modalOpen, setModalOpen] = useState(false)
    const setModalOpenToTrue = () => {
        setModalOpen(true)
    }
    const setModalOpenToFalse = () => {
        setModalOpen(false)
    }
    const customStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          },
        content : {
            padding: '4rem',
            height: '50%',
            width: '40%',
            top: '19%',
            margin: '0 auto',
            border: 'none',     
        }
    }

    return(
        <section className={classes.grid}>
            <NavbarAdmin />
                <section className={classes.content}>

                    <h1>users</h1>
                    <table>
                    <tr>
                    <th>name</th>
                    <th>surname</th>
                    <th>email</th>

                </tr>
                {staff.map((data,id) => { return  <tr key={id}>
                    <td>{data.name}</td>
                    <td>{data.surname}</td>
                    <td>{data.email}</td>
                </tr>
                })}
                </table>
                
                <article className={classes.membershipsButton}>
                    <button onClick={setModalOpenToTrue}>
                        <Link to="#">add</Link>
                    </button>

                    <Modal isOpen={modalOpen} style={customStyles} onRequestClose={()=> setModalOpen(false)}>
                    <button onClick={setModalOpenToFalse} className={classes.modalButton}>x</button> 
                    <UserAddForm />
                    </Modal>
                </article>

                </section>
        </section>
    )
}