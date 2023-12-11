import classes from './Login.module.css'
import { useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import validation from './validation/login'

export default function Login(){
    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    function handleChange(event, ) {
   
        const {name, value} = event.target

        setInput({
            ...input,
            [name]:value
        })
    }
    let history = useHistory()

    function handleClick(event) {
        event.preventDefault()
        setErrors(validation(input))
       
        

        axios.post('http://localhost:333/jim/v1/auth/login', input)
        .then(res => {
            
            localStorage.setItem('Authorization', 'token ' + res.data.token)
            localStorage.setItem('user', JSON.stringify(input.email))
            history.push("/profile")
            
        }).catch(err => {
            if (err.res === 401) {
                return errors.email && <p className={classes.error}>check details</p>
               }
            console.log(err)
        })

    }

    return(
        <section className={classes.back}>
        <form className={classes.form}>
            
            <h1>login</h1>

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

            <article className={classes.forgot}> 
                <Link to="/forgot">forgot password</Link>
            </article>

            <article className={classes.actions}> 
                <button onClick={handleClick}>login</button>
            </article>

            <article className={classes.already}> 
                <span>don't have an account? </span><Link to="/register">signup</Link>
            </article>

        </form>
        </section>
    )
}