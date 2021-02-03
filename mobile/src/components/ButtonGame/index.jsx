import React from 'react'
import { StyleSheet } from 'react-native'
import { Buttongame, TextButton } from './styles'

import { Ionicons } from '@expo/vector-icons'
const ButtonGame = ({ type, active, Dash = true, ...rest }) => {
  return (
    <Buttongame {...rest} type={type} active={active}>
      {active && Dash && (
        <Ionicons name='close' size={15} color='#fff' style={styles.x} />
      )}
      <TextButton type={type} active={active}>
        {type.type}
      </TextButton>
    </Buttongame>
  )
}

export default ButtonGame

const styles = StyleSheet.create({
  x: {
    position: 'absolute',
    right: 3,
    top: 0,
  },
})
