import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  height: 79px;
  width: 100%;
  max-width: 80%;
  margin-bottom: 25px;
  /* background-color: red; */
`
export const LineView = styled.View`
  width: 6px;
  height: 80px;
  background-color: ${({ bet }) => bet.color};
  border-radius: 10px;
`

export const ContentView = styled.View`
  justify-content: space-around;
  padding-left: 15px;
`
export const NumberText = styled.Text`
  color: #868686;
  font-size: 12px;
  font-weight: bold;
  font-style: italic;
`

export const DataText = styled.Text`
  color: #868686;
  font-size: 12px;
`
export const TypeText = styled.Text`
  color: ${({ bet }) => bet.color};
  font-size: 16px;
  font-weight: bold;
  font-style: italic;
`
export const TouchButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
export const LinneView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`
