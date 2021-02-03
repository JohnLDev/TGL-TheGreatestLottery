import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import { DrawerActions } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { addRequest } from '../../store/ducks/bet'
import { ClearCart, RemoveItemFromCart } from '../../store/ducks/cart'
import {
  Container,
  Close,
  Content,
  Header,
  Footer,
  Title,
  CartText,
  ButtonText,
  LineView,
  Save,
  CartView,
} from './styles'
import Bet from '../../components/Bet'
import { Ionicons, AntDesign } from '@expo/vector-icons'
const Cart = ({ navigation }) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart.betsInCart)

  const getPrice = useCallback(() => {
    const price = cart.map(bet => bet.price)
    const fullPrice = price.reduce(
      (acc, act) => parseFloat(acc) + parseFloat(act),
      [0],
    )
    return fullPrice
  }, [cart])

  const remove = useCallback(
    id => {
      console.log(id)
      dispatch(RemoveItemFromCart(id))
    },
    [cart],
  )

  const save = useCallback(() => {
    const min = 30
    if (getPrice() < 30) {
      alert(
        `O valor minimo é para salvar as apostas é ${min.toLocaleString(
          'pt-br',
          {
            style: 'currency',
            currency: 'BRL',
          },
        )}`,
      )
      return
    }
    cart.forEach(bet => dispatch(addRequest(bet)))
    dispatch(ClearCart())

    alert('Parabéns sua aposta já está disponível na Home')
  }, [cart])
  return (
    <Container>
      <Close
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
        style={{ position: 'absolute', top: 15, right: 20 }}
      >
        <Ionicons name='md-close' size={30} color='#B5C401' />
      </Close>
      <Content>
        <Header>
          <Ionicons
            name='md-cart-outline'
            size={35}
            color='#B5C401'
            style={{ marginRight: 8 }}
          />
          <Title> CART</Title>
        </Header>
        <CartView>
          <FlatList
            data={cart}
            keyExtractor={(a, index) => index.toString()}
            renderItem={({ index, item }) => (
              <Bet
                remove={() => remove(item.id)}
                isCart={true}
                key={item.id}
                style={{ marginTop: index === 0 ? 20 : 0 }}
                bet={item}
              />
            )}
          />
        </CartView>

        <Footer>
          <LineView
            style={{
              justifyContent: 'space-between',
              paddingBottom: 42,
            }}
          >
            <LineView>
              <CartText style={{ fontWeight: 'bold' }}>CART </CartText>
              <CartText>TOTAL:</CartText>
            </LineView>
            <LineView>
              <CartText style={{ fontWeight: 'bold', marginRight: 10 }}>
                R$ {cart.length > 0 ? getPrice().toFixed(2) : '0,00'}
              </CartText>
            </LineView>
          </LineView>
          <Save onPress={save}>
            <ButtonText>Save</ButtonText>
            <AntDesign
              name='arrowright'
              size={24}
              color='#B5C401'
              style={{ marginLeft: 20, marginTop: 8 }}
            />
          </Save>
        </Footer>
      </Content>
    </Container>
  )
}

export default Cart
