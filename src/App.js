import React, { useState, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
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
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : <LoadingSpinner />}
      <footer>
        &nbsp; &copy; Univ. Of Seoul Spatial DB Lab {new Date().getFullYear()}
      </footer>
    </>
  );
}

export default App;
