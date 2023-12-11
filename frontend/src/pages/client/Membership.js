import Navbar from '../../components/navigation/Navbar'
import Footer from '../../components/Footer'
import { useState, useEffect } from 'react'
import axios from 'axios'
import classes from './Membership.module.css'

export default function Membership(){
    const [membership, setMembership] = useState ([])

    useEffect(() =>{
        axios.get('http://localhost:333/jim/v1/memberships').then(res => {
            setMembership(res.data.data)
        }).catch(err=>{
            console.log(err)
            })
    }, [])

    return(
        <>
        <Navbar />
            <section className={classes.membership}>
                {membership.map((data,id) => { return <article key={id}>
                    <h1>{data.name} membership</h1>
                    <article className={classes.content}>
                        <p>{data.description}</p> 
                        <p className={classes.price}>{data.price}£</p> 
                    </article>

                </article>
                })}
            </section>

            <Footer />
        </>
        
    )
}
