import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => (
  <div className="d-flex flex-column min-vh-100 min-vw-100">
    <div className="d-flex flex-grow-1 justify-content-center align-items-center">
      <Spinner as="p" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  </div>
);

export default LoadingSpinner;
