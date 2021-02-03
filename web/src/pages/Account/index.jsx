import React, { useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Container, LoginDiv, Content } from './styles'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import Input from '../../components/Input'
import Footer from '../../components/Footer'
import api from '../../services/api'
import { toast } from 'react-toastify'
import Header from '../../components/Header'

function Account() {
  const { push } = useHistory()
  const user = useSelector(state => state.auth.user)

  const handleFormSubmit = useCallback(async data => {
    data.password_confirmation = data.password
    try {
      await api.put(`/users/${user.id}`, data)
      toast.success('successful operation')
      push('/')
    } catch (error) {
      console.log(error.response)
      error.response.data.map(err => toast.error(err.message))
    }
  }, [])
  const formik = useFormik({
    initialValues: {
      email: user.email,
      password: '',
      name: user.name,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: yup.object({
      email: yup.string().email(),
      password: yup.string(),
      name: yup.string(),
    }),

    onSubmit: handleFormSubmit,
  })
  return (
    <Content>
      <Header />
      <Container>
        <LoginDiv>
          <h1>Account</h1>

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
              placeholder='New Password'
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <span>{formik.errors.password}</span>
            ) : null}

            <button>
              Update <FiArrowRight size={24.3} color='#B5C401' />
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

export default Account
