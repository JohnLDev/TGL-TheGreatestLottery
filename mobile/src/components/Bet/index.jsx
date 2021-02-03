import React from 'react'
// import { View } from 'react-native'

import {
  Container,
  LineView,
  ContentView,
  DataText,
  NumberText,
  TypeText,
  TouchButton,
  LinneView,
} from './styles'
import { Feather } from '@expo/vector-icons'

const Bet = ({ style, bet, isCart, remove }) => {
  const price = bet.price && bet.price.toFixed(2).toString().replace('.', ',')
  return (
    <Container style={style}>
      <LineView bet={bet} />
      <ContentView bet={bet}>
        <NumberText>{bet.numbers}</NumberText>
        <LinneView>
          <DataText>
            {bet.date} - (R$ {price})
          </DataText>
          {isCart && (
            <TouchButton onPress={() => remove()}>
              <Feather name='trash-2' size={20} color='#707070' />
            </TouchButton>
          )}
        </LinneView>
        <TypeText bet={bet}>{bet.game}</TypeText>
      </ContentView>
    </Container>
  )
}

export default Bet
