import { useHistory } from "react-router";
import classes from '../../pages/client/Profile.module.css'
export default function Profile(){

    let history = useHistory();
      
    function handleLogout() {
        localStorage.setItem('token', '');
        localStorage.clear();
        history.push("/");
    }

    return(
        <section className={classes.title} >

        <h1> profile page </h1>
        <button className={classes.logoutButton} onClick={handleLogout}>logout</button>
        </section>
    )

}