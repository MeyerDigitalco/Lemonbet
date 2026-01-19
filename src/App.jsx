import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

import { PATHS } from "./features/navigation/paths";
import "./App.css";

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path={PATHS.home} element={<HomePage />} />

      </Routes>
    </div>
  );
}

export default App;
