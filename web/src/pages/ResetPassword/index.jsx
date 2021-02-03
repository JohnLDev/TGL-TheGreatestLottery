/* eslint-disable indent */
import React, { useCallback } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Container, LogoDiv, LoginDiv, Content } from './styles'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import Input from '../../components/Input'
import Footer from '../../components/Footer'
import api from '../../services/api'
import { toast } from 'react-toastify'

function ResetPassword() {
  const { push } = useHistory()
  const { token } = useParams()

  const handleFormSubmit = useCallback(async data => {
    try {
      await api.patch(`/forgot-change/${token}`, data)
      toast.success('successful operation')
      push('/')
    } catch (error) {
      error.response.data.map(err => toast.error(err.message))
    }
  }, [])
  const formik = useFormik({
    initialValues: {
      password: '',
      password_confirmation: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: yup.object({
      password: yup.string().required('Insira uma senha'),
      password_confirmation: yup.string().required('Insira uma senha'),
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
              name={'password'}
              type='password'
              placeholder='Password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <span>{formik.errors.password}</span>
            ) : null}
            <Input
              name={'password_confirmation'}
              type='password'
              placeholder='Password Confirmation'
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password_confirmation &&
            formik.errors.password_confirmation ? (
              <span>{formik.errors.password_confirmation}</span>
            ) : null}

            <button type='submit'>
              Change
              <FiArrowRight size={24.3} color='#B5C401' />
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

export default ResetPassword
