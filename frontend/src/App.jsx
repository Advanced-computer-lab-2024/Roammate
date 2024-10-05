import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/registerPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<div>Home Page Placeholder</div>} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
