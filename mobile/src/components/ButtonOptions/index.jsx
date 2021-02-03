import React from 'react'
// import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Button, TextButton } from './styles'

const ButtonsOptions = ({ Text, width, add, Color, ...rest }) => {
  return (
    <Button width={width} {...rest}>
      {add && (
        <Ionicons
          name='md-cart-outline'
          size={24}
          color='#fff'
          style={{ marginRight: 10 }}
        />
      )}
      <TextButton Color={Color}>{Text}</TextButton>
    </Button>
  )
}

export default ButtonsOptions
