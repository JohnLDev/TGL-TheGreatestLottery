import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: #fff;
  height: 70px;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: row;
`
export const LogoView = styled.View`
  width: 100%;
  max-width: 70px;
  align-items: center;
`

export const LogoText = styled.Text`
  font-size: 30px;
  color: #707070;
  font-style: italic;
  font-weight: bold;
`

export const LogoLine = styled.View`
  width: 90%;
  background-color: #b5c401;
  border-radius: 6px;
  height: 7px;
`

export const TouchButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const LineView = styled.View`
  flex-direction: row;
  align-items: center;
`
