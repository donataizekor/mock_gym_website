export default function validation(values){
    let errors = {}
    
    //name
    if(!values.name.trim()) {
        errors.name = 'name required'
    }
    
    //surname
    if(!values.surname.trim()) {
        errors.surname = 'surname required'
    }

    //email
    if(!values.email.trim()) {
        errors.email = 'email required'
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = 'email is invalid'
    }

    //password
    if(!values.password.trim()) {
        errors.password = 'password required'
    }else if(values.password.lenght < 8) {
        errors.password = 'password needs to be at least 8 characters'
    }

    return errors
}