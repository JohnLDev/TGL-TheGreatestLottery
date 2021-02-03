import styled from 'styled-components'

export const Content = styled.div`
  height: 100vh;
  @media (max-width: 800px) {
    height: 100%;
  }
`
export const Container = styled.div`
  display: flex;
  height: calc(100% - 50px);
  width: 100%;
  color: #707070;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`

export const LogoDiv = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  h1 {
    font-size: 65px;
    &:last-child {
      font-size: 83px;
    }
  }
  h2 {
    display: flex;
    justify-content: center;
    align-items: center;

    color: #fff;
    background-color: #b5c401;
    max-width: 144px;
    width: 100%;
    border-radius: 100px;
    margin-top: 14px;
    margin-bottom: 14px;
    height: 39px;
  }
`

export const LoginDiv = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 35px;
    color: #707070;
  }
  form {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    max-width: 352px;
    width: 100%;
    height: 337px;
    box-shadow: 0px 3px 25px #00000014;

    margin-top: 26px;

    background-color: #fff;
    border-radius: 14px;
    border: 1px solid #dddddd;
    span {
      color: red;
    }
    input {
      &:first-child {
        border-radius: 14px 14px 0 0;
        border-top: 0;
      }
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #b5c401;
      text-decoration: none;
      font-size: 35px;
      font-weight: bold;
      margin-top: 30px;
      padding-left: 30px;
      padding-right: 0px;
      border: 0;
      background-color: #fff;

      svg {
        margin-left: 19px;
      }
    }
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #535351;
    text-decoration: none;
    font-size: 35px;
    font-weight: bold;
    margin-top: 16px;
    padding-right: 40px;
    @media (max-width: 800px) {
      margin-bottom: 15px;
    }
    svg {
      margin-right: 19px;
    }
  }
`
