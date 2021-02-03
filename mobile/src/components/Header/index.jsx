import React from 'react'
import {
  Container,
  LogoLine,
  LogoText,
  LogoView,
  TouchButton,
  LineView,
} from './styles'
import { Feather, Ionicons } from '@expo/vector-icons'
import { DrawerActions } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/ducks/auth'

const Header = ({ navigation, newBet }) => {
  const dispatch = useDispatch()

  return (
    <Container
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 3,
      }}
    >
      <TouchButton
        onPress={() => navigation.navigate('Home', { screen: 'Home' })}
      >
        <LogoView>
          <LogoText>TGL</LogoText>
          <LogoLine />
        </LogoView>
      </TouchButton>
      <LineView>
        {newBet && (
          <TouchButton
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
          >
            <Ionicons
              name='md-cart-outline'
              size={35}
              color='#B5C401'
              style={{ marginRight: 30 }}
            />
          </TouchButton>
        )}
        <TouchButton
          onPress={() => {
            dispatch(logout())
            navigation.push('SignIn')
          }}
        >
          <Feather name='log-out' size={30} color='#C1C1C1' />
        </TouchButton>
      </LineView>
    </Container>
  )
}

export default Header
