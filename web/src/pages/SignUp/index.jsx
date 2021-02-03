import React, { useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Container, LogoDiv, LoginDiv, Content } from './styles'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import Input from '../../components/Input'
import Footer from '../../components/Footer'
import api from '../../services/api'
import { toast } from 'react-toastify'
function SignUp() {
  const { push } = useHistory()
  const handleFormSubmit = useCallback(async data => {
    data.password_confirmation = data.password
    try {
      await api.post('/users', data)
      toast.success('successful operation')
      push('/')
    } catch (error) {
      error.response.data.map(err => toast.error(err.message))
    }
  }, [])
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: yup.object({
      email: yup.string().email().required('Insira um email valido'),
      password: yup.string().required('Insira uma password'),
      name: yup.string().required('Insira um nome'),
    }),

    onSubmit: handleFormSubmit,
  })
  return (
    <Content>
      <Container>
        <LogoDiv>
          <h1>The</h1>
          <h1>Greatest</h1>
          <h1>App</h1>
          <h2>for</h2>
          <h1>LOTTERY</h1>
        </LogoDiv>

        <LoginDiv>
          <h1>Registration</h1>

          <form
            onSubmit={formik.handleSubmit}
            validateonblur='false'
            validateonbhange='false'
          >
            <Input
              name={'name'}
              placeholder='Name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <span>{formik.errors.name}</span>
            ) : null}
            <Input
              name={'email'}
              placeholder='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <span>{formik.errors.email}</span>
            ) : null}
            <Input
              name={'password'}
              placeholder='Password'
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <span>{formik.errors.password}</span>
            ) : null}

            <button>
              Register <FiArrowRight size={24.3} color='#B5C401' />
            </button>
          </form>
          <Link to='/'>
            <FiArrowLeft size={24.3} color='#535351' />
            Back
          </Link>
        </LoginDiv>
      </Container>
      <Footer />
    </Content>
  )
}

export default SignUp
