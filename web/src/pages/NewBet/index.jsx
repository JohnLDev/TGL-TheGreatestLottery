import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Bet, Content, Number, CartContainer, Cart } from './styles'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import GameButton from '../../components/ButtonGame'
import BetNew from '../../components/Bet'
// import types from '../../utils/types'
import { FiShoppingCart, FiArrowRight, FiTrash2 } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { addRequest as addToStore } from '../../store/ducks/bet/bet'

const NewBet = () => {
  const [clickButtons, setClickButtons] = useState([])
  const [rules, setRules] = useState({
    type: '',
    description: '',
    range: 0,
    price: 0,
    maxNumber: 80,
    color: '',
    minCartValue: 0,
    array: [],
  })

  const [selectedNumbers, setSelectedNumbers] = useState([])
  const [active, setActive] = useState([])
  const [betInCart, setBetInCart] = useState([])

  const dispatch = useDispatch()
  const types = useSelector(state => state.type.types)

  useEffect(() => {
    setClickButtons(
      types.map(type => {
        if (type.type === 'Mega-Sena') {
          return true
        }
        return false
      }),
    )
  }, [])

  const HandleFilter = useCallback(
    index => {
      if (!clickButtons[index]) {
        clearGame()
      }
      setClickButtons(
        clickButtons.map((button, indx) => {
          if (index === indx) {
            return true
          } else {
            return false
          }
        }),
      )
    },
    [clickButtons],
  )
  useEffect(() => {
    if (clickButtons.findIndex(act => act === true) < 0) {
      return
    }
    const currentRule = types[clickButtons.findIndex(act => act === true)]

    currentRule.array = []
    for (let index = 0; index < currentRule.range; index++) {
      currentRule.array.push(index + 1)
    }
    setRules(currentRule)
  }, [clickButtons, rules, types])

  const HandleNumberClick = useCallback(
    num => {
      const act = active
      if (selectedNumbers.some(n => n === num)) {
        setSelectedNumbers(selectedNumbers.filter(n => n !== num))
      } else {
        if (selectedNumbers.length === rules['max-number']) {
          toast.warn('Você selecionou o máximo de numeros para aposta')
          return
        }
        setSelectedNumbers([...selectedNumbers, num])
      }
      act[num - 1] = !act[num - 1]
      setActive(act)
    },
    [selectedNumbers, active, rules],
  )
  let selected
  const completeGame = useCallback(() => {
    if (selectedNumbers.length === rules['max-number']) {
      toast.warn('Você selecionou o máximo de numeros para aposta')
      return
    }

    let random
    const act = active
    selected = selectedNumbers

    while (selected.length !== rules['max-number']) {
      do {
        random = Math.floor(Math.random() * (rules.range - 1 + 1)) + 1
      } while (selected.some(num => num === random))
      selected.push(random)
      act[random - 1] = !act[random - 1]
      setActive(act)
      setSelectedNumbers(selected)
      HandleFilter(clickButtons.findIndex(act => act === true))
    }
  }, [selectedNumbers, active, rules])

  const clearGame = useCallback(() => {
    const act = []
    setSelectedNumbers([])
    for (let index = 0; index < 80; index++) {
      act.push(false)
    }
    setActive(act)
  }, [])

  const add = useCallback(() => {
    if (selectedNumbers.length !== rules['max-number']) {
      toast.info(
        `Você deve selecionar mais ${
          rules['max-number'] - selectedNumbers.length
        } numeros para adicionar ao carrinho`,
      )
      return
    }
    const bet = {
      type_id: rules.id,
      game: rules.type,
      price: rules.price,
      numbers: selectedNumbers.join(', '),
      color: rules.color,
    }

    setBetInCart([...betInCart, bet])

    clearGame()
  }, [betInCart, selectedNumbers, rules])

  const getPrice = useCallback(() => {
    const price = betInCart.map(bet => bet.price)
    const fullPrice = price.reduce(
      (acc, act) => parseFloat(acc) + parseFloat(act),
      [0],
    )
    return fullPrice
  }, [betInCart])
  const remove = useCallback(
    betToRemove => {
      setBetInCart(betInCart.filter(bet => bet !== betToRemove))
    },
    [betInCart],
  )

  const save = useCallback(() => {
    if (getPrice() < rules['min-cart-value']) {
      toast.warn(
        `O valor minimo é para salvar as apostas é ${rules[
          'min-cart-value'
        ].toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}`,
      )
      return
    }
    betInCart.forEach(bet => dispatch(addToStore(bet)))
    setBetInCart([])
    toast.success('Parabéns sua aposta já está disponível na Home')
  }, [betInCart])
  return (
    <Container>
      <Header />
      <Content>
        <Bet>
          <div className='title'>
            <h1>NEW BET</h1>
            <h1>FOR VARIAVEL</h1>
          </div>
          <h2>Choose a game</h2>
          <div className='gameSelector'>
            {types.map((type, index) => (
              <GameButton
                key={type.type}
                onClick={() => {
                  HandleFilter(index)
                }}
                clicked={clickButtons[index]}
                gameColor={type.color}
              >
                {type.type}
              </GameButton>
            ))}
          </div>
          <div className='description'>
            <h2>Fill your bet</h2>
            <p>
              {rules.description ||
                'Fill your bet Mark as many numbers as you want up to a maximum of 50. Win by hitting 15, 16, 17, 18, 19, 20 or none of the 20 numbers drawn.'}
            </p>
          </div>
          <div className='numbers'>
            {rules.array.map(number => (
              <Number
                type={rules.color}
                active={active[number - 1]}
                key={number}
                onClick={() => HandleNumberClick(number)}
              >
                {number}
              </Number>
            ))}
          </div>
          <div className='handlerbuttons'>
            <button onClick={completeGame} className='complete'>
              Complete Game
            </button>
            <button onClick={clearGame} className='clear'>
              Clear Game
            </button>
            <button onClick={add} className='add'>
              <FiShoppingCart />
              Add to cart
            </button>
          </div>
        </Bet>
        <CartContainer>
          <Cart>
            <h1>CART</h1>
            <div className='items'>
              {betInCart.map((bet, index) => (
                <div className='bet' key={index}>
                  <button onClick={() => remove(bet)}>
                    <FiTrash2 />
                  </button>
                  <BetNew
                    key={Date.now()}
                    cart={true}
                    bet={bet}
                    type={bet.game}
                  />
                </div>
              ))}
            </div>
            <div className='total'>
              <h1>CART</h1>
              <h1>
                TOTAL:
                {getPrice().toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </h1>
            </div>
            <button onClick={save}>
              SAVE <FiArrowRight />
            </button>
          </Cart>
        </CartContainer>
      </Content>
      <Footer />
    </Container>
  )
}

export default NewBet
