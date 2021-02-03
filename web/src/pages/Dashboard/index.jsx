import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Content } from './styles'
import Header from '../../components/Header'
import GameButton from '../../components/ButtonGame'
import Bet from '../../components/Bet'
import Footer from '../../components/Footer'
import { FiArrowRight } from 'react-icons/fi'
// import GameTypes from '../../utils/types'

const Dashboard = () => {
  const [clickButtons, setClickButtons] = useState([])
  const [betsToShow, setBetsToShow] = useState([])
  const bets = useSelector(state => state.bet.bets)
  const types = useSelector(state => state.type.types)

  useEffect(() => {
    setClickButtons(types.map(() => false))

    setBetsToShow(bets)
    console.log(types)
  }, [bets, types])

  const HandleFilter = useCallback(
    index => {
      setClickButtons(
        clickButtons.map((button, indx) => {
          if (index === indx) {
            return !button
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
      setBetsToShow(bets)
      return
    }
    setBetsToShow(
      bets.filter(
        bet =>
          bet.game === types[clickButtons.findIndex(act => act === true)].type,
      ),
    )
  }, [clickButtons])

  return (
    <Container>
      <Header isDash={true} />
      <Content>
        <div className='options'>
          <h2>RECENT GAMES</h2>
          <span>Filters</span>
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
          <Link to='/newbet'>
            New Bet <FiArrowRight />
          </Link>
        </div>
        {betsToShow.length > 0 ? (
          betsToShow.map(bet => <Bet key={bet.id} type={bet.game} bet={bet} />)
        ) : (
          <h3>
            {"You have no bets, let's place some bets just click on new bet"}
          </h3>
        )}
      </Content>
      <Footer />
    </Container>
  )
}

export default Dashboard
