import styled from "styled-components";

export const ContainerUpper = styled.div`
  display: grid;
  grid-area: head;
  padding: 10px;
  width: 95%;
  margin-left: 30px;
  margin-right: 30px;
  h2 {
    text-align: center;
  }
  h1 {
    margin: auto;
    line-height: 50px;
    vertical-align: middle;
  }
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

export const ContainerLogout = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const Form = styled.form`
  width: 100%;
  background: #fff;
  padding: 20 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    width: 70px;
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
    height: 45px;
    margin-left: 20px;
    margin-right: 20px;
    padding: 10 10px;
    color: #777;
    font-size: 15px;
    width: 70%;
    border: 1;
    border-radius: 5px;
    &::placeholder {
      color: #999;
    }
  }
  select {
    height: 45px;
    margin-left: 20px;
    margin-right: 20px;
    padding: 10 10px;
    color: #777;
    font-size: 15px;
    width: 70%;
    border: 1;
    border-radius: 5px;
    &::placeholder {
      color: #999;
    }
  }
  button {
    color: #fff;
    font-size: 16px;
    background: #fc6963;
    height: 50px;
    border: 0;
    border-radius: 5px;
    width: 40%;
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
