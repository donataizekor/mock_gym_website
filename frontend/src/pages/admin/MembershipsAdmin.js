import classes from './MembershipsAdmin.module.css'
import NavbarAdmin from '../../components/navigation/NavbarAdmin'
import MembershipAddForm from '../../components/MembershipAddForm'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal' 
import axios from 'axios'
export default function MembershipsAdmin(){
    const [membership, setMembership] = useState ([])

    useEffect(() =>{
        axios.get('http://localhost:333/jim/v1/memberships').then(res => {
            setMembership(res.data.data)
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
                    <h1>memberships</h1>
                    <table>
                    <tr>
                    <th>name</th>
                    <th>description</th>
                    <th>price</th>

                </tr>
                {membership.map((data,id) => { return  <tr key={id}>
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                    <td>{data.price}£</td>
                </tr>
                })}
                </table>
                
                <article className={classes.membershipsButton}>
                    <button onClick={setModalOpenToTrue}>
                        <Link to="#">add</Link>
                    </button>

                    <Modal isOpen={modalOpen} style={customStyles} onRequestClose={()=> setModalOpen(false)}>
                    <button onClick={setModalOpenToFalse} className={classes.modalButton}>x</button> 
                    <MembershipAddForm />
                    </Modal>
                </article>

                </section>
        </section>
    )
}