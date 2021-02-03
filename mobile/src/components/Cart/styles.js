import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  padding-left: 28px;
`
export const Close = styled.TouchableOpacity``
export const Content = styled.View`
  flex: 1; ;
`
export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 46px;
`

export const Footer = styled.View`
  position: absolute;
  bottom: 0;

  width: 100%;
  padding-right: 28px;
  height: 23.5%;
`

export const Title = styled.Text`
  font-size: 22px;
  color: #707070;
  font-weight: bold;
  font-style: italic;
  margin-bottom: 20px;
`

export const LineView = styled.View`
  flex-direction: row;

  /* align-items: center; */
`
export const CartText = styled.Text`
  font-size: 15px;
  font-style: italic;
  color: #707070;
`
export const Save = styled.TouchableOpacity`
  background-color: #ebebeb;

  width: 117%;
  max-height: 94px;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 53px;
  border-bottom-right-radius: 13px;
  margin-left: -28px;
`
export const ButtonText = styled.Text`
  font-size: 30px;
  font-style: italic;
  font-weight: bold;
  color: #b5c401;
`

export const CartView = styled.View`
  height: 59%;
`
