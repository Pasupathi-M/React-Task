import * as Yup from 'yup'


export const signUpFormValidationSchema = Yup.object().shape({
    userName: Yup.string().required('Please enter the username'),
    email: Yup.string().email('Invalid email').required('Please enter email'),
    password: Yup.string().required('Please enter the password'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must be match'),
    role: Yup.object().shape({
        role: Yup.string().required('Please select role')
    })
})


export const signInFormValidationSchema = Yup.object().shape({
    email: Yup.string().min(1).required('Please enter email'),
    password: Yup.string().min(6).max(20).required('Please enter password')
})