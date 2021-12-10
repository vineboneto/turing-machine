import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: Poppins;
  }
`

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .title {
    font-size: 25px;
    user-select: none;
    font-weight: 300;
  }

  form {
    width: 1200px;

    .main-form {
      display: flex;
      justify-content: space-between;
    }

    .left-form {
      width: 300px;
    }

    .right-form {
      width: 850px;

      input {
        width: 100px;
        margin-right: 10px;
      }

      label {
        flex-wrap: wrap;
        width: 5px;
      }

      button {
        color: purple;
        margin-top: 0;
        background-color: #fff;
        border: 1px purple solid;
        height: 52px;
      }

      button:hover {
        background-color: #fff;
      }
    }

    input {
      padding: 10px 15px;
      height: 30px;
      width: 100%;
      border-radius: 8px;
      border: 1px solid #ccc;
      margin: 5px 0;
    }

    label {
      font-weight: bold;
      padding: 5px 5px 20px 5px;
    }

    button {
      margin-top: 25px;
      background-color: purple;
      color: #fff;
      border-radius: 8px;
      padding: 10px 25px;
      text-transform: uppercase;
      font-size: 15px;
      outline: none;
      border: none;
      cursor: pointer;
      font-weight: 400;
      word-spacing: 30px;
      min-width: 140px;
    }

    button:hover {
      background-color: #330033;
    }
  }
`
