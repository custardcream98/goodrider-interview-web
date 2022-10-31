import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
   0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(to right, gray 10%, rgba(0, 0, 0, 0) 42%);
  animation: ${spinAnimation} 1.4s infinite linear;

  ::before {
    content: "";
    position: absolute;
    width: 50%;
    height: 50%;
    background: gray;
    border-radius: 100% 0 0 0;
    top: 0;
    left: 0;
  }
  ::after {
    content: "";
    position: absolute;
    margin: auto;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    background: white;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

const LoadingSpinner = ({ ...rest }) => {
  return <Spinner {...rest} />;
};

export default LoadingSpinner;
