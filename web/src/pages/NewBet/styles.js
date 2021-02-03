import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
`

export const Content = styled.div`
  height: calc(100% - 120px);
  overflow: auto;
  display: flex;
  @media (max-width: 1599px) {
    display: flex;
    flex-direction: column;
  }
`

export const Bet = styled.div`
  padding-left: 130px;
  width: 80%;
  h2 {
    font-size: 17px;
    font-weight: bold;
    color: #868686;
    margin-top: 33px;
    margin-bottom: 20px;
  }

  .title {
    display: flex;
    margin-top: 50px;

    h1 {
      font-size: 24px;
      color: #707070;
      &:last-child {
        font-weight: lighter;
        margin-left: 8px;
      }
    }
  }

  .gameSelector {
    display: flex;
  }

  .description {
    p {
      color: #868686;
      max-width: 700px;
    }
  }

  .numbers {
    display: grid;
    grid-template-columns: repeat(16, 1fr);

    gap: 20px;
    margin-top: 25px;
    width: 70%;
    margin-bottom: 44px;
    @media (max-width: 1279px) {
      grid-template-columns: repeat(15, 1fr);
    }
    @media (max-width: 1205px) {
      grid-template-columns: repeat(14, 1fr);
    }
    @media (max-width: 1131px) {
      grid-template-columns: repeat(13, 1fr);
    }
    @media (max-width: 1059px) {
      grid-template-columns: repeat(12, 1fr);
    }
    @media (max-width: 995px) {
      grid-template-columns: repeat(11, 1fr);
    }
    @media (max-width: 921px) {
      grid-template-columns: repeat(10, 1fr);
    }
    @media (max-width: 864px) {
      grid-template-columns: repeat(9, 1fr);
    }
    @media (max-width: 783px) {
      grid-template-columns: repeat(8, 1fr);
    }
    @media (max-width: 703px) {
      grid-template-columns: repeat(7, 1fr);
    }
    @media (max-width: 621px) {
      grid-template-columns: repeat(6, 1fr);
    }
    @media (max-width: 549px) {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  .handlerbuttons {
    display: flex;
    .clear {
      width: 100%;
      max-width: 135px;
    }
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 52px;
      background-color: #fff;
      border: 1px solid #27c383;
      border-radius: 10px;
      color: #27c383;
      font-size: 16px;
      font-weight: bolder;
      &:hover {
        background-color: #27c383;
        color: #ffffff;
      }
      &:first-child {
        max-width: 164px;
        width: 100%;
        margin-right: 25px;
      }
      &:last-child {
        margin-left: 142px;
        background-color: #27c383;
        color: #ffffff;
        max-width: 209px;
        width: 100%;
        &:hover {
          background-color: #ffffff;
          color: #27c383;
        }
        svg {
          margin-right: 10px;
        }
      }
    }
  }
`

export const Number = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 53px;
  height: 53px;
  border-radius: 50%;
  background-color: ${({ active, type }) => (active ? type : '#adc0c4')};
  color: #fff;
  border: 0;
`

export const CartContainer = styled.div`
  width: 30%;
  @media (max-width: 1599px) {
    display: flex;
    width: 100%;
    justify-content: center;
  }
`
export const Cart = styled.div`
  color: #868686;
  max-width: 317px;
  width: 100%;
  height: 464px;

  background-color: #fff;
  margin-top: 41px;
  padding-left: 17px;

  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid #e2e2e2;
  h1 {
    margin-top: 32px;
    margin-bottom: 35px;

    font-size: 24px;
    color: #707070;
    font-weight: bold;
  }
  .items {
    overflow: auto;
    max-height: 200px;
    height: 200px;
    .bet {
      display: flex;
      align-items: center;

      margin-left: 20px;
      button {
        margin-top: -8px;

        background-color: #fff;
        border: 0;
        margin-right: 10px;

        svg {
          height: 24px;
          width: 24px;
          color: #888888;
        }
      }
    }
  }
  .total {
    display: flex;
    margin-top: 25px;
    h1 {
      margin: 0;
      &:last-child {
        font-weight: normal;

        margin-left: 10px;
      }
    }
  }
  button {
    color: #27c383;
    font-size: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f4;
    border: 1px solid #e2e2e2;
    height: 96px;
    margin-left: -17px;
    margin-top: 20px;
    border-radius: 0 0 10px 10px;
  }
`
