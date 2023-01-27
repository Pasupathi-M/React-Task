import * as Yup from 'yup'


export const signInFormValidationSchema = Yup.object().shape({
    userName: Yup.string().required('Please enter the username'),
    password: Yup.string().required('Please enter the password'),
    role: Yup.object().shape({
        role: Yup.string().required('Please select role')
    })
})