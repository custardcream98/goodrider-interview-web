import React from "react";
import { Slider } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
    </div>
  );
}

export default App;
