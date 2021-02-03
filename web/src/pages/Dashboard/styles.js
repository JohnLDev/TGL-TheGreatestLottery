import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
`

export const Content = styled.div`
  padding-left: 141px;
  padding-top: 73px;
  color: #868686;
  height: calc(100% - 120px);
  overflow: auto;
  @media (max-width: 770px) {
    padding-left: 30px;
    padding-top: 30px;
  }

  .options {
    display: flex;
    margin-bottom: 38px;
    align-items: center;
    @media (max-width: 770px) {
      flex-direction: column;
      justify-content: center;
    }
    h2 {
      color: #707070;
      font-size: 24px;
      font-weight: bold;
    }
    span {
      margin-left: 45px;
      font-size: 17px;
      margin-right: 15px;
    }
    a {
      color: #b5c401;
      font-size: 24px;
      margin-left: 13%;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        margin-left: 10px;
      }
    }
  }
`
