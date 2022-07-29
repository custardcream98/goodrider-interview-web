import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import AppRouter from "./router";





function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 처음 로딩시 Backend로부터 token validation을 받고
    // 통과하면 isLoggedIn = true 아니면 false로 prop 넘겨주기
    setInit(true);
    setIsLoggedIn(true);
  }, []);

  return (

    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} />
      ) : (
        <div className="d-flex flex-column min-vh-100 min-vw-100">
          <div className="d-flex flex-grow-1 justify-content-center align-items-center">
            <Spinner as="p" animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </div>
      )}
      <footer>
        &nbsp; &copy; Univ. Of Seoul Spatial DB Lab {new Date().getFullYear()}
      </footer>
    </>
  );
}

export default App;
