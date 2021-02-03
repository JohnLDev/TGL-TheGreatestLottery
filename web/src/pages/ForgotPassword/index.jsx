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

function ForgotPassword() {
  const { push } = useHistory()
  const handleFormSubmit = useCallback(async data => {
    try {
      await api.patch('/forgot', data)
      toast.success('successful operation')
      push('/')
    } catch (error) {
      error.response.data.map(err => toast.error(err.message))
    }
  }, [])
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: yup.object({
      email: yup.string().email().required('Insira um email valido'),
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
          <h1>Reset password</h1>

          <form
            onSubmit={formik.handleSubmit}
            validateonblur='false'
            validateonbhange='false'
          >
            <Input
              name={'email'}
              placeholder='Email'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <span>{formik.errors.email}</span>
            ) : null}

            <button type='submit'>
              Send link <FiArrowRight size={24.3} color='#B5C401' />
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

export default ForgotPassword
