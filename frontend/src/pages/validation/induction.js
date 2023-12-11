export default function validation(values){
    let errors = {}
    
    //name
    if(!values.name.trim()) {
        errors.name = 'name required'
    }

    //email
    if(!values.email.trim()) {
        errors.email = 'email required'
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = 'email is invalid'
    }

    //message
    if(!values.message.trim()) {
        errors.message = 'message required'
    }

    return errors
}