import classes from './Courses.module.css'
import NavbarAdmin from '../../components/navigation/NavbarAdmin'
import CourseAddForm from '../../components/CourseAddForm'
import CourseUpdateForm from '../../components/CourseUpdateForm'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal' 
import axios from 'axios'
export default function CoursesAdmin(){
    const [course, setCourse] = useState ([])

    useEffect(() =>{
        axios.get('http://localhost:333/jim/v1/courses', {
            headers: {
                'Authorization' : localStorage.getItem('Authorization') 
            }
        }).then(res => {
            setCourse(res.data.data)
        }).catch(err=>{
            console.log(err)
            })
    }, [])

    //delete
    function onDelete(id){
        
        axios.delete(`http://localhost:333/jim/v1/courses/delete/${id}`, {
            headers : {
                Authorization: localStorage.getItem('Authorization')
            }
        }
        ).then(res => {
            window.location.reload()
        }).catch(err=>{
            console.log(err)
            })
    }
    

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
            height: '60%',
            width: '40%',
            top: '10%',
            margin: '0 auto',
            border: 'none',     
        }
    }   
     

    return(
        <section className={classes.grid}>
            <NavbarAdmin />
                <section className={classes.content}>

                    <h1>classes</h1>
                    <table>
                    <tr>
                    <th>name</th>
                    <th>description</th>
                    <th>duration</th>
                    <th>trainer</th>
                    <th></th>
                    <th></th>
                    </tr>
                    {course.map((data,id) => { return  <tr key={course.id}>
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                    <td>{data.duration}mins</td>
                    <td>{data.trainer}</td>
                    <td><button className={classes.edit} onClick={() => setModalOpenToTrue(data._id)}>edit</button>
                    
                    <Modal isOpen={modalOpen} style={customStyles} onRequestClose={()=> setModalOpen(false)}>
                    <button onClick={setModalOpenToFalse} className={classes.modalButton}>x</button> 
                    <CourseUpdateForm />
                    </Modal>
                    </td>
                    <td><button className={classes.delete} onClick={() => onDelete(data._id)}>delete</button></td>
                 
                </tr>
                })}
                </table>

                <article className={classes.coursesButton}>
                    <button onClick={setModalOpenToTrue}>
                        <Link to="#">add</Link>
                    </button>

                    <Modal isOpen={modalOpen} style={customStyles} onRequestClose={()=> setModalOpen(false)}>
                    <button onClick={setModalOpenToFalse} className={classes.modalButton}>x</button> 
                    <CourseAddForm />
                    </Modal>
                </article>

                </section>
        </section>
    )
}