import classes from './Register.module.css'
import { useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import validation from './validation/signup'

export default function Register(){
    const [input, setInput] = useState({
        name: '',
        surname: '',
        email: '',
        password: ''
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

    let history = useHistory()

    function handleClick(event) {
        event.preventDefault()
        setErrors(validation(input))

        const newForm = {
            name: input.name,
            surname: input.surname,
            email: input.email,
            password: input.password
        }

        axios.post('http://localhost:333/jim/v1/auth/signup', newForm)
        .then(         
            history.push("/login")
        ).catch(err => {
            console.log(err)
        }) 
     
    }

    return(
        <section className={classes.back}>
        <form className={classes.form}>
            
            <h1>signup</h1>

            <article className={classes.content}>
                <div className={classes.control}>
                    <label>name</label>
                    <input name="name" onChange={handleChange} value={input.name}  type="text" required/>
                    {errors.name && <p className={classes.error}>{errors.name}</p>}
                </div>
            </article>

            <article className={classes.content}>
                <div className={classes.control}>
                    <label>surname</label>
                    <input name="surname" onChange={handleChange} value={input.surname}  type="text" required/>
                    {errors.surname && <p className={classes.error}>{errors.surname}</p>}
                </div>
            </article>

            <article className={classes.content}>
                <div className={classes.control}>
                    <label>email</label>
                    <input name="email" onChange={handleChange} value={input.email}  type="text" required/>
                    {errors.email && <p className={classes.error}>{errors.email}</p>}
                </div>
            </article>

            <article className={classes.content}>
                <div className={classes.control}>
                    <label>password</label>
                    <input name="password" onChange={handleChange} value={input.password}  type="password" required/>
                    {errors.password && <p className={classes.error}>{errors.password}</p>}
                </div>
            </article>

            <article className={classes.actions}> 
                <button onClick={handleClick}>signup</button>
            </article>

            <article className={classes.already}> 
                <span>already have an account? </span><Link to="/login">login</Link>
            </article>

        </form>
        </section>
    )
}