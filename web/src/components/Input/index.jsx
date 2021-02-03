import React from 'react'
import { StyledInput } from './styles'

const Input = ({ name, ...rest }) => {
  return <StyledInput name={name} type='text' {...rest} />
}

export default Input
