import React, { useCallback, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, LogoDiv, LoginDiv, Content } from './styles'
// import { Form } from '@unform/web'
import { FiArrowRight } from 'react-icons/fi'
import { loginRequest, logout } from '../../store/ducks/auth/auth'
import Input from '../../components/Input'
import Footer from '../../components/Footer'
import { toast } from 'react-toastify'

const SignIn = () => {
  const dispatch = useDispatch()
  const { push } = useHistory()
  useEffect(() => {
    dispatch(logout())
  }, [])
  const auth = useSelector(state => {
    return {
      isLogged: state.auth.isLogged,
      error: state.auth.error,
    }
  })

  useEffect(() => {
    if (auth.isLogged === true) {
      push('/dashboard')
    }
    if (auth.error) {
      toast.error(auth.error)
    }
  }, [auth.isLogged, auth.error])

  const handleFormSubmit = useCallback(data => {
    dispatch(loginRequest(data.email, data.password))
  }, [])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: yup.object({
      email: yup.string().email().required('Insira um email valido'),
      password: yup.string().required('Insira uma password'),
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
          <h1>Authentication</h1>

          <form onSubmit={formik.handleSubmit}>
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
            <div>
              <Link to='/forgot-password'>I forget my password</Link>
            </div>
            <button type='submit'>
              Log In <FiArrowRight size={24.3} color='#B5C401' />
            </button>
          </form>
          <Link to='/signup'>
            Sign Up <FiArrowRight size={24.3} color='#535351' />
          </Link>
        </LoginDiv>
      </Container>
      <Footer />
    </Content>
  )
}

export default SignIn
