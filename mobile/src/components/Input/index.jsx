import React from 'react'
import { StyledInput } from './styles'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const Input = ({ name, ...rest }) => {
  return (
    <StyledInput
      name={name}
      {...rest}
      borderHeight={2}
      inputStyle={{
        paddingTop: 20,
        paddingLeft: 26,
        color: '#9D9D9D',
        fontSize: 15,
      }}
      labelStyle={{
        marginBottom: 16,
        paddingLeft: 26,
        color: '#9D9D9D',
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
      labelHeight={5}
      iconClass={FontAwesomeIcon}
      iconName={''}
      iconColor={'#B5C401'}
      autoCapitalize={'none'}
    />
  )
}

export default Input
