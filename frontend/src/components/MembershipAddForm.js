import classes from './CourseAddForm.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'

export default function CouseAddForm(){
    const [input, setInput] = useState({
        name: '',
        description: '',
        price: ''
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
    let history = useHistory()

    function handleClick(event) {
        event.preventDefault()

        const newForm = {
            name: input.name,
            description: input.description,
            price: input.price,
        }

        axios.post('http://localhost:333/jim/v1/memberships/new', newForm)
        history.push("/admin/memberships");
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
                <textarea name="description" onChange={handleChange} value={input.description}  type="text" required placeholder="description" rows="5"/>
                </div>

                <div className={classes.control}>
                    <input name="price" onChange={handleChange} value={input.price}  type="text" required placeholder="price"/>
                </div>
                </article>
                
                <article className={classes.actions}> 
                <button onClick={handleClick}>submit</button>
            </article>
            
        </form>
       </section>
    )
}