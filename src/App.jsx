import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages :
import Home from "./pages/Home/Home.jsx";
import Characters from "./pages/Characters/Characters.jsx";
import Character from "./pages/Character/Character.jsx";
import Comics from "./pages/Comics/Comics.jsx";
import Comic from "./pages/Comic/Comic.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";

// Components :
import Header from "./components/Header/Header.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<Character />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comics/comic/:id" element={<Comic />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
