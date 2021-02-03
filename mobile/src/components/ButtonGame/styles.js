import styled from 'styled-components/native'

export const Buttongame = styled.TouchableOpacity`
  background-color: ${({ active, type }) =>
    active === true ? type.color : '#fff'};
  max-width: 100px;

  width: 100%;
  border-radius: 100px;
  height: 30px;
  border: 2px solid;
  border-color: ${({ type }) => type.color};
  justify-content: center;
  align-items: center;
  margin-right: 9px;
  padding-left: 10px;
  padding-right: 10px;
`
export const TextButton = styled.Text`
  font-size: 14px;
  font-style: italic;
  font-weight: bold;
  color: ${({ active, type }) => (!active === true ? type.color : '#fff')};
`
