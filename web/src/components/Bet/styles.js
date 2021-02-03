import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  margin-bottom: ${({ cart }) => (cart ? '15px' : '30px')};

  .line {
    width: 6px;
    min-width: 6px;
    height: ${({ cart }) => (cart ? '84px' : '94px')};
    background-color: #000;
    border-radius: 100px;
    color: ${({ gameColor }) => gameColor};
    &:first-child {
      background-color: ${({ gameColor }) => gameColor};
    }
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ cart }) => (cart ? 'space-around' : 'space-between')};
  margin-left: 15px;
  padding-top: 5px;
  padding-bottom: 5px;

  .info {
    display: flex;
    h3 {
      background-color: ${({ cart }) => (cart ? '#fff' : '#f7f7f7')} !important;
      font-size: ${({ cart }) => (cart ? '15px' : '20px')};
      display: flex;
      color: ${({ gameColor }) => gameColor};
      &:first-child {
        margin-bottom: ${({ cart }) => (cart ? '18px' : '0px')};
        background-color: ${({ gameColor }) => gameColor};
      }
    }
  }
  p {
    font-size: 17px;
  }
`
