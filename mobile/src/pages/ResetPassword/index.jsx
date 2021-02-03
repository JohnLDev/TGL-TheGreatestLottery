import React, { useCallback, useState } from 'react'
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
import { AntDesign } from '@expo/vector-icons'
import { ResetSchema } from '../../validations/schemas'
import { useFormik } from 'formik'
import Input from '../../components/Input'
import { View } from 'react-native'
import api from '../../services/api'

const ResetPassword = ({ navigation }) => {
  const [Errors, setErrors] = useState('')

  const HandleSubmit = useCallback(async data => {
    setErrors('')

    try {
      await api.patch('/forgot', data)
      alert('successful operation')
      navigation.push('SignIn')
    } catch (error) {
      setErrors(error.response.data[0].message)
    }
  })
  const Formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: HandleSubmit,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: ResetSchema,
  })
  return (
    <Container>
      <LogoView>
        <LogoText>TGL</LogoText>
        <LogoLine />
      </LogoView>
      <TitleText>Reset password</TitleText>
      <FormView>
        <Input
          name='email'
          value={Formik.values.email}
          onChangeText={Formik.handleChange('email')}
          label={'Email '}
        />
        {(Formik.errors.email && Formik.touched.email) || Errors ? (
          <ErrorText>{Formik.errors.email || Errors}</ErrorText>
        ) : null}

        <View
          style={{ alignItems: 'flex-end', width: '100%', paddingRight: 31 }}
        ></View>
        <LineView style={{ paddingTop: 25 }}>
          <ButtonText style={{ color: '#B5C401' }} onPress={Formik.submitForm}>
            Send link
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
  )
}

export default ResetPassword
