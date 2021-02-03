import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background: rgba(247, 247, 247, 0.95);
`

export const Content = styled.View`
  /* padding-left: 20px; */
  padding-top: 26px;
  background: rgba(247, 247, 247, 0.95);
  flex: 1;
`

export const RecentView = styled.View`
  /* padding-left: 20px; */

  position: absolute;
  width: 100%;
  height: 136px;
  background: rgba(247, 247, 247, 0.95);

  top: 26px;
  z-index: 1;
`

export const Title = styled.Text`
  font-size: 22px;
  font-style: italic;
  font-weight: bold;
  color: #707070;
  margin-bottom: 15px;
  padding-left: 20px;
`

export const Span = styled.Text`
  font-size: 17px;
  font-style: italic;
  color: #868686;
  margin-bottom: 15px;
  padding-left: 20px;
`
export const LineView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* padding-left: 20px; */
`

export const ScrollStyledView = styled.ScrollView`
  background: rgba(247, 247, 247, 1);
`

export const NoGameText = styled.Text`
  font-size: 20px;
  font-style: italic;
  color: #707070;
  margin-bottom: 15px;
  max-width: 270px;
  margin-top: 146px;
  padding-left: 20px;
`
export const FilterView = styled.View`
  /* width: 110px; */
  margin-left: 20px;
`
