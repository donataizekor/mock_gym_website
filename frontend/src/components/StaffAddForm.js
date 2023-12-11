import classes from './StaffAddForm.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import validation from './../pages/validation/adduser'

export default function CouseAddForm(){
    const [input, setInput] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        role: 'admin'
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
            password: input.password,
            role: input.role
        }

        axios.post('http://localhost:333/jim/v1/auth/signup', newForm).then(res => {
            history.push('/admin/staff')
        }).catch(err=>{
            console.log(err)
            })
    }

    return(
        <section>
            <form className={classes.form}>
            
            <h1>please add details</h1>

            <article className={classes.content}>
                <div className={classes.control}>
                    <input name="name" onChange={handleChange} value={input.name}  type="text" required placeholder="name"/>
                    {errors.name && <p className={classes.error}>{errors.name}</p>}
                </div>

                <div className={classes.control}>
                <input name="surname" onChange={handleChange} value={input.surname}  type="text" required placeholder="surname"/>
                {errors.surname && <p className={classes.error}>{errors.surname}</p>}
                </div>

                <div className={classes.control}>
                    <input name="email" onChange={handleChange} value={input.email}  type="email" required placeholder="email"/>
                    {errors.email && <p className={classes.error}>{errors.email}</p>}
                </div>

                <div className={classes.control}>
                    <input name="password" onChange={handleChange} value={input.password}  type="password" required placeholder="password"/>
                    {errors.password && <p className={classes.error}>{errors.password}</p>}
                </div>

                <div className={classes.control}>
                    <input name="role" onChange={handleChange} value={input.role}  type="text" required/>
                </div>
                </article>
                
                <article className={classes.actions}> 
                <button onClick={handleClick}>submit</button>
            </article>
            
        </form>
       </section>
    )
}