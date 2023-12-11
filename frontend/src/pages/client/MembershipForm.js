import classes from './MembershipForm.module.css'
import { useState } from 'react'
import axios from 'axios'
import validation from '../validation/membershipform'
import { useHistory } from 'react-router'

export default function MembershipForm(){

    const [input, setInput] = useState({
        name: '',
        surname: '',
        email: '',
        dob: '',
        mobileNumber: '',
        membershipType: '',
        address: '',
        city: '',
        postCode: '',
        // photo: '',
        extraInfo: ''
    })

    const [errors, setErrors] = useState({})

    // const [check, setCheck]  = useState({
    //     highPressure: false,
    //     highColesterol: false,
    //     asthma: false,
    //     diabetes: false,
    //     epilepsy: false,
    //     highSress: false,
    // })

    function handleChange(event) {
        const {name, value} = event.target

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })   
    }

    // function handleChange_(event) {
    //     const {name, value} = event.target

    //     setCheck(prevCheck => {
    //         return {
    //             ...prevCheck,
    //             [name]: value
    //         }
    //     })   
    // }

    let history = useHistory()

    function handleClick(event) {
        event.preventDefault()
        setErrors(validation(input))

        const newForm = {
            name: input.name,
            surname: input.surname,
            dob: input.dob,
            mobileNumber: input.mobileNumber,
            email: input.email,
            address: input.address,
            city: input.city,
            postCode: input.postCode,
            membershipType: input.membershipType,
            // photo: input.photo,
            // highColesterol: check.highColesterol,
            // highPressure: check.highPressure,
            // asthma: check.asthma,
            // diabetes: check.diabetes,
            // epilepsy: check.epilepsy,
            // highSress: check.highSress,
            extraInfo: input.extraInfo,     
        }
        console.log(newForm)
        axios.post('http://localhost:333/jim/v1/membership-forms/new', newForm)
        .then(
            alert("form sent"),
            history.push("/")
        ).catch(err => {
            console.log(err)
        })
        
    }

    //memberships
    // const [membership, setMembership] = useState ([])

    // useEffect(() =>{
    //     axios.get('http://localhost:333/jim/v1/memberships').then(res => {
    //         setMembership(res.data.data)
    //     }).catch(err=>{
    //         console.log(err)
    //         })
    // }, [])

    return(
            <section className={classes.background}>
            <form className={classes.form}> 
                <h1>please add details</h1>

                <article className={classes.content}>
                    <article className={classes.grid}>
                        <div className={classes.control}>
                            <input name="name" onChange={handleChange} value={input.name}  type="text" required placeholder="name"/>
                            {errors.name && <p className={classes.error}>{errors.name}</p>}
                        </div>

                        <div className={classes.control}>
                            <input name="surname" onChange={handleChange} value={input.surname}  type="text" required placeholder="surname"/>
                            {errors.surname && <p className={classes.error}>{errors.surname}</p>}
                        </div>

                        <div className={classes.control}>
                            {/* <DatePicker selected={date} onChange={date => setDate(date)}/> */}
                            <input name="dob" onChange={handleChange} value={input.dob}  type="date" required placeholder="dob"/>
                            {errors.dob && <p className={classes.error}>{errors.dob}</p>}
                        </div>

                        <div className={classes.control}>
                            <input name="mobileNumber" onChange={handleChange} value={input.mobileNumber}  type="tel" required placeholder="mobile number"/>
                            {errors.mobileNumber && <p className={classes.error}>{errors.mobileNumber}</p>}
                        </div>
                    </article>

                    <div className={classes.control}>
                        <input name="email" onChange={handleChange} value={input.email}  type="email" required placeholder="email"/>
                        {errors.email && <p className={classes.error}>{errors.email}</p>}
                    </div>

                    <div className={classes.control}>
                        <input name="address" onChange={handleChange} value={input.address}  type="text" required placeholder="address"/>
                        {errors.address && <p className={classes.error}>{errors.address}</p>}
                    </div>

                    <article className={classes.grid}>
                        <div className={classes.control}>
                            <input name="city" onChange={handleChange} value={input.city}  type="text" required placeholder="city"/>
                            {errors.city && <p className={classes.error}>{errors.city}</p>}
                        </div>

                        <div className={classes.control}>
                            <input name="postCode" onChange={handleChange} value={input.postCode}  type="text" required placeholder="post code"/>
                            {errors.postCode && <p className={classes.error}>{errors.postCode}</p>}
                        </div>
                    </article>

                    <div className={classes.control}>
                            <input name="membershipType" onChange={handleChange} value={input.membershipType}  type="text" required placeholder="membership type"/>
                            {errors.membershipType && <p className={classes.error}>{errors.membershipType}</p>}
                    </div>


                    {/* <div className={classes.control}>
                        <select name="selectList">
                        <option disabled selected>membership type</option>
                        {membership.map((data, id) => {return <option value={input.membershipType}>{data.name}</option> })}
                        </select>
                    </div> */}

                    {/* medical section */}
                    {/* <section className={classes.medical}> 
                        <article className={classes.grid}> 
                        <label>high pressure</label>
                        <input onChange={handleChange_} value={check.highPressure} type="checkbox"/>
                        </article>

                        <article className={classes.grid}> 
                        <label>high colesterol</label>
                        <input onChange={handleChange_} value={check.highColesterol} type="checkbox"/>
                        </article>

                        <article className={classes.grid}> 
                        <label>asthma</label>
                        <input onChange={handleChange_} value={check.asthma}type="checkbox"/>
                        </article>

                        <article className={classes.grid}> 
                        <label>diabetes</label>
                        <input onChange={handleChange_} value={check.diabetes} type="checkbox"/>
                        </article>

                        <article className={classes.grid}> 
                        <label>epilepsy</label>
                        <input onChange={handleChange_} value={check.epilepsy} type="checkbox"/>
                        </article>

                        <article className={classes.grid}> 
                        <label>high stress</label>
                        <input onChange={handleChange_} value={check.highSress} type="checkbox"/>
                        </article>
                    </section> */}

                    <div className={classes.control}>
                    <textarea name="extraInfo" onChange={handleChange} value={input.extraInfo}  type="text" required placeholder="extra information" rows="5"/>
                    </div>
                    </article>
{/* 
                    <div className={classes.control}>
                    <article className={classes.grid}>
                        <input name="photo" onChange={handleChange, uploadPhoto} value={input.extraInfo} type="file"></input>
                        <button>upload</button>
                    </article>
                    </div> */}

                    


                    
                    <article className={classes.actions}> 
                    <button onClick={handleClick}>submit</button>
                </article>
            
            </form>
            </section>
    )
}