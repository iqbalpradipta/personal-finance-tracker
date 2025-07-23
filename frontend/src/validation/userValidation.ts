import * as Yup from 'yup'

export const RegisterSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required()
})

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(5).required()
})