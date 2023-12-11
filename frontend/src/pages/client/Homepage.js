import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from 'axios'
import Modal from 'react-modal'
import Footer from "../../components/Footer"
import Navbar from "../../components/navigation/Navbar"
import classes from'../client/Homepage.module.css'
import InductionForm from "../../components/InductionForm"

export default function Homepage(){
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

    //class card
    const [course, setCourse] = useState ([])

    useEffect(() =>{
        axios.get('http://localhost:333/jim/v1/courses').then(res => {
            setCourse(res.data.data)
        }).catch(err=>{
            console.log(err)
            })
    }, [])

    //memberships
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

        {/* header section */}
        <section className={classes.header}>
            <img alt="" src='/imgs/homepage.jpg'/>

            <article className={classes.times}>
                <h1>find us open</h1>
                <h1>mon - fri</h1>
            </article>
            
            <article className={classes.inductionButton}>
                <button  onClick={setModalOpenToTrue}>
                    <Link to="#">
                        book induction
                    </Link>
                </button>

                <Modal isOpen={modalOpen} style={customStyles} onRequestClose={()=> setModalOpen(false)}>
                    <button onClick={setModalOpenToFalse} className={classes.modalButton}>x</button> 
                <InductionForm />
                </Modal>

            </article>
        </section>

         {/* about section */}
         <section className={classes.about}>
            <h1>about us</h1>
            <article className={classes.aboutContent}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p>Facilisis leo vel fringilla est ullamcorper eget. Viverra accumsan in nisl nisi scelerisque eu ultrices. Sit amet dictum sit amet justo donec enim diam vulputate. Ut venenatis tellus in metus vulputate eu scelerisque. Malesuada fames ac turpis egestas. Ut lectus arcu bibendum at varius vel.</p>
             

                <article className={classes.aboutButton}>
                    <button>
                        <Link to="/about-page">learn more</Link>
                    </button>
                </article>
            </article>
        </section>

        {/* classes card section */}
        <section className={classes.classSection}>
        <h1>our classes</h1>

            <section className={classes.classCard}>
                {course.map((data, id) => {return <Link to="#" key={id}>
                    <article className={classes.card}>
                    <article className={classes.cardImg}>
                        <img alt="" src="/imgs/class2.jpg" />
                    </article>

                    <article className={classes.cardTitle} >
                        <p>{data.name}</p>
                    </article>
                    </article>
                </Link>
                })}
            </section>
        </section>

        {/* membership section */}
        <section className={classes.membershipSection}>
            <h1>our memberships</h1>

            <article>
                {membership.map((data, id) => {return <li className={classes.item} key={id}>
                    <div className={classes.content}>
                        <article>
                            <p>{data.name} membership</p>

                            <ul className={classes.more}>
                            <li><Link to="/memberships">learn more</Link></li>
                            </ul>
                        </article>

                        <article className={classes.price}>
                            <p>{data.price}£</p>
                        </article>
                    </div>
                </li>
                })}
            </article>

            <article className={classes.membershipButton}>
                <button>
                    <Link to="/membership-form">membership form</Link>
                </button>
            </article>
        </section>

        {/* extra info section */}
        <section className={classes.extraInfo}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>

            <article className={classes.chatButton}>
                <button>
                    <Link to="/chat">chat with us</Link>
                </button>
            </article>
        </section>


        <Footer />
        </>
    )
}