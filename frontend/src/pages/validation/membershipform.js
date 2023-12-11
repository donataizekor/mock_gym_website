export default function validation(values){
    let errors = {}
    

    if(!values.name.trim()) {
        errors.name = 'name required'
    }

    if(!values.surname.trim()) {
        errors.surname = 'surname required'
    }

    if(!values.dob.trim()) {
        errors.dob = 'dob required'
    }

    if(!values.mobileNumber.trim()) {
        errors.mobileNumber = 'phone required'
    }else if(!/^\d+$/.test(values.mobileNumber)){
        errors.mobileNumber = 'phone is invalid'
    }

    if(!values.email.trim()) {
        errors.email = 'email required'
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = 'email is invalid'
    }

    if(!values.address.trim()) {
        errors.address = 'address required'
    }

    if(!values.city.trim()) {
        errors.city = 'city required'
    }

    if(!values.postCode.trim()) {
        errors.postCode = 'postCode required'
    }

    if(!values.membershipType.trim()) {
        errors.membershipType = 'membership required'
    }


    return errors
}