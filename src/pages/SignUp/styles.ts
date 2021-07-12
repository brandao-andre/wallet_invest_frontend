import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    outline: 0;
  }
  body,
  html {
    background: #eee;
    font-family: "Helvetica Neue", "Helvetica", Arial, sans-serif;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    height: 100%;
    width: 100%;
  }
`;

export const Form = styled.form`
  width: 400px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100px;
    margin: 10px 0 40px;
  }
  p {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    height: 25px;
    margin-bottom: 15px;
    padding: 5 5px;
    color: #777;
    font-size: 15px;
    width: 100%;
    border: 0;
    &::placeholder {
      color: #999;
    }
  }
  button {
    color: #fff;
    font-size: 16px;
    background: #ff726f;
    height: 56px;
    border: 0;
    border-radius: 5px;
    width: 100%;
    &:hover {
      border: 1px solid #ffffff;
    }
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
  }
`;
