import Navbar from "../../components/navigation/Navbar"
import Footer from "../../components/Footer"
import { useState, useEffect } from "react"
import axios from 'axios'
import classes from '../client/Courses.module.css'

export default function Courses(){
    const [course, setCourse] = useState ([])

    useEffect(() =>{
        axios.get('http://localhost:333/jim/v1/courses').then(res => {
            setCourse(res.data.data)
        }).catch(err=>{
            console.log(err)
            })
    }, [])

    return(
        <>
        <Navbar />
        <section className={classes.content}>
            {course.map((data,id) => { return <article key={id} >
                <h1>{data.name}</h1>
                <p>{data.description}</p>
                <article className={classes.grid}>
                    <p> {data.duration}'</p> 
                    <p> {data.trainer}</p> 
                </article> 
        </article>
            })}

        </section>
        <Footer />
        </>
    )
}
