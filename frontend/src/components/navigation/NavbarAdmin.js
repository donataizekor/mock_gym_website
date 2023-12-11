import classes from './NavbarAdmin.module.css'
import { Link, useHistory } from 'react-router-dom'
export default function NavbarAdmin(){

    let history = useHistory();
      
        function handleLogout() {
          localStorage.setItem('token', '');
          localStorage.clear();
          history.push("/");
        }

    return(
        <section className={classes.navbar}>
        <ul>
            <li><Link to="/admin">applications</Link></li>
            <li><Link to="/admin/classes">classes</Link></li>
            <li><Link to="/admin/memberships">memberships</Link></li>
            <li><Link to="/admin/trainers">trainers</Link></li>
            <li><Link to="/admin/chat">chat</Link></li>
            <br />
            <br />
            <br />

            <li><Link to="/admin/staff">staff</Link></li>
            <li><Link to="/admin/users">users</Link></li>

            <br />
            <br />
            <li className={classes.login}><Link to="#" onClick={handleLogout}>logout</Link></li>
        </ul>
    </section>
    )
}