import React, { useState, useEffect, useCallback } from 'react'
import { StatusBar, FlatList, ActivityIndicator, View } from 'react-native'
import { useSelector } from 'react-redux'

import Header from '../../components/Header'
// import types from '../../utils/types.json'
import {
  Container,
  Content,
  Title,
  Span,
  LineView,
  RecentView,
  ScrollStyledView,
  NoGameText,
  FilterView,
} from './styles'
import Bet from '../../components/Bet'
import ButtonFilter from '../../components/ButtonGame'

const Dashboard = ({ navigation }) => {
  const [gamesToShow, setGamesToShow] = useState([])
  const [active, setActive] = useState([])
  const games = useSelector(state => state.bet.bets)
  const Types = useSelector(state => state.type.types)
  // console.log(games)
  useEffect(() => {
    setGamesToShow(games)

    setActive(Types.map(() => false))
  }, [games, Types])

  useEffect(() => {
    let newBets = []
    active.forEach((act, index) => {
      if (act) {
        newBets = [
          ...newBets,
          ...games.filter(game => game.game === Types[index].type),
        ]
      }
    })

    if (!active.find(act => act === true)) {
      setGamesToShow(games)
    } else {
      setGamesToShow(newBets)
    }
  }, [active])

  const FilterGames = useCallback(
    index => {
      setActive(
        active.map((button, indx) => {
          if (index === indx) {
            return !button
          } else {
            return button
          }
        }),
      )
    },
    [active],
  )
  if (Types.length > 0) {
    return (
      <Container>
        <StatusBar backgroundColor='#fff' />

        <Header navigation={navigation} />
        <Content>
          <RecentView>
            <Title>RECENT GAMES</Title>
            <Span>Filters</Span>
            <LineView>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={Types}
                keyExtractor={(a, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <FilterView
                    style={
                      index === Types.length - 1
                        ? { marginRight: 20 }
                        : { marginRight: 0 }
                    }
                  >
                    <ButtonFilter
                      key={item.id}
                      type={item}
                      active={active[index]}
                      onPress={() => {
                        FilterGames(index)
                      }}
                    />
                  </FilterView>
                )}
              />
            </LineView>
          </RecentView>
          <ScrollStyledView style={{ pointerEvents: 'none' }}>
            {gamesToShow.length ? (
              gamesToShow.map((game, index) => (
                <Bet
                  key={game.id}
                  style={{ marginTop: index === 0 ? 146 : 0, paddingLeft: 20 }}
                  bet={game}
                />
              ))
            ) : (
              <NoGameText>You have no bets, so now lets make some!</NoGameText>
            )}
          </ScrollStyledView>
        </Content>
      </Container>
    )
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={'#b5c401'} size={80} />
      </View>
    )
  }
}

export default Dashboard
