import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 14px;
  }

  img {
    max-width: 100%;
  }
  
  a {
    color: #4c95d3;
  }

  a:hover {
    color: #396ae8;
    text-decoration: none;
    cursor: pointer;
  }
  
  .circle {
    border-radius: 50% !important;
  }

  @media (min-width: 1200px) {
    .container, .container-lg, .container-md, .container-sm, .container-xl {
      max-width: 1180px;
    }
  }

  @media (min-width: 1300px) {
    .container, .container-lg, .container-md, .container-sm, .container-xl {
      max-width: 1290px;
    }
  }
`;

export default GlobalStyle;