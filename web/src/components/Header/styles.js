import styled from 'styled-components'

export const StyledHeader = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #707070;
  border-top: 2px solid #ebebeb;
  border-bottom: 2px solid #ebebeb;
  font-size: 15px;
  padding-left: 141px;
  padding-right: 199px;
  @media (max-width: 500px) {
    padding-left: 10px;
    padding-right: 0px;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 190px;
    width: 100%;
    a {
      font-size: 20px;
      font-weight: bold;
      color: #707070;
    }
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    h1 {
      font-size: 44px;
      font-style: italic;
      font-weight: bold;
    }
    .line {
      position: absolute;
      height: 7px;
      width: 120%;
      background-color: #b5c401;
      border-radius: 6px;
      bottom: -11.8px;
    }
  }
  .options {
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      color: #707070;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      &:first-child {
        margin-right: 57px;
        @media (max-width: 500px) {
          margin-right: 0px;
        }
      }
      svg {
        margin-left: 12px;
      }
    }
  }
`
