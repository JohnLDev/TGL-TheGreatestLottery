import styled from 'styled-components'

export const Container = styled.div`
  max-width: 113px;
  width: 100%;
  margin-right: 25px;
  &:last-child {
    margin-right: 0px;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 113px;
    width: 100%;

    ${({ gameColor }) => `border-color:${gameColor}; color:${gameColor}`};
    height: 34px;
    border-radius: 100px;
    font-size: 14px;
    font-style: italic;
    font-weight: bold;
    border: 2px solid;
    ${({ clicked, gameColor }) =>
      clicked && `background-color:${gameColor}; color:#fff`}
  }
`
