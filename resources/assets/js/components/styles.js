import styled, { injectGlobal } from 'styled-components';

export const Content = styled.div`
  /* display: ${props => props.isActive ? 'block' : 'none'}; */
  /* height: ${props => props.isActive ? 'auto' : 0}; */
  background-color: #fff;
  margin-top: 3px;
  margin-right: 40px;
  margin-left: 40px;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  border: 1px solid #efefef;
  >div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: solid;
    border-color: grey;
  }
  >div:last-child {
    border: none;
  }
  >button {
    width: 100%;
    border-color: rgb(3,170,196);
    background-color: rgb(3,170,196);
    &:hover{
      background-color: rgb(3,135,160);
    }
  }
  button {
    margin: 0 !important;
  }
`;

export const Flight = styled.div`
  display: flex;
  >div {
    display: inherit;
    flex-direction: column;
  }
  pre, div {
    width: 100%;
  }
`;

export const SearchBox = styled.label`
  width: 100%;
  >div{
    margin: 0.5rem 0;
    input { 
      height: 40px;
      padding: 0px 20px;
      border: 1px solid #aeafb0;
      border-radius: 5px !important;
      width: 100% 
    }
  }
`;

export const EditBox = styled.div`
  /* display: block !important; */
  flex-direction: column;
  h4 { 
    text-align: center
  }
  button {
    width: 100px;
  }
  >div:last-child{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

injectGlobal`
  .fade {
    transition: ease-in 0.15s;
    transition-property: opacity, transform;
  }

  .fade-entering {
    /* opacity: 0 */
    transform: translateY(-10%);
  }
  .fade-entered {
    /* opacity: 1 */
    transform: translateY(0);
  }
  .fade-exiting {
    /* opacity: 1 */
    transform: translateY(-10%);
  }
  .box {
    padding: 2em 0;
    position: relative;
  }

  pre { margin: 0; }

  .ribbon-wrap {
    position: relative;
    width: 95%;
    margin-bottom: 20px;
    margin-left: -15px;
    font-size: 18px;
    line-height: 18px;
    transition: width 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    
    &:hover {
      a {
        background-color: rgb(3,120,160);
        &:before {
          border-top-color: rgb(3,120,160);
          border-bottom-color: rgb(3,120,160);
        }
      }
    }
    .ribbon {
      position: relative;
      
      &:before {
        content: "";
        height: 0;
        width: 0;
        display: block;
        position: absolute;
        top: 3px;
        right: 0;
      
        border-top: 29px solid rgba(0, 0, 0, .3);
        border-bottom: 29px solid rgba(0, 0, 0, .3);
        border-left: 29px solid rgba(0, 0, 0, .3);
        border-right: 29px solid transparent;
      }
    
      &:after {
        content: "";
        height: 3px;
        background: rgba(0, 0, 0, .3);
        display: block;
        position: absolute;
        bottom: -3px;
        left: 15px;
        right: 58px;
      }
    }

    &:hover,
    &.open {
      width: 105%;
      transition: width 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
  }

  .ribbon a {
    display: block;
    padding: 20px;
    position: relative; 
    background: rgb(3, 170, 196);
    height: 58px;
    margin-right: 29px;
    text-decoration: none;

    pre {
      color: #fff;
    }
    
    &:after {
      content: "";
      height: 0;
      width: 0;
      display: block;
      position: absolute;
      bottom: -15px;
      left: 0;
      border-top: 15px solid #004a70;
      border-left: 15px solid transparent;
    }
    
    &:before {
      content: "";
      height: 0;
      width: 0;
      display: block;
      position: absolute;
      top: 0;
      right: -29px;
      border-top: 29px solid rgb(3, 170, 196);
      border-bottom: 29px solid rgb(3, 170, 196);
      border-right: 29px solid transparent;
      border-left: 29px solid transparent;
    }
  }

  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .box {
    width: 70%;
    background: #FFF;
    margin: 40px auto;
  }

  .box-shadow {
    position: relative;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    
    &:before,
    &:after {
      content:"";
      position:absolute; 
      z-index:-1;
      box-shadow:0 0 20px rgba(0,0,0,0.8);
      top:0;
      bottom:0;
      left:10px;
      right:10px;
      border-radius:100px / 10px;
    }
    
    &:after {
      right:10px; 
      left:auto; 
      transform:skew(8deg) rotate(3deg);
    }
  }
  .content {
    background-color: #fff;
    margin-top: 3px;
    margin-right: 40px;
    margin-left: 40px;
    padding-top: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    border: 1px solid #efefef;
  }
  
  .react-autosuggest__container {
    width: 100%;
    position: relative;
  }
  .react-autosuggest__input {
    width: 100%;
    height: 35px;
    padding: 10px 20px;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    border: 1px solid #aaa;
    border-radius: 4px;
  }

  .react-autosuggest__input--focused {
    outline: none;
  }

  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 34px;
    width: 100%;
    border: 1px solid #aaa;
    background-color: #fff;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
  }
`