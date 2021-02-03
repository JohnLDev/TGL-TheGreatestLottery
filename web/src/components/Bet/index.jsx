import React from 'react'
import { Container, Content } from './styles'
const Bet = ({ bet, cart }) => {
  const price = bet.price.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  })
  return (
    <Container cart={cart} type={bet.game} gameColor={bet.color}>
      <div className={`line ${bet.game}`}></div>
      <Content cart={cart} gameColor={bet.color}>
        <h3>{bet.numbers}</h3>
        <p>{!cart ? `${bet.date} - (${price})` : null}</p>
        <div className='info'>
          <h3 className={bet.game}>{bet.game}</h3>
          {cart ? (
            <h3
              style={{
                color: '#868686',
                fontWeight: 'normal',
                marginLeft: '10px',
              }}
            >
              {price}
            </h3>
          ) : null}
        </div>
      </Content>
    </Container>
  )
}

export default Bet
