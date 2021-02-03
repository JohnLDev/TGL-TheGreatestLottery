import React, { useState, useEffect, useCallback } from 'react'
import { FlatList } from 'react-native'
import Header from '../../components/Header'
import { useSelector, useDispatch } from 'react-redux'

import {
  Container,
  TitleText,
  Content,
  Span,
  LineView,
  Strong,
  P,
  ViewOfLine,
  SmallLine,
  ViewNewBet,
  Numbers,
  NumberText,
  DescriptionView,
  FilterView,
} from './styles'

import ButtonFilter from '../../components/ButtonGame'
import ButtonOptions from '../../components/ButtonOptions'
import { AddItemToCart } from '../../store/ducks/cart'
import { Ionicons } from '@expo/vector-icons'
const NewBet = ({ navigation }) => {
  const [numbers, setNumbers] = useState([])
  const [selectedNumbers, setSelectedNumbers] = useState([])
  const [selectedGame, setSelectedGame] = useState({})

  const [active, setActive] = useState([])

  const dispatch = useDispatch()

  const Types = useSelector(state => state.type.types)
  const Cart = useSelector(state => state.cart.betsInCart)

  useEffect(() => {
    setActive(Types.map(() => false))
    const array = []
    for (let index = 0; index < 80; index++) {
      array.push(false)
    }
    setNumbers([...array])
  }, [Types])
  const HandleFilter = useCallback(
    (index, type) => {
      if (!active[index]) {
        Clear()
      }
      setSelectedGame(type)
      setActive(
        active.map((button, indx) => {
          if (index === indx) {
            return true
          } else {
            return false
          }
        }),
      )
    },
    [active],
  )
  useEffect(() => {
    if (selectedGame.range) {
      const array = []
      for (let index = 0; index < selectedGame.range; index++) {
        array.push(false)
      }
      setNumbers([...array])
    }
  }, [selectedGame])

  const HandleSelectedNumber = useCallback(
    index => {
      if (!selectedGame.color) {
        alert('Please select a game before start')
        return
      }
      if (selectedNumbers.length === selectedGame['max-number']) {
        alert('Max numbers reached')
        return
      }

      if (selectedNumbers.find(num => num === index + 1)) {
        return
      }
      numbers[index] = true
      setSelectedNumbers([...selectedNumbers, index + 1])
    },
    [selectedNumbers, selectedGame, numbers],
  )

  const HandleRemoveSelectedNumber = useCallback(
    index => {
      setSelectedNumbers(
        selectedNumbers.filter(num => num !== selectedNumbers[index]),
      )
      numbers[selectedNumbers[index] - 1] = false
    },
    [selectedNumbers],
  )
  const Clear = useCallback(() => {
    setSelectedNumbers([])
    numbers.forEach((n, index) => {
      numbers[index] = false
    })
  }, [selectedNumbers, numbers])

  const CompleteGame = useCallback(() => {
    if (selectedNumbers.length === selectedGame['max-number']) {
      alert('Você selecionou o máximo de numeros para aposta')
      return
    }

    let random

    const selected = selectedNumbers

    while (selected.length !== selectedGame['max-number']) {
      do {
        random = Math.floor(Math.random() * (selectedGame.range - 1 + 1)) + 1
      } while (selected.some(num => num === random))
      selected.push(random)
      numbers[random - 1] = !numbers[random - 1]
    }
    setSelectedNumbers(selected)
    HandleFilter(
      active.findIndex(act => act === true),
      selectedGame,
    )
  }, [selectedNumbers, selectedGame, numbers])

  const AddToCart = useCallback(() => {
    if (selectedNumbers.length !== selectedGame['max-number']) {
      alert(
        `Você deve selecionar mais ${
          selectedGame['max-number'] - selectedNumbers.length
        } numeros para adicionar ao carrinho`,
      )
      return
    }
    const bet = {
      id: Cart.length + 1,
      type_id: selectedGame.id,
      game: selectedGame.type,
      price: selectedGame.price,
      numbers: selectedNumbers.join(', '),
      color: selectedGame.color,
      date: new Date().toLocaleDateString(),
    }
    console.log(bet)
    dispatch(AddItemToCart(bet))
    navigation.toggleDrawer()
    Clear()
  }, [selectedNumbers, numbers])

  return (
    <Container>
      <Header navigation={navigation} newBet={true} />
      <Content>
        <ViewNewBet selected={selectedNumbers.length > 0}>
          <TitleText>NEW BET FOR LOTOMANIA</TitleText>
          <Span>Choose a game</Span>

          <LineView style={{ flexDirection: 'column' }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={Types}
              keyExtractor={(a, index) => index.toString()}
              renderItem={({ item, index }) => (
                <FilterView>
                  <ButtonFilter
                    Dash={false}
                    key={item.id}
                    type={item}
                    active={active[index]}
                    onPress={() => {
                      HandleFilter(index, item)
                    }}
                    style={{
                      marginBottom: selectedNumbers.length > 0 ? 10 : 0,
                    }}
                  />
                </FilterView>
              )}
            />
          </LineView>
          {selectedNumbers.length < 1 ? (
            <DescriptionView>
              <Strong>Fill your bet</Strong>
              <P>
                {selectedGame.description
                  ? selectedGame.description
                  : 'Mark as many numbers as you want up to a maximum of 50. Win by hitting 15, 16, 17, 18, 19, 20 or none of the 20 numbers drawn.'}
              </P>
            </DescriptionView>
          ) : (
            <>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={selectedNumbers}
                keyExtractor={(a, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Numbers
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: selectedGame.color || '#adc0c4',
                    }}
                    onPress={() => HandleRemoveSelectedNumber(index)}
                  >
                    <Ionicons
                      name='close'
                      size={12}
                      color='#fff'
                      style={{ position: 'absolute', top: 4, right: 5 }}
                    />
                    <NumberText>{String(item)}</NumberText>
                  </Numbers>
                )}
                contentContainerStyle={{ paddingBottom: 25 }}
              />
              <LineView
                style={{ justifyContent: 'space-around', paddingRight: 22 }}
              >
                <ButtonOptions
                  Text={'Complete Game'}
                  width='110px'
                  Color={'#B5C401'}
                  onPress={CompleteGame}
                />
                <ButtonOptions
                  Text={'Clear game'}
                  width='87px'
                  Color={'#B5C401'}
                  onPress={Clear}
                />
                <ButtonOptions
                  Text={'Add to cart'}
                  width='122px'
                  Color={'#fff'}
                  add
                  style={{ backgroundColor: '#B5C401' }}
                  onPress={AddToCart}
                />
              </LineView>
            </>
          )}

          <ViewOfLine>
            <SmallLine />
          </ViewOfLine>
        </ViewNewBet>

        <FlatList
          data={numbers}
          keyExtractor={(a, index) => index}
          numColumns={5}
          renderItem={({ index, item }) => (
            <Numbers
              onPress={() => HandleSelectedNumber(index)}
              style={{ backgroundColor: item ? selectedGame.color : '#adc0c4' }}
            >
              <NumberText>{index + 1}</NumberText>
            </Numbers>
          )}
          columnWrapperStyle={{ height: 64, marginVertical: 2 }}
          contentContainerStyle={{
            paddingTop: selectedNumbers.length > 0 ? 257 : 310,
            paddingBottom: 25,
          }}
        />
      </Content>
    </Container>
  )
}

export default NewBet
