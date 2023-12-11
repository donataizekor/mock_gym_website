import classes from './CourseAddForm.module.css'
import { useState } from 'react'
import axios from 'axios'

export default function CouseAddForm(){
    const [input, setInput] = useState({
        name: '',
        description: '',
        duration: '',
        trainer: '',
    })

    function handleChange(event) {
        const {name, value} = event.target

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    function handleClick(event) {
        event.preventDefault()

      
        const newForm = {
            name: input.name,
            description: input.description,
            duration: Number(input.duration),
            trainer: input.trainer
        }


        axios.post('http://localhost:333/jim/v1/courses/new', {
            headers : {
                'Authorization' : localStorage.getItem('Authorization')
            }
        }, newForm)
        console.log(localStorage.getItem('Authorization'))
        console.log(newForm)
            
        // window.location.href = '/admin/classes'
    }

    return(
        <section>
            <form className={classes.form}>
            
            <h1>please add details</h1>

            <article className={classes.content}>
                <div className={classes.control}>
                    <input name="name" onChange={handleChange} value={input.name}  type="text" required placeholder="name"/>
                </div>

                <div className={classes.control}>
                <textarea name="description" onChange={handleChange} value={input.description}  type="text" required placeholder="description"/>
                </div>

                <div className={classes.control}>
                    <input name="duration" onChange={handleChange} value={input.duration}  type="text" required placeholder="duration"/>
                </div>

                <div className={classes.control}>
                    <input name="trainer" onChange={handleChange} value={input.trainer}  type="text" required placeholder="trainer"/>
                </div>
                </article>

                <article className={classes.actions}> 
                <button onClick={handleClick}>submit</button>
            </article>
            
        </form>
       </section>
    )
}