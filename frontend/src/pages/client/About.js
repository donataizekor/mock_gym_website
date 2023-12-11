import Navbar from '../../components/navigation/Navbar'
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react"
import axios from 'axios'
import classes from '../client/About.module.css'

export default function About(){

    //trainers
    const [trainer, setTrainer] = useState ([])

    useEffect(() =>{
        axios.get('http://localhost:333/jim/v1/trainers').then(res => {
            setTrainer(res.data.data)
        }).catch(err=>{
            console.log(err)
            })
    }, [])

    return(
        <>
        <Navbar />
        <section className={classes.about}>
            <article className={classes.content}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec sagittis aliquam malesuada bibendum. Est ante in nibh mauris cursus mattis molestie a. A erat nam at lectus urna duis. Vulputate dignissim suspendisse in est. In pellentesque massa placerat duis ultricies lacus. </p> 

                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>    
            </article>

            <article className={classes.trainersSection}>
                <h1>our trainers</h1>
                <section className={classes.trainers}>
                 {trainer.map((data, id) => { return <Link to="#" key={id}>
                    <article className={classes.card}>
                    <article className={classes.cardImg}>
                        <img alt="" src="/imgs/class.jpg" />
                    </article>

                    <article className={classes.cardTitle} >
                        <p>{data.name} {data.surname}</p>
                    </article>
                    </article>
                </Link>
                 })}

                </section>
            </article>

            <Footer />

       </section>

       </>
    )
}