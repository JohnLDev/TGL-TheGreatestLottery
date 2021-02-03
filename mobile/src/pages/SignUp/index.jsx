import React, { useCallback, useState, useEffect } from 'react'
import {
  Container,
  LogoText,
  LogoView,
  LogoLine,
  FormView,
  TitleText,
  ButtonText,
  LineView,
  FooterText,
  ErrorText,
} from './styles'
import { Feather, AntDesign } from '@expo/vector-icons'
import { RegisterSchema } from '../../validations/schemas'
import { useFormik } from 'formik'
import Input from '../../components/Input'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import api from '../../services/api'

// import { Container } from './styles';

const SignUp = ({ navigation }) => {
  const [hide, setHide] = useState(true)
  const [Errors, setErrors] = useState('')
  useEffect(() => {
    setErrors('')
  }, [])

  const HandleSubmit = useCallback(async data => {
    setErrors('')
    data.password_confirmation = data.password
    try {
      await api.post('/users', data)
      alert('successful operation')
      navigation.push('SignIn')
    } catch (error) {
      console.log('TESTE', error)
      setErrors(error.response.data[0].message)
    }
  }, [])
  const Formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    onSubmit: HandleSubmit,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: RegisterSchema,
  })
  return (
    <ScrollView>
      <Container>
        <LogoView>
          <LogoText>TGL</LogoText>
          <LogoLine />
        </LogoView>
        <TitleText>Registration</TitleText>
        <FormView>
          <Input
            name='name'
            value={Formik.values.name}
            onChangeText={Formik.handleChange('name')}
            label={'Name '}
          />
          {Formik.errors.name && Formik.touched.name ? (
            <ErrorText>{Formik.errors.name}</ErrorText>
          ) : null}
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
            ></Input>
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
          ></View>
          <LineView style={{ paddingTop: 25 }}>
            <ButtonText
              style={{ color: '#B5C401' }}
              onPress={Formik.submitForm}
            >
              Register
            </ButtonText>
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
          onPress={() => navigation.push('SignIn')}
        >
          <AntDesign
            name='arrowleft'
            size={24}
            color='#707070'
            style={{ marginRight: 20, marginTop: 8 }}
          />
          <ButtonText>Back</ButtonText>
        </LineView>
        <FooterText>Copyright 2020 Luby Software</FooterText>
      </Container>
    </ScrollView>
  )
}

export default SignUp
