import styled from 'styled-components/native'

export const Button = styled.TouchableOpacity`
  height: 32px;
  width: ${({ width }) => width};
  border: 1px solid #b5c401;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`
export const TextButton = styled.Text`
  color: ${({ Color }) => Color};
  font-size: 13px;
  font-weight: bold;
`
