export default function validation(values){
    let errors = {}
    
    //email
    if(!values.email.trim()) {
        errors.email = 'email required'
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = 'email is invalid'
    }

    //password
    if(!values.password.trim()) {
        errors.password = 'password required'
    }

    return errors
}