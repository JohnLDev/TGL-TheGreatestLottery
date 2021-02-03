import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export const RegisterSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  name: yup.string().required(),
})

export const UpdateSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string(),
  name: yup.string(),
})

export const ResetSchema = yup.object().shape({
  email: yup.string().email().required(),
})
