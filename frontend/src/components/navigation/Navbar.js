// import { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './Navbar.module.css'

export default function Navbar() {
  
        // let history = useHistory();
      
        // function handleLogout() {
        //   localStorage.setItem('token', '');
        //   localStorage.clear();
        //   history.push("/login");
        // }

    return(
       
            <section className={classes.navbar}>
                <ul>
                    <li><Link to="/">home</Link></li>
                    <li><Link to="/about-page">about</Link></li>
                    <li><Link to="/classes">classes</Link></li>
                    <li><Link to="/memberships">memberships</Link></li>
                    <li><Link to="/login">login</Link></li>
                    {/* <li className="logout" onClick={handleLogout}><Link to="#">logout</Link></li> */}
                </ul>
            </section>
            
  
    )
}