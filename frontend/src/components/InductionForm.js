import classes from './InductionForm.module.css'
import { useState } from 'react'
import axios from 'axios'
import validation from '../pages/validation/induction'

export default function InductionForm(){

    const [input, setInput] = useState({
        name: '',
        email: '',
        message: ''
    })

    const [errors, setErrors] = useState({})

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
        setErrors(validation(input))
        
        const newForm = {
            name: input.name,
            email: input.email,
            message: input.message
        }
        axios.post('http://localhost:333/jim/v1/induction-forms/new', newForm)
        .then(
            alert("form sent"),
            window.location.reload()
                  
        ).catch(err => {
            console.log(err)
        }) 
        
    }

    return(
        <section>
            <form className={classes.form}>
           
                <h1>our induction form</h1>

                <article className={classes.content}>
                    <div className={classes.control}>
                        <input name="name" onChange={handleChange} value={input.name}  type="text" required placeholder="name"/>
                        {errors.name && <p className={classes.error}>{errors.name}</p>}
                    </div>

                    <div className={classes.control}>
                    <input name="email" onChange={handleChange} value={input.email}  type="text" required placeholder="email"/>
                    {errors.email && <p className={classes.error}>{errors.email}</p>}
                    </div>

                    <div className={classes.control}>
                        <textarea name="message" onChange={handleChange} value={input.message}  type="text" required placeholder="message" rows="5"/>
                        {errors.message && <p className={classes.error}>{errors.message}</p>}
                    </div>
                    </article>
                    <article className={classes.actions}> 
                    <button onClick={handleClick}>submit</button>
                </article>
                
            </form>
        </section>
    )
}
