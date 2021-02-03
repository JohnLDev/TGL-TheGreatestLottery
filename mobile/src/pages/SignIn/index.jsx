import React, { useCallback, useState, useEffect } from 'react'
import {
  Container,
  LogoText,
  LogoView,
  LogoLine,
  FormView,
  TitleText,
  ForgotText,
  ButtonText,
  LineView,
  FooterText,
  ErrorText,
} from './styles'
import { Feather, AntDesign } from '@expo/vector-icons'
import { LoginSchema } from '../../validations/schemas'
import { useFormik } from 'formik'
import Input from '../../components/Input'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { loginRequest } from '../../store/ducks/auth'
const SignIn = ({ navigation }) => {
  const [hide, setHide] = useState(true)
  const [Errors, setErrors] = useState('')
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const HandleSubmit = useCallback(data => {
    console.log(data)
    setErrors('')
    dispatch(loginRequest(data.email, data.password))
  }, [])

  useEffect(() => {
    if (auth.isLogged) {
      navigation.push('Dashboard')
    }
    if (auth.error) {
      setErrors(auth.error)
    }
  }, [auth])
  useEffect(() => {
    setErrors('')
  }, [])
  const Formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: HandleSubmit,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: LoginSchema,
    initialErrors: '',
  })
  return (
    <ScrollView>
      <Container>
        <LogoView>
          <LogoText>TGL</LogoText>
          <LogoLine />
        </LogoView>
        <TitleText>Authentication</TitleText>
        <FormView>
          <Input
            name='email'
            value={Formik.values.email}
            onChangeText={Formik.handleChange('email')}
            label={'Email '}
          />
          {Formik.errors.email && Formik.touched.email ? (
            <ErrorText>{Formik.errors.email}</ErrorText>
          ) : null}
          <View
            style={{
              width: '100%',
              position: 'relative',
              justifyContent: 'center',
            }}
          >
            <Input
              name='password'
              label={'Password '}
              secureTextEntry={hide}
              value={Formik.values.password}
              onChangeText={Formik.handleChange('password')}
            />
            {(Formik.errors.password && Formik.touched.password) || Errors ? (
              <ErrorText>{Formik.errors.password || Errors}</ErrorText>
            ) : null}
            {hide ? (
              <Feather
                name='eye'
                size={24}
                color='#C1C1C1'
                style={{ position: 'absolute', right: 31 }}
                onPress={() => setHide(false)}
              />
            ) : (
              <Feather
                name='eye-off'
                size={24}
                color='#C1C1C1'
                style={{ position: 'absolute', right: 31 }}
                onPress={() => setHide(true)}
              />
            )}
          </View>
          <View
            style={{ alignItems: 'flex-end', width: '100%', paddingRight: 31 }}
          >
            <LineView onPress={() => navigation.push('ResetPassword')}>
              <ForgotText>I forget my password</ForgotText>
            </LineView>
          </View>

          <LineView onPress={() => Formik.handleSubmit()}>
            <ButtonText style={{ color: '#B5C401' }}>Log In</ButtonText>
            <AntDesign
              name='arrowright'
              size={24}
              color='#B5C401'
              style={{ marginLeft: 20, marginTop: 8 }}
            />
          </LineView>
        </FormView>

        <LineView
          style={{ paddingTop: 38 }}
          onPress={() => navigation.push('SignUp')}
        >
          <ButtonText>Sign Up</ButtonText>
          <AntDesign
            name='arrowright'
            size={24}
            color='#707070'
            style={{ marginLeft: 20, marginTop: 8 }}
          />
        </LineView>
        <FooterText>Copyright 2020 Luby Software</FooterText>
      </Container>
    </ScrollView>
  )
}

export default SignIn
