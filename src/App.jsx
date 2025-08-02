import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// Pages :
import Home from "./pages/Home/Home.jsx";
import Characters from "./pages/Characters/Characters.jsx";
import Character from "./pages/Character/Character.jsx";
import Comics from "./pages/Comics/Comics.jsx";
import Comic from "./pages/Comic/Comic.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import All from "./pages/All/All.jsx";
import Favoris from "./pages/Favoris/Favoris.jsx";

// Components :
import Header from "./components/Header/Header.jsx";
import ScrollToTop from "./Functions/ScrollToTop/ScrollToTop.jsx";

function App() {
  const [token, setToken] = useState(Cookies.get("marvel-token") || null);
  const [redirectPath, setRedirectPath] = useState(null);

  const connexionStatus = (token) => {
    if (token) {
      Cookies.set("marvel-token", token, { expires: 14 });
    } else {
      Cookies.remove("marvel-token");
    }
    setToken(token);
  };

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login"; // ou useNavigate si dans un composant
      }
      return Promise.reject(error);
    }
  );

  return (
    <Router>
      <ScrollToTop />
      <Header
        token={token}
        connexionStatus={connexionStatus}
        setRedirectPath={setRedirectPath}
      />
      <Routes>
        <Route
          path="/"
          element={<Home token={token} setRedirectPath={setRedirectPath} />}
        />
        <Route path="/characters" element={<Characters token={token} />} />
        <Route path="/characters/:id" element={<Character token={token} />} />
        <Route path="/comics" element={<Comics token={token} />} />
        <Route path="/comics/comic/:id" element={<Comic token={token} />} />
        <Route
          path="/login"
          element={
            <Login
              connexionStatus={connexionStatus}
              redirectPath={redirectPath}
              setRedirectPath={setRedirectPath}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              connexionStatus={connexionStatus}
              redirectPath={redirectPath}
              setRedirectPath={setRedirectPath}
            />
          }
        />
        <Route path="/favoris" element={<Favoris token={token} />} />
        <Route path="*" element={<All />} />
      </Routes>
    </Router>
  );
}

export default App;
