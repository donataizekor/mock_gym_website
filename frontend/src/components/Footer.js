import { Link } from "react-router-dom"
import classes from './Footer.module.css'

export default function Footer(){
    return(
        <footer className={classes.content}>
            <article>
                <ul>
                    <li><Link to="/">home</Link></li>
                    <li><Link to="/about-page">about</Link></li>
                    <li><Link to="/classes">classes</Link></li>
                    <li><Link to="/memberships">memberships</Link></li>
                </ul>
            </article>

           
            <article>
                <ul>
                    <li><Link to="/instagram">instagram</Link></li>
                    <li><Link to="/twitter">twitter</Link></li>
                </ul>   
            </article>

            <article>
                <p>1 Jim Parade Street</p>
                <p>jim.jim@gmail.com</p>
                <p>010 1010310</p>
            </article>
        </footer>
    )
}