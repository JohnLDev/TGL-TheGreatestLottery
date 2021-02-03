import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background: rgba(247, 247, 247, 0.8);
`
export const Content = styled.View`
  flex: 1;
  padding-left: 20px;
  background: rgba(247, 247, 247, 0.8);
  z-index: 1;
`
export const TitleText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  font-style: italic;
  color: #707070;
  padding-top: 26px;
`

export const Span = styled.Text`
  font-size: 17px;
  font-style: italic;
  color: #868686;
  margin-top: 15px;
  margin-bottom: 15px;
`

export const LineView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background: rgba(247, 247, 247, 0.8);
`

export const Strong = styled.Text`
  font-size: 17px;
  font-style: italic;
  font-weight: bold;
  color: #868686;
  margin-top: 23px;
  margin-bottom: 15px;
`

export const P = styled.Text`
  font-size: 17px;
  font-style: italic;
  color: #868686;
  margin-top: 10px;
`
export const SmallLine = styled.View`
  background-color: #c1c1c1;
  border-radius: 6px;
  max-width: 36px;
  width: 100%;
  height: 6px;
  margin-left: -35px;
`

export const ViewOfLine = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`

export const ViewNewBet = styled.View`
  position: absolute;
  width: 100%;
  height: ${({ selected }) => (selected ? '257px' : '300px')};
  background: rgba(247, 247, 247, 0.9);
  left: 20px;
  top: 0;
  z-index: 1;
`

export const Numbers = styled.TouchableOpacity`
  max-width: 60px;
  max-height: 60px;

  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;

  background-color: #adc0c4;
  border-radius: 50px;

  margin-right: 10px;
`

export const NumberText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
`

export const DescriptionView = styled.View``
export const FilterView = styled.View`
  width: 110px;
`
