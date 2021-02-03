import React from 'react'
import { Container } from './styles'

const Footer = ({ children, clicked, gameColor, ...rest }) => {
  return (
    <Container clicked={clicked} gameColor={gameColor}>
      <button {...rest}>{children}</button>
    </Container>
  )
}
export default Footer
